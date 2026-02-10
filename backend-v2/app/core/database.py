"""
Database connection management using psycopg2.
Supports both persistent (Render) and serverless (Vercel) environments.
"""
import os
from typing import Generator
from urllib.parse import urlparse, parse_qs
import psycopg2
from psycopg2 import pool, extras
from psycopg2.extensions import connection as PgConnection
from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)

# Detect serverless environment (Vercel, AWS Lambda, etc.)
IS_SERVERLESS = bool(os.environ.get("VERCEL") or os.environ.get("AWS_LAMBDA_FUNCTION_NAME"))


def _parse_database_url() -> dict:
    """
    Parse DATABASE_URL into connection parameters.
    Supports: postgresql://user:password@host:port/database?sslmode=require
    """
    url = settings.DATABASE_URL

    # Normalize postgres:// to postgresql://
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)

    parsed = urlparse(url)

    if parsed.scheme not in ("postgresql", "postgres"):
        raise ValueError("DATABASE_URL must start with postgresql:// or postgres://")

    if not parsed.username:
        raise ValueError("DATABASE_URL must include credentials")

    dbname = parsed.path.lstrip("/")
    if not dbname:
        raise ValueError("DATABASE_URL must include database name")

    config = {
        "host": parsed.hostname,
        "port": parsed.port or 5432,
        "user": parsed.username,
        "password": parsed.password or "",
        "dbname": dbname
    }

    # Parse query parameters for SSL and other options
    query_params = parse_qs(parsed.query)

    sslmode = query_params.get("sslmode", [""])[0]
    if sslmode in ("require", "verify-ca", "verify-full"):
        config["sslmode"] = sslmode

    channel_binding = query_params.get("channel_binding", [""])[0]
    if channel_binding:
        config["channel_binding"] = channel_binding

    return config


class Database:
    """
    Manages PostgreSQL connections.
    Uses connection pooling on persistent servers (Render).
    Uses per-request connections on serverless (Vercel).
    """

    def __init__(self):
        self._pool: pool.ThreadedConnectionPool | None = None
        self._db_config: dict | None = None

    def _get_config(self) -> dict:
        """Lazily parse and cache DB config."""
        if self._db_config is None:
            self._db_config = _parse_database_url()
        return self._db_config

    def _ensure_pool(self) -> None:
        """Lazily create connection pool (persistent mode only)."""
        if self._pool is not None:
            return
        try:
            config = self._get_config()
            self._pool = pool.ThreadedConnectionPool(
                minconn=1,
                maxconn=5,
                **config
            )
            logger.info(f"PostgreSQL pool initialized: {config['host']}/{config['dbname']}")
        except psycopg2.Error as e:
            logger.error(f"Failed to initialize database pool: {e}")

    def get_connection(self) -> PgConnection:
        """
        Get a database connection.
        Serverless: creates a new direct connection per request.
        Persistent: gets from connection pool.
        """
        if IS_SERVERLESS:
            config = self._get_config()
            return psycopg2.connect(**config)

        self._ensure_pool()
        if not self._pool:
            raise Exception("Database connection pool not available")
        return self._pool.getconn()

    def return_connection(self, conn: PgConnection) -> None:
        """Return a connection (pool mode) or close it (serverless mode)."""
        if not conn:
            return
        if IS_SERVERLESS:
            try:
                conn.close()
            except Exception:
                pass
        elif self._pool:
            self._pool.putconn(conn)

    def health_check(self) -> bool:
        """Check if database is reachable."""
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT 1")
            cursor.fetchone()
            cursor.close()
            self.return_connection(conn)
            return True
        except Exception as e:
            logger.error(f"Database health check failed: {e}")
            return False

    def close(self) -> None:
        """Close the connection pool (persistent mode only)."""
        if self._pool:
            try:
                self._pool.closeall()
            except Exception:
                pass
            self._pool = None


# Singleton — pool is NOT created here, only on first use
database = Database()


def get_db() -> Generator:
    """
    Dependency injection for database connections.
    Yields a cursor with automatic commit/rollback.
    """
    conn = database.get_connection()
    cursor = conn.cursor(cursor_factory=extras.RealDictCursor)
    try:
        yield cursor
        conn.commit()
    except Exception as e:
        conn.rollback()
        logger.error(f"Database transaction failed: {e}")
        raise
    finally:
        cursor.close()
        database.return_connection(conn)

