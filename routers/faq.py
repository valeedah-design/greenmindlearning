from typing import List

from fastapi import APIRouter, Depends

import crud
from auth import get_current_admin
from db import db
from models import Faq, FaqCreate

router = APIRouter(prefix="/api/faq", tags=["faq"])

DEFAULT_FAQS = [
    {"question": "Can I change my plan later?", "answer": "Yes. You can upgrade or downgrade at any time from your account settings. Upgrades apply immediately and are prorated; downgrades take effect at the next billing cycle.", "order": 0},
    {"question": "Can we get a demo before committing?", "answer": "Yes — book a guided walkthrough and our team will tailor it to your industry and use case. Enterprise pilots are scoped directly with our sales team.", "order": 1},
    {"question": "Do you offer discounts for non-profits?", "answer": "Yes. Registered non-profits, NGOs, and accredited educational institutions receive 30% off any plan. Contact our team with proof of status to activate it.", "order": 2},
    {"question": "What payment methods do you accept?", "answer": "We accept all major credit cards, SEPA direct debit, and — for annual Enterprise contracts — bank transfer with invoicing.", "order": 3},
]


async def seed_faqs():
    if await db.faqs.count_documents({}) == 0:
        for f in DEFAULT_FAQS:
            await db.faqs.insert_one(Faq(**f, created_by="system").model_dump())


@router.get("", response_model=List[Faq])
async def list_faqs():
    return await crud.list_docs(db, "faqs", Faq, sort_field="order", sort_dir=1)


@router.post("", response_model=Faq)
async def create_faq(payload: FaqCreate, admin=Depends(get_current_admin)):
    return await crud.create_doc(db, "faqs", Faq, payload, admin["username"])


@router.put("/{faq_id}", response_model=Faq)
async def update_faq(faq_id: str, payload: FaqCreate, admin=Depends(get_current_admin)):
    return await crud.update_doc(db, "faqs", Faq, faq_id, payload, admin["username"])


@router.delete("/{faq_id}")
async def delete_faq(faq_id: str, admin=Depends(get_current_admin)):
    return await crud.delete_doc(db, "faqs", faq_id)
