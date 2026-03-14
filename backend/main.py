from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import scrape, leads

app = FastAPI(title="Lead Gen API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all for now, restrict in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(scrape.router)
app.include_router(leads.router)

@app.get("/health")
async def health_check():
    return {"status": "ok"}
