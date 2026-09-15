"""Entry point for Vercel's Python serverless runtime.

Vercel's Python builder looks for functions under an `api/` directory. This
file just re-exports the real FastAPI app from server.py so Vercel has a
single function that receives every request (see the catch-all rewrite in
backend/vercel.json) and lets FastAPI's own router prefixes ("/api/...")
handle the rest, exactly like it does when run locally with uvicorn.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from server import app  # noqa: E402  (import after sys.path fix, intentional)
