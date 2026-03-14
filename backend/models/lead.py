from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class Lead(BaseModel):
    company:   str
    email:     Optional[EmailStr] = None
    phone:     Optional[str] = None
    website:   Optional[str] = None
    source:    str
    used:      bool = False
    createdAt: datetime
