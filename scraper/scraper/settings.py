BOT_NAME = "scraper"

SPIDER_MODULES = ["scraper.spiders"]
NEWSPIDER_MODULE = "scraper.spiders"

ITEM_PIPELINES = {
    "scraper.pipelines.MongoPipeline": 300
}

DOWNLOADER_MIDDLEWARES = {
    "scraper.middlewares.RotateUserAgentMiddleware": 400,
}

RETRY_TIMES = 3
RETRY_HTTP_CODES = [429, 500, 502, 503, 504]

AUTOTHROTTLE_ENABLED = True
AUTOTHROTTLE_START_DELAY = 1
AUTOTHROTTLE_MAX_DELAY = 10

# Respect robots.txt
ROBOTSTXT_OBEY = False

# Set settings whose default value is deprecated to a future-proof value
REQUEST_FINGERPRINTER_IMPLEMENTATION = "2.7"
TWISTED_REACTOR = "twisted.internet.asyncioreactor.AsyncioSelectorReactor"
FEED_EXPORT_ENCODING = "utf-8"
