from typing import List

from fastapi import APIRouter, Depends

import crud
from auth import get_current_admin
from db import db
from models import Logo, LogoCreate, ToggleUpdate

router = APIRouter(prefix="/api/trusted-by", tags=["trusted-by"])

SETTING_KEY = "trusted_by_enabled"


@router.get("")
async def get_logos():
    """Public: toggle state + items. Defaults to disabled/hidden until real logos are uploaded."""
    enabled = await crud.get_toggle(db, SETTING_KEY, default=False)
    items = await crud.list_docs(db, "trusted_by_logos", Logo, sort_field="created_at", sort_dir=-1)
    return {"enabled": enabled, "items": items}


@router.put("/toggle")
async def set_toggle(payload: ToggleUpdate, admin=Depends(get_current_admin)):
    return await crud.set_toggle(db, SETTING_KEY, payload.enabled, admin["username"])


@router.post("", response_model=Logo)
async def create_logo(payload: LogoCreate, admin=Depends(get_current_admin)):
    return await crud.create_doc(db, "trusted_by_logos", Logo, payload, admin["username"])


@router.put("/{logo_id}", response_model=Logo)
async def update_logo(logo_id: str, payload: LogoCreate, admin=Depends(get_current_admin)):
    return await crud.update_doc(db, "trusted_by_logos", Logo, logo_id, payload, admin["username"])


@router.delete("/{logo_id}")
async def delete_logo(logo_id: str, admin=Depends(get_current_admin)):
    return await crud.delete_doc(db, "trusted_by_logos", logo_id)
