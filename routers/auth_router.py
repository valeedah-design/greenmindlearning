from fastapi import APIRouter, Depends, HTTPException, status

from auth import create_access_token, get_current_admin, verify_password
from db import db
from models import LoginRequest, LoginResponse

router = APIRouter(prefix="/api/auth", tags=["auth"])


@router.post("/login", response_model=LoginResponse)
async def login(payload: LoginRequest):
    admin = await db.admins.find_one({"username": payload.username})
    if not admin or not verify_password(payload.password, admin["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect username or password")
    token = create_access_token(admin["username"])
    return LoginResponse(access_token=token, name=admin.get("name", admin["username"]), username=admin["username"])


@router.get("/me")
async def me(admin=Depends(get_current_admin)):
    return {"username": admin["username"], "name": admin.get("name", admin["username"])}
