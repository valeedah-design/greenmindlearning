import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile

from auth import get_current_admin
from db import UPLOAD_DIR

router = APIRouter(prefix="/api/uploads", tags=["uploads"])

ALLOWED_EXT = {".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"}
MAX_BYTES = 8 * 1024 * 1024  # 8MB


@router.post("")
async def upload_image(file: UploadFile, admin=Depends(get_current_admin)):
    ext = Path(file.filename or "").suffix.lower()
    if ext not in ALLOWED_EXT:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {ext or 'unknown'}")

    contents = await file.read()
    if len(contents) > MAX_BYTES:
        raise HTTPException(status_code=400, detail="File too large (8MB max)")

    filename = f"{uuid.uuid4()}{ext}"
    dest = UPLOAD_DIR / filename
    dest.write_bytes(contents)

    return {"url": f"/uploads/{filename}"}
