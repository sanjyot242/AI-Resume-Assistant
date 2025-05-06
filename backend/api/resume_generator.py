from openai import OpenAI
from dotenv import load_dotenv
import os
import json
from pydantic import ValidationError

from models.models import ResumeProfile







# load environment variables
load_dotenv()

# access openAI API
client = OpenAI(
    api_key = os.getenv("OPENAI_API_KEY")
) 

# use chat completions api to generate resume based on student information
def generate_resume(name, email, phone, education, skills, experience, job_description,
                   location="", linkedIn="", website="", summary="", job_target=""):
    prompt = f"""
Please output **only** valid JSON matching this TypeScript interface (no extra keys, no prose):

interface Profile {{
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedIn: string;
    website: string;
    summary: string;
    education: Array<{{
        id: string;
        school: string;
        degree: string;
        fieldOfStudy: string;
        startDate: string;
        endDate: string;
        location: string;
        gpa: string;
        description: string;
        current: boolean;
    }}>;
    experience: Array<{{
        id: string;
        company: string;
        jobTitle: string;
        location: string;
        startDate: string;
        endDate: string;
        current: boolean;
        description: string;
        bullets: string[];
    }}>;
    skills: Array<{{
        id: string;
        name: string;
        category: string;
        level: string;
    }}>;
}}

Create a professional resume profile using the following information:

Name: {name}
Email: {email}
Phone: {phone}
Location: {location}
LinkedIn: {linkedIn}
Website: {website}

Summary:
{summary}

Education:
{education}

Skills:
{skills}

Experience:
{experience}

Target Job Information:
{job_target}

Job Description:
{job_description}

Create a compelling, ATS-optimized profile for this person targeting the given job description. 
Each education and experience item needs a unique id string.
Each skill needs a unique id string.
Ensure bullets are detailed and quantified where possible.
Organize skills into appropriate categories.
"""

    completion = client.chat.completions.create(
        model="gpt-4o-mini",  
        messages=[
            {"role": "system", "content": "You are a professional resume generator that outputs only valid JSON. No additional text or commentary."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    # Get the JSON text from the response
    json_text = completion.choices[0].message.content
    
    # Clean up the JSON text (remove any markdown formatting if present)
    if "```json" in json_text:
        json_text = json_text.split("```json")[1].split("```")[0].strip()
    elif "```" in json_text:
        json_text = json_text.split("```")[1].split("```")[0].strip()
    
    try:
        # Parse the JSON
        resume_data = json.loads(json_text)
        # Validate with Pydantic
        resume_profile = ResumeProfile(**resume_data)
        return resume_profile
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        print(f"Raw JSON: {json_text}")
        raise ValueError(f"Invalid JSON received from AI: {e}")
    except ValidationError as e:
        print(f"Validation error: {e}")
        raise ValueError(f"AI response didn't match expected schema: {e}")



# use chat completions api to generate cover letter based on student information
def generate_cover_letter(name, email, phone, education, skills, experience, job_description):
    prompt = f"""
You are an expert cover letter writer. Create a professional, one-page cover letter for a student based on the following input:

Name: {name}
Email: {email}
Phone: {phone}

Education:
{education}

Skills:
{skills}

Experience:
{experience}

Job Description:
{job_description}

Only use the information provided by the student. Do not add extra experiences, projects, or certifications.
Highlight accomplishments and achievements using strong action verbs and quantifiable data and statisics.
Tailor the cover letter to the given job description, referencing specific skills and experiences relevant to the job.
"""

    completion = client.chat.completions.create(
        model="gpt-4o-mini",  
        messages=[
            {"role": "system", "content": "You are a professional cover letter generator."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    cover_letter = completion.choices[0].message.content
    return cover_letter

# use chat completions api to generate resume advice based on student information
def generate_resume_advice(name, email, phone, education, skills, experience, job_description):
    prompt = f"""
You are an expert career adviser and resume reviewer. Review a student's resume based on the following input:

Name: {name}
Email: {email}
Phone: {phone}

Education:
{education}

Skills:
{skills}

Experience:
{experience}

Job Description:
{job_description}

Make a "Advice" section that provides suggestions on how the student can improve the resume in a clear, concise, bullet-point form.
Tailor the suggestions to the given job description, referencing specific skills and experiences relevant to the job.
"""

    completion = client.chat.completions.create(
        model="gpt-4o-mini",  
        messages=[
            {"role": "system", "content": "You are a professional resume advice generator."},
            {"role": "user", "content": prompt}
        ],
        temperature=0.7
    )

    resume_advice = completion.choices[0].message.content
    return resume_advice 

#  Test with sample input
# resume = generate_resume(student_info.student_1["name"], 
#                                         student_info.student_1["email"], 
#                                         student_info.student_1["phone"], 
#                                         student_info.student_1["education"], 
#                                         student_info.student_1["skills"], 
#                                         student_info.student_1["experience"], 
#                                         student_info.job_description_1)

# cover_letter = generate_cover_letter(student_info.student_1["name"], 
#                                         student_info.student_1["email"], 
#                                         student_info.student_1["phone"], 
#                                         student_info.student_1["education"], 
#                                         student_info.student_1["skills"], 
#                                         student_info.student_1["experience"], 
#                                         student_info.job_description_1)

# resume_advice = generate__resume_advice(student_info.student_2["name"], 
#                                         student_info.student_2["email"], 
#                                         student_info.student_2["phone"], 
#                                         student_info.student_2["education"], 
#                                         student_info.student_2["skills"], 
#                                         student_info.student_2["experience"], 
#                                         student_info.job_description_2)

# print(resume)
# print(cover_letter)
# print(resume_advice)
