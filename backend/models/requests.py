from pydantic import BaseModel
from typing import List

class TextProcessRequest(BaseModel):
    text: str

class ImageProcessRequest(BaseModel):
    images: List[str]

class DownloadRequest(BaseModel):
    content: str
    filename: str
