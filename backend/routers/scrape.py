from fastapi import APIRouter
from pydantic import BaseModel
from tasks.celery_app import run_scrape_task

router = APIRouter()

class ScrapeRequest(BaseModel):
    keyword: str

@router.post("/start-scrape")
async def start_scrape(req: ScrapeRequest):
    run_scrape_task.delay(req.keyword)
    return {"status": "job_started"}
