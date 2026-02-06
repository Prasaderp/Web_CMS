"""
Database connection and session management using psycopg2.
Implements connection pooling and health checks for PostgreSQL.
"""
from typing import Generator
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
        Parse DATABASE_URL into connection parameters.
        Expected format: postgresql://user:password@host:port/database
        """
        url = settings.DATABASE_URL
        
        # Support both postgresql:// and postgres://
        if url.startswith("postgresql://"):
            url = url.replace("postgresql://", "")
        elif url.startswith("postgres://"):
            url = url.replace("postgres://", "")
        else:
            raise ValueError("DATABASE_URL must start with postgresql:// or postgres://")
        
        # Split credentials and host
        if "@" in url:
            credentials, host_part = url.split("@")
            if ":" in credentials:
                user, password = credentials.split(":", 1)
            else:
                user = credentials
                password = ""
        else:
            raise ValueError("DATABASE_URL must include credentials")
        
        # Split host and database
        if "/" in host_part:
            host_port, database = host_part.split("/", 1)
        else:
            raise ValueError("DATABASE_URL must include database name")
        
        # Split host and port
        if ":" in host_port:
            host, port_str = host_port.split(":")
            port = int(port_str)
        else:
            host = host_port
            port = 5432  # PostgreSQL default port
        
        return {
            "host": host,
            "port": port,
            "user": user,
            "password": password,
            "dbname": database
        }
    
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
