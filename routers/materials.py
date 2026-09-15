from typing import List

from fastapi import APIRouter, Depends

import crud
from auth import get_current_admin
from db import db
from models import Category, CategoryCreate, Material, MaterialCreate

router = APIRouter(prefix="/api/materials", tags=["materials"])
taxonomy_router = APIRouter(prefix="/api/materials/taxonomy", tags=["materials-taxonomy"])

DEFAULT_TYPES = [
    {"name": "Slide Deck", "color": "#0EA5E9"},
    {"name": "Case Study", "color": "#8B5CF6"},
    {"name": "Assessment", "color": "#F59E0B"},
    {"name": "Workbook", "color": "#177A3B"},
    {"name": "Video Guide", "color": "#EC4899"},
]

DEFAULT_TOPICS = [
    {"name": "Climate & Energy", "color": "#0EA5E9"},
    {"name": "Circular Economy", "color": "#10B981"},
    {"name": "ESG Reporting", "color": "#8B5CF6"},
    {"name": "Biodiversity", "color": "#84CC16"},
    {"name": "Social", "color": "#F43F5E"},
]


async def seed_taxonomy():
    if await db.material_types.count_documents({}) == 0:
        for t in DEFAULT_TYPES:
            await db.material_types.insert_one(Category(**t).model_dump())
    if await db.topics.count_documents({}) == 0:
        for t in DEFAULT_TOPICS:
            await db.topics.insert_one(Category(**t).model_dump())


# ---------- Materials CRUD ----------
@router.get("", response_model=List[Material])
async def list_materials():
    return await crud.list_docs(db, "materials", Material, sort_field="created_at", sort_dir=-1)


@router.get("/{material_id}", response_model=Material)
async def get_material(material_id: str):
    doc = await db.materials.find_one({"id": material_id}, {"_id": 0})
    if not doc:
        from fastapi import HTTPException

        raise HTTPException(status_code=404, detail="Not found")
    return Material(**doc)


@router.post("", response_model=Material)
async def create_material(payload: MaterialCreate, admin=Depends(get_current_admin)):
    return await crud.create_doc(db, "materials", Material, payload, admin["username"])


@router.put("/{material_id}", response_model=Material)
async def update_material(material_id: str, payload: MaterialCreate, admin=Depends(get_current_admin)):
    return await crud.update_doc(db, "materials", Material, material_id, payload, admin["username"])


@router.delete("/{material_id}")
async def delete_material(material_id: str, admin=Depends(get_current_admin)):
    return await crud.delete_doc(db, "materials", material_id)


# ---------- Taxonomy: Material Types ----------
@taxonomy_router.get("/types", response_model=List[Category])
async def list_material_types():
    return await crud.list_docs(db, "material_types", Category, sort_field="name")


@taxonomy_router.post("/types", response_model=Category)
async def create_material_type(payload: CategoryCreate, admin=Depends(get_current_admin)):
    cat = Category(**payload.model_dump())
    await db.material_types.insert_one(cat.model_dump())
    return cat


@taxonomy_router.delete("/types/{category_id}")
async def delete_material_type(category_id: str, admin=Depends(get_current_admin)):
    return await crud.delete_doc(db, "material_types", category_id)


# ---------- Taxonomy: Topics ----------
@taxonomy_router.get("/topics", response_model=List[Category])
async def list_topics():
    return await crud.list_docs(db, "topics", Category, sort_field="name")


@taxonomy_router.post("/topics", response_model=Category)
async def create_topic(payload: CategoryCreate, admin=Depends(get_current_admin)):
    cat = Category(**payload.model_dump())
    await db.topics.insert_one(cat.model_dump())
    return cat


@taxonomy_router.delete("/topics/{category_id}")
async def delete_topic(category_id: str, admin=Depends(get_current_admin)):
    return await crud.delete_doc(db, "topics", category_id)
