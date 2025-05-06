from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models.models import ResumeRequest
import os
from dotenv import load_dotenv

# Import our API functions
from api.resume_generator import generate_resume, generate_cover_letter, generate_resume_advice

# Load environment variables
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="AI Resume Builder API",
    description="API for generating resumes, cover letters, and resume advice",
    version="1.0.0"
)

# Configure CORS
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# API Endpoints
@app.get("/")
async def root():
    return {"message": "Welcome to the AI Resume Builder API"}

@app.post("/api/generate-resume")
async def api_generate_resume(request: ResumeRequest):
    try:
        resume = generate_resume(
            request.student_info.name,
            request.student_info.email,
            request.student_info.phone,
            request.student_info.education,
            request.student_info.skills,
            request.student_info.experience,
            request.job_description,
            location=request.student_info.location,
            linkedIn=request.student_info.linkedIn,
            website=request.student_info.website,
            summary=request.student_info.summary,
            job_target=request.student_info.job_target
        )
        return {"success": True, "resume": resume}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-cover-letter")
async def api_generate_cover_letter(request: ResumeRequest):
    try:
        cover_letter = generate_cover_letter(
            request.student_info.name,
            request.student_info.email,
            request.student_info.phone,
            request.student_info.education,
            request.student_info.skills,
            request.student_info.experience,
            request.job_description
        )
        return {"success": True, "cover_letter": cover_letter}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-resume-advice")
async def api_generate_resume_advice(request: ResumeRequest):
    try:
        advice = generate_resume_advice(
            request.student_info.name,
            request.student_info.email,
            request.student_info.phone,
            request.student_info.education,
            request.student_info.skills,
            request.student_info.experience,
            request.job_description
        )
        return {"success": True, "advice": advice}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Run the server
if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", 8000))
    host = os.getenv("HOST", "0.0.0.0")
    uvicorn.run("server:app", host=host, port=port, reload=True)