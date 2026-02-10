"""
Database connection and session management using psycopg2.
Implements connection pooling and health checks for PostgreSQL.
"""
from typing import Generator
from urllib.parse import urlparse, parse_qs
import psycopg2
from psycopg2 import pool, extras
from psycopg2.extensions import connection as PgConnection
from app.core.config import settings
from app.core.logging import get_logger

logger = get_logger(__name__)


class Database:
    """Manages PostgreSQL database connection pool."""
    
    def __init__(self):
        """Initialize database connection pool."""
        self._pool: pool.ThreadedConnectionPool | None = None
        self._connection: PgConnection | None = None
        self._init_pool()
    
    def _parse_database_url(self) -> dict:
        """
        Parse DATABASE_URL into connection parameters using urllib.parse.
        Supports: postgresql://user:password@host:port/database?sslmode=require&channel_binding=require
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
        
        # Extract database name (remove leading /)
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
        
        # Handle sslmode
        sslmode = query_params.get("sslmode", [""])[0]
        if sslmode in ("require", "verify-ca", "verify-full"):
            config["sslmode"] = sslmode
        
        # Handle channel_binding (required by some Neon configurations)
        channel_binding = query_params.get("channel_binding", [""])[0]
        if channel_binding:
            config["channel_binding"] = channel_binding
        
        return config
    
    def _init_pool(self) -> None:
        """Initialize connection pool."""
        try:
            db_config = self._parse_database_url()
            
            self._pool = pool.ThreadedConnectionPool(
                minconn=2,
                maxconn=20,
                **db_config
            )
            logger.info(f"PostgreSQL connection pool initialized: {db_config['host']}:{db_config['port']}/{db_config['dbname']}")
        except psycopg2.Error as e:
            logger.error(f"Failed to initialize database pool: {e}")
            # Don't raise - allow app to start, will retry on first connection
    
    def get_connection(self) -> PgConnection:
        """Get a connection from the pool."""
        if not self._pool:
            self._init_pool()
        if not self._pool:
            raise Exception("Database connection pool not available")
        return self._pool.getconn()
    
    def return_connection(self, conn: PgConnection) -> None:
        """Return a connection to the pool."""
        if self._pool and conn:
            self._pool.putconn(conn)
    
    def get_cursor(self):
        """Get a cursor with dictionary results."""
        if not self._connection or self._connection.closed:
            self._connection = self.get_connection()
        return self._connection.cursor(cursor_factory=extras.RealDictCursor)
    
    def close(self) -> None:
        """Close the current connection."""
        if self._connection and not self._connection.closed:
            self.return_connection(self._connection)
            self._connection = None
    
    def health_check(self) -> bool:
        """Check if database is healthy."""
        try:
            conn = self.get_connection()
            cursor = conn.cursor()
            cursor.execute("SELECT 1")
            cursor.fetchone()
            cursor.close()
            self.return_connection(conn)
            return True
        except psycopg2.Error as e:
            logger.error(f"Database health check failed: {e}")
            return False


# Singleton database instance
database = Database()


def get_db() -> Generator:
    """
    Dependency injection for database connections.
    Yields a cursor with automatic commit/rollback.
    Returns dictionary results.
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
