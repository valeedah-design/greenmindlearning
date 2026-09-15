import os
from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from passlib.context import CryptContext

from db import db

JWT_SECRET = os.environ.get("JWT_SECRET", "green-mind-learning-dev-secret-change-me")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_HOURS = 24 * 14  # 2 weeks

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def verify_password(password: str, hashed: str) -> bool:
    return pwd_context.verify(password, hashed)


def create_access_token(username: str) -> str:
    expire = datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRE_HOURS)
    payload = {"sub": username, "exp": expire}
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_admin(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        username = payload.get("sub")
        if not username:
            raise ValueError("Missing subject")
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired session — please log in again.",
        )
    admin = await db.admins.find_one({"username": username}, {"_id": 0, "password_hash": 0})
    if not admin:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Admin account not found")
    return admin


async def seed_admins():
    """Seed the 3 admin accounts if they don't already exist.
    Usernames/passwords can be overridden via env vars; otherwise sensible
    defaults are created and should be changed on first login.
    """
    defaults = [
        {
            "username": os.environ.get("ADMIN1_USERNAME", "admin1"),
            "password": os.environ.get("ADMIN1_PASSWORD", "GreenMind#2026!"),
            "name": os.environ.get("ADMIN1_NAME", "Admin One"),
        },
        {
            "username": os.environ.get("ADMIN2_USERNAME", "admin2"),
            "password": os.environ.get("ADMIN2_PASSWORD", "GreenMind#2026!"),
            "name": os.environ.get("ADMIN2_NAME", "Admin Two"),
        },
        {
            "username": os.environ.get("ADMIN3_USERNAME", "admin3"),
            "password": os.environ.get("ADMIN3_PASSWORD", "GreenMind#2026!"),
            "name": os.environ.get("ADMIN3_NAME", "Admin Three"),
        },
    ]
    for d in defaults:
        existing = await db.admins.find_one({"username": d["username"]})
        if not existing:
            await db.admins.insert_one(
                {
                    "username": d["username"],
                    "password_hash": hash_password(d["password"]),
                    "name": d["name"],
                    "created_at": datetime.now(timezone.utc),
                }
            )
