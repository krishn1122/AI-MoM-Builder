from pydantic import BaseModel
from typing import List, Optional

class TextProcessRequest(BaseModel):
    text: str

class ImageProcessRequest(BaseModel):
    images: List[str]

class DownloadRequest(BaseModel):
    content: str
    filename: Optional[str] = None
