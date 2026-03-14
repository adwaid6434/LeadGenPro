import scrapy

class LeadItem(scrapy.Item):
    company  = scrapy.Field()
    email    = scrapy.Field()
    phone    = scrapy.Field()
    website  = scrapy.Field()
    source   = scrapy.Field()
    used     = scrapy.Field()
    createdAt = scrapy.Field()
