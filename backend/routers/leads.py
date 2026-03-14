from fastapi import APIRouter
from db.mongo import get_unused_leads, mark_leads_used

router = APIRouter()

@router.get("/leads")
async def fetch_leads(limit: int = 50):
    leads = await get_unused_leads(limit)
    if leads:
        ids = [lead["_id"] for lead in leads]
        await mark_leads_used(ids)
    return leads
