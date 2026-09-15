from datetime import datetime, timezone

from fastapi import HTTPException


def now():
    return datetime.now(timezone.utc)


async def create_doc(db, collection: str, model_cls, payload, admin_username: str):
    obj = model_cls(**payload.model_dump(), created_by=admin_username)
    doc = obj.model_dump()
    await db[collection].insert_one(doc)
    return obj


async def list_docs(db, collection: str, model_cls, sort_field=None, sort_dir=1):
    cursor = db[collection].find({}, {"_id": 0})
    if sort_field:
        cursor = cursor.sort(sort_field, sort_dir)
    docs = await cursor.to_list(2000)
    return [model_cls(**d) for d in docs]


async def update_doc(db, collection: str, model_cls, doc_id: str, payload, admin_username: str):
    existing = await db[collection].find_one({"id": doc_id}, {"_id": 0})
    if not existing:
        raise HTTPException(status_code=404, detail="Not found")
    update_data = payload.model_dump()
    update_data["updated_by"] = admin_username
    update_data["updated_at"] = now()
    await db[collection].update_one({"id": doc_id}, {"$set": update_data})
    merged = {**existing, **update_data}
    return model_cls(**merged)


async def delete_doc(db, collection: str, doc_id: str):
    result = await db[collection].delete_one({"id": doc_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Not found")
    return {"ok": True}


async def get_toggle(db, key: str, default: bool = False) -> bool:
    doc = await db.site_settings.find_one({"key": key}, {"_id": 0})
    if not doc:
        return default
    return bool(doc.get("enabled", default))


async def set_toggle(db, key: str, enabled: bool, admin_username: str):
    await db.site_settings.update_one(
        {"key": key},
        {"$set": {"key": key, "enabled": enabled, "updated_by": admin_username, "updated_at": now()}},
        upsert=True,
    )
    return {"key": key, "enabled": enabled}
