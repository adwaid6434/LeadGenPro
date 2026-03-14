import scrapy
from datetime import datetime, timezone
import re
from scraper.items import LeadItem

class RecruiterSpider(scrapy.Spider):
    name = "recruiter"
    
    custom_settings = {
        "DOWNLOAD_DELAY": 1.5,
        "AUTOTHROTTLE_ENABLED": True,
    }

    def __init__(self, keyword="IT recruiter", *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.keyword = keyword
        # Example using remoteok.com
        formatted_keyword = keyword.replace(' ', '-')
        self.start_urls = [
            f"https://remoteok.com/remote-{formatted_keyword}-jobs"
        ]

    def parse(self, response):
        for row in response.css("tr.job"):
            company = row.css("td.company h3::text").get()
            website_path = row.css("td.company a::attr(href)").get()
            email_raw = row.css("td::text").getall()
            
            # Simple regex to find any email-like string in raw text
            email = next(
                (e.strip() for e in email_raw if re.match(r"[^@\s]+@[^@\s]+\.[^@\s]+", e.strip())), 
                None
            )
            
            website = f"https://remoteok.com{website_path}" if website_path else None

            if company:
                yield LeadItem(
                    company=company.strip(),
                    email=email,
                    phone=None,
                    website=website,
                    source=response.url,
                    used=False,
                    createdAt=datetime.now(timezone.utc).isoformat(),
                )

        # Basic pagination example (adapt if remoteok doesn't use simple 'a.next')
        # This is a sample logic for finding Next links
        next_page = response.css("a.next::attr(href)").get()
        if next_page:
            yield response.follow(next_page, self.parse)
