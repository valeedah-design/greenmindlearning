from typing import List

from fastapi import APIRouter, Depends

import crud
from auth import get_current_admin
from db import db
from models import Testimonial, TestimonialCreate, ToggleUpdate

router = APIRouter(prefix="/api/testimonials", tags=["testimonials"])

SETTING_KEY = "testimonials_enabled"


@router.get("")
async def get_testimonials():
    """Public: returns the toggle state plus items. Frontend only renders when enabled=true."""
    enabled = await crud.get_toggle(db, SETTING_KEY, default=False)
    items = await crud.list_docs(db, "testimonials", Testimonial, sort_field="created_at", sort_dir=-1)
    return {"enabled": enabled, "items": items}


@router.put("/toggle")
async def set_toggle(payload: ToggleUpdate, admin=Depends(get_current_admin)):
    return await crud.set_toggle(db, SETTING_KEY, payload.enabled, admin["username"])


@router.post("", response_model=Testimonial)
async def create_testimonial(payload: TestimonialCreate, admin=Depends(get_current_admin)):
    return await crud.create_doc(db, "testimonials", Testimonial, payload, admin["username"])


@router.put("/{testimonial_id}", response_model=Testimonial)
async def update_testimonial(testimonial_id: str, payload: TestimonialCreate, admin=Depends(get_current_admin)):
    return await crud.update_doc(db, "testimonials", Testimonial, testimonial_id, payload, admin["username"])


@router.delete("/{testimonial_id}")
async def delete_testimonial(testimonial_id: str, admin=Depends(get_current_admin)):
    return await crud.delete_doc(db, "testimonials", testimonial_id)
