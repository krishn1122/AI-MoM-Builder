from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Optional
import os
from dotenv import load_dotenv
import uvicorn

from services.gemini_service import GeminiService
from models.requests import TextProcessRequest, ImageProcessRequest
from utils.timezone_helper import TimezoneHelper

# Load environment variables
load_dotenv()

app = FastAPI(
    title="MOM Builder Free API",
    description="Generate professional Minutes of Meeting from text or images using Gemini AI",
    version="1.0.0"
)

# Configure CORS
allowed_origins = [
    "http://localhost:3000",
    "http://localhost:5000",
    "https://*.vercel.app",
    "https://mom-builder-free.vercel.app",  # Replace with your actual Vercel domain
    "https://mom-builder-free-krishn1122.vercel.app",  # Add variations
    # Add your actual Vercel URL here when you get it
    # "https://your-actual-vercel-url.vercel.app",
]

# In development, allow all origins
if os.getenv("ENVIRONMENT") == "development":
    allowed_origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# Initialize services
gemini_service = GeminiService()

@app.get("/")
async def root():
    return {"message": "MOM Builder Free API", "version": "1.0.0"}

@app.get("/api/health")
async def health_check():
    return {
        "status": "OK",
        "timestamp": TimezoneHelper.get_current_ist_timestamp(),
        "service": "MOM Builder Free Backend"
    }

@app.post("/api/process-text")
async def process_text(request: TextProcessRequest):
    """Process text input and generate MOM"""
    try:
        if not request.text or not request.text.strip():
            raise HTTPException(status_code=400, detail="Text input is required")
        
        result = await gemini_service.generate_mom_from_text(request.text)
        
        return {
            "success": True,
            "data": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process text: {str(e)}")

@app.post("/api/process-images")
async def process_images(request: ImageProcessRequest):
    """Process image inputs and generate MOM"""
    try:
        if not request.images or len(request.images) == 0:
            raise HTTPException(status_code=400, detail="At least one image is required")
        
        if len(request.images) > 10:
            raise HTTPException(status_code=400, detail="Maximum 10 images allowed")
        
        # Validate each image
        for i, image in enumerate(request.images):
            if not image or not isinstance(image, str):
                raise HTTPException(status_code=400, detail=f"Invalid image data at index {i}")
            
            # Check if it's a valid base64 string or data URL
            if not image.startswith('data:') and not image.replace('+', '').replace('/', '').replace('=', '').isalnum():
                raise HTTPException(status_code=400, detail=f"Invalid image format at index {i}")
        
        result = await gemini_service.generate_mom_from_images(request.images)
        
        return {
            "success": True,
            "data": result
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process images: {str(e)}")

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)
