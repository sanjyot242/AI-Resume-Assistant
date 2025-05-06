from pydantic import BaseModel
from typing import Optional, List

class EducationItem(BaseModel):
    id: str
    school: str
    degree: str
    fieldOfStudy: str
    startDate: str
    endDate: str
    location: Optional[str] = ""
    gpa: Optional[str] = ""
    description: Optional[str] = ""
    current: bool

class ExperienceItem(BaseModel):
    id: str
    company: str
    jobTitle: str
    location: Optional[str] = ""
    startDate: str
    endDate: str
    current: bool
    description: Optional[str] = ""
    bullets: List[str]

class SkillItem(BaseModel):
    id: str
    name: str
    category: str
    level: Optional[str] = ""

class ResumeProfile(BaseModel):
    fullName: str
    email: str
    phone: str
    location: str
    linkedIn: Optional[str] = ""
    website: Optional[str] = ""
    summary: str
    education: List[EducationItem]
    experience: List[ExperienceItem]
    skills: List[SkillItem]

class StudentInfo(BaseModel):
    name: str
    email: str
    phone: str
    location: Optional[str] = ""
    linkedIn: Optional[str] = ""
    website: Optional[str] = ""
    education: str
    skills: str
    experience: str
    summary: Optional[str] = ""
    job_target: Optional[str] = ""

class ResumeRequest(BaseModel):
    student_info: StudentInfo
    job_description: str

class ResumeResponse(BaseModel):
    success: bool
    resume: Optional[ResumeProfile] = None
    error: Optional[str] = None