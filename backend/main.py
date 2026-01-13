from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from gradio_client import Client
from typing import Dict
import tempfile
import os

from disease_data import DISEASE_INFO

app = FastAPI(title="Cotton Leaf Disease Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PredictionResponse(BaseModel):
    predicted_class: str
    confidence: float
    severity: str
    treatment: str
    probabilities: Dict[str, float]


ALLOWED_EXTENSIONS = {"jpg", "jpeg", "png"}
MAX_FILE_SIZE = 5 * 1024 * 1024


@app.post("/predict", response_model=PredictionResponse)
async def predict(file: UploadFile = File(...)) -> PredictionResponse:
    if not file.filename:
        raise HTTPException(status_code=400, detail="No file provided")
    
    file_ext = file.filename.split(".")[-1].lower()
    if file_ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail=f"Invalid file type. Allowed types: {', '.join(ALLOWED_EXTENSIONS)}"
        )
    
    contents = await file.read()
    if len(contents) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=400,
            detail="File size exceeds 5MB limit"
        )
    
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=f".{file_ext}") as tmp_file:
            tmp_file.write(contents)
            tmp_file_path = tmp_file.name
        
        try:
            client = Client("shoaibramim/CLDD_ResNet50")
            result = client.predict(
                tmp_file_path,
                api_name="/predict"
            )
            
            if not result or not isinstance(result, dict):
                raise HTTPException(
                    status_code=500,
                    detail="Invalid response from model"
                )
            
            confidences = result.get("confidences", [])
            if not confidences:
                raise HTTPException(
                    status_code=500,
                    detail="No predictions returned from model"
                )
            
            probabilities = {item["label"]: item["confidence"] for item in confidences}
            
            sorted_probs = dict(sorted(probabilities.items(), key=lambda x: x[1], reverse=True))
            
            predicted_class = list(sorted_probs.keys())[0]
            confidence = list(sorted_probs.values())[0]
            
            disease_info = DISEASE_INFO.get(predicted_class, {
                "severity": "Unknown",
                "treatment": "Consult agricultural expert for proper diagnosis."
            })
            
            return PredictionResponse(
                predicted_class=predicted_class,
                confidence=confidence,
                severity=disease_info["severity"],
                treatment=disease_info["treatment"],
                probabilities=sorted_probs
            )
        
        finally:
            if os.path.exists(tmp_file_path):
                os.unlink(tmp_file_path)
    
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )


@app.get("/")
async def root():
    return {"message": "Cotton Leaf Disease Detection API", "status": "active"}


@app.get("/health")
async def health():
    return {"status": "healthy"}
