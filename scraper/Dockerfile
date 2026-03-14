FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
# We need to run Celery from the root of the scraper app so it can find scrapy
CMD ["celery", "-A", "backend.tasks.celery_app", "worker", "--loglevel=info"]
