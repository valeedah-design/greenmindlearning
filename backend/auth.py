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
    defaults are created and should be changed on first login (see the
    Account page in the admin panel, or POST /api/auth/change-credentials).

    Slots track a `legacy_username` so that if this ran before under the
    old admin1/admin2/admin3 names, the existing account is renamed in
    place (keeping its data) instead of leaving stale duplicate accounts
    behind when the default usernames change.
    """
    slots = [
        {
            "legacy_username": "admin1",
            "username": os.environ.get("ADMIN1_USERNAME", "Rabeehgm"),
            "password": os.environ.get("ADMIN1_PASSWORD", "Willow20@"),
            "name": os.environ.get("ADMIN1_NAME", "Rabeeh"),
        },
        {
            "legacy_username": "admin2",
            "username": os.environ.get("ADMIN2_USERNAME", "Valeedgm"),
            "password": os.environ.get("ADMIN2_PASSWORD", "Willow85$"),
            "name": os.environ.get("ADMIN2_NAME", "Valeed"),
        },
        {
            "legacy_username": "admin3",
            "username": os.environ.get("ADMIN3_USERNAME", "Razingm"),
            "password": os.environ.get("ADMIN3_PASSWORD", "Falcon76@"),
            "name": os.environ.get("ADMIN3_NAME", "Razin"),
        },
    ]
    for slot in slots:
        already = await db.admins.find_one({"username": slot["username"]})
        if already:
            continue  # already set up under the target username — leave it alone

        legacy = None
        if slot["legacy_username"] != slot["username"]:
            legacy = await db.admins.find_one({"username": slot["legacy_username"]})

        if legacy:
            await db.admins.update_one(
                {"_id": legacy["_id"]},
                {
                    "$set": {
                        "username": slot["username"],
                        "password_hash": hash_password(slot["password"]),
                        "name": slot["name"],
                        "updated_at": datetime.now(timezone.utc),
                    }
                },
            )
        else:
            await db.admins.insert_one(
                {
                    "username": slot["username"],
                    "password_hash": hash_password(slot["password"]),
                    "name": slot["name"],
                    "created_at": datetime.now(timezone.utc),
                }
            )
