from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class Query(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "AI Service is running"}

@app.post("/process-text")
def process_text(query: Query):
    # In a real application, you would integrate your AI model here.
    # For now, we'll just return a simple response.
    return {
        "original_text": query.text,
        "processed_text": f"Processed: {query.text.upper()}"
    }
