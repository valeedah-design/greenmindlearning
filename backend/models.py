import uuid
from datetime import datetime, timezone
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field


def now():
    return datetime.now(timezone.utc)


class AuditFields(BaseModel):
    created_by: str
    created_at: datetime = Field(default_factory=now)
    updated_by: Optional[str] = None
    updated_at: Optional[datetime] = None


# ---------- Auth ----------
class LoginRequest(BaseModel):
    username: str
    password: str


class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    name: str
    username: str


class ChangeCredentialsRequest(BaseModel):
    current_password: str
    new_username: Optional[str] = None
    new_password: Optional[str] = None


class RecoverPasswordRequest(BaseModel):
    username: str
    recovery_code: str
    new_password: str


# ---------- Taxonomy (Material Types / Topics) ----------
class Category(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    color: str = "#177A3B"


class CategoryCreate(BaseModel):
    name: str = Field(min_length=1, max_length=60)
    color: str = "#177A3B"


# ---------- Learning Materials ----------
class MaterialCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    type: str
    topic: str
    level: str = "Foundational"
    minutes: int = 30
    description: str = ""
    thumbnail: Optional[str] = None
    images: List[str] = []


class Material(MaterialCreate, AuditFields):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


# ---------- Industry Insights (Resources Hub) ----------
class InsightCreate(BaseModel):
    title: str = Field(min_length=1, max_length=200)
    description: str = ""
    url: str = ""
    category: str = "Market Trends"
    date: Optional[str] = None


class Insight(InsightCreate, AuditFields):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


# ---------- Testimonials ----------
class TestimonialCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    role: str = ""
    quote: str = Field(min_length=1, max_length=1000)
    linkedin_url: str = ""


class Testimonial(TestimonialCreate, AuditFields):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


# ---------- Trusted-by logos ----------
class LogoCreate(BaseModel):
    company_name: str = Field(min_length=1, max_length=120)
    image: str


class Logo(LogoCreate, AuditFields):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


# ---------- FAQ ----------
class FaqCreate(BaseModel):
    question: str = Field(min_length=1, max_length=300)
    answer: str = Field(min_length=1, max_length=2000)
    order: int = 0


class Faq(FaqCreate, AuditFields):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))


class ToggleUpdate(BaseModel):
    enabled: bool
