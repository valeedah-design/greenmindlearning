from datetime import datetime, timezone

from fastapi import APIRouter, Depends, HTTPException, status

from auth import RECOVERY_CODE, create_access_token, get_current_admin, hash_password, verify_password
from db import db
from models import ChangeCredentialsRequest, LoginRequest, LoginResponse, RecoverPasswordRequest

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


@router.patch("/change-credentials", response_model=LoginResponse)
async def change_credentials(payload: ChangeCredentialsRequest, admin=Depends(get_current_admin)):
    """Let a logged-in admin change their own username and/or password.
    Returns a fresh token — the old token's username may no longer be valid
    if the username changed, so the frontend should store the new one.
    """
    full = await db.admins.find_one({"username": admin["username"]})
    if not full or not verify_password(payload.current_password, full["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Current password is incorrect")

    updates = {"updated_at": datetime.now(timezone.utc)}

    if payload.new_username and payload.new_username != full["username"]:
        clash = await db.admins.find_one({"username": payload.new_username})
        if clash:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="That username is already taken")
        updates["username"] = payload.new_username

    if payload.new_password:
        if len(payload.new_password) < 8:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="New password must be at least 8 characters")
        updates["password_hash"] = hash_password(payload.new_password)

    await db.admins.update_one({"_id": full["_id"]}, {"$set": updates})

    new_username = updates.get("username", full["username"])
    token = create_access_token(new_username)
    return LoginResponse(access_token=token, name=full.get("name", new_username), username=new_username)

@router.post("/recover-password", response_model=LoginResponse)
async def recover_password(payload: RecoverPasswordRequest):
    """Reset a forgotten admin password using the shared recovery code
    (RECOVERY_CODE env var) instead of the current password. Anyone who
    knows the recovery code and a valid admin username can use this, so
    keep the recovery code private and only share it with the 3 admins.
    """
    if payload.recovery_code != RECOVERY_CODE:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Incorrect recovery code")

    if len(payload.new_password) < 8:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="New password must be at least 8 characters")

    admin = await db.admins.find_one({"username": payload.username})
    if not admin:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No admin account with that username")

    await db.admins.update_one(
        {"_id": admin["_id"]},
        {"$set": {"password_hash": hash_password(payload.new_password), "updated_at": datetime.now(timezone.utc)}},
    )

    token = create_access_token(admin["username"])
    return LoginResponse(access_token=token, name=admin.get("name", admin["username"]), username=admin["username"])
