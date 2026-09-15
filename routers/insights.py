from typing import List

from fastapi import APIRouter, Depends

import crud
from auth import get_current_admin
from db import db
from models import Insight, InsightCreate

router = APIRouter(prefix="/api/insights", tags=["insights"])


@router.get("", response_model=List[Insight])
async def list_insights():
    return await crud.list_docs(db, "insights", Insight, sort_field="created_at", sort_dir=-1)


@router.post("", response_model=Insight)
async def create_insight(payload: InsightCreate, admin=Depends(get_current_admin)):
    return await crud.create_doc(db, "insights", Insight, payload, admin["username"])


@router.put("/{insight_id}", response_model=Insight)
async def update_insight(insight_id: str, payload: InsightCreate, admin=Depends(get_current_admin)):
    return await crud.update_doc(db, "insights", Insight, insight_id, payload, admin["username"])


@router.delete("/{insight_id}")
async def delete_insight(insight_id: str, admin=Depends(get_current_admin)):
    return await crud.delete_doc(db, "insights", insight_id)
