import os
from pathlib import Path
from dotenv import load_dotenv
from motor.motor_asyncio import AsyncIOMotorClient

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Vercel's serverless filesystem is read-only except /tmp, and /tmp isn't
# shared across invocations or instances — so uploaded files here are
# best-effort/short-lived in production, not permanent storage. Good enough
# to not crash the app; swapping this for real object storage (e.g. Vercel
# Blob) is the real fix if persistent uploads matter.
import tempfile

UPLOAD_DIR = Path(os.environ.get("UPLOAD_DIR", str(Path(tempfile.gettempdir()) / "gml_uploads")))
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)
