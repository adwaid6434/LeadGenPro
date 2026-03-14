from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
import os
import logging

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
client = AsyncIOMotorClient(MONGO_URI)
db = client["leadgen"]
collection = db["leads"]

async def get_unused_leads(limit: int):
    try:
        cursor = collection.find({"used": False}).sort("createdAt", 1).limit(limit)
        leads = await cursor.to_list(length=limit)
        for lead in leads:
            lead["_id"] = str(lead["_id"])
        return leads
    except Exception as e:
        logging.error(f"Error fetching leads: {e}")
        return []

async def mark_leads_used(ids: list):
    try:
        object_ids = [ObjectId(i) for i in ids]
        await collection.update_many(
            {"_id": {"$in": object_ids}},
            {"$set": {"used": True}}
        )
    except Exception as e:
        logging.error(f"Error marking leads as used: {e}")
