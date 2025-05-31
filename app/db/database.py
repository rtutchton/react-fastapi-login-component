# database.py
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"  # Change to your PostgreSQL if needed

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})  # for SQLite
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
