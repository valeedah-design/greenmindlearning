import mimetypes
import uuid
from pathlib import Path

from fastapi import APIRouter, Depends, HTTPException, UploadFile
from vercel.blob import AsyncBlobClient

from auth import get_current_admin

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
    content_type = mimetypes.guess_type(filename)[0] or "application/octet-stream"

    # Stored in Vercel Blob (persistent object storage) instead of the
    # serverless function's local disk — Vercel wipes each function's /tmp
    # between invocations, so a file saved there could disappear before a
    # visitor's browser ever requested it (this is why uploaded images were
    # showing as broken). Blob storage is a separate, permanent service, so
    # the URL it returns keeps working across every future request.
    client = AsyncBlobClient()
    blob = await client.put(
        f"uploads/{filename}",
        contents,
        access="public",
        content_type=content_type,
        add_random_suffix=False,
    )

    return {"url": blob.url}
