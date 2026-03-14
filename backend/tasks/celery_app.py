import os
import subprocess
from celery import Celery

REDIS_URL = os.getenv("UPSTASH_REDIS_URL", "redis://localhost:6379/0")

app = Celery("tasks", broker=REDIS_URL, backend=REDIS_URL)

@app.task(bind=True, max_retries=3)
def run_scrape_task(self, keyword: str):
    """
    Runs the Scrapy spider as a subprocess.
    This avoids twisted reactor AlreadyInstalledError which happens
    when trying to run CrawlerProcess inside a Celery worker.
    """
    try:
        # Assuming the worker is run from the scraper/ dir or paths are absolute in prod
        scraper_dir = os.environ.get("SCRAPER_DIR", "/app/scraper")
        subprocess.run(
            ["scrapy", "crawl", "recruiter", "-a", f"keyword={keyword}"],
            cwd=scraper_dir,
            check=True
        )
    except subprocess.CalledProcessError as exc:
        raise self.retry(exc=exc, countdown=60)
