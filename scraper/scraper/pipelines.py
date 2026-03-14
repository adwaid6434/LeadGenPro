import pymongo
import os

class MongoPipeline:
    def open_spider(self, spider):
        mongo_uri = os.getenv("MONGO_URI", "mongodb://localhost:27017")
        self.client = pymongo.MongoClient(mongo_uri)
        self.col = self.client["leadgen"]["leads"]

    def close_spider(self, spider):
        self.client.close()

    def process_item(self, item, spider):
        # Deduplicate by email via upsert
        if item.get("email"):
            self.col.update_one(
                {"email": item["email"]},
                {"$setOnInsert": dict(item)},
                upsert=True,
            )
        return item
