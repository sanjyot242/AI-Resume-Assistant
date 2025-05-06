SAMPLE_STUDENTS = {
    "student_1": {
        "name": "Jane Doe",
        "email": "jane.doe@example.com",
        "phone": "123-456-7890",
        "education": "B.S. in Computer Science, XYZ University, Expected 2026",
        "skills": "Python, JavaScript, HTML/CSS, Git, Teamwork, Public Speaking",
        "experience": """ 
Intern at TechStart (Summer 2024):
- Developed a web app using Flask and React
- Collaborated with a team of 5 developers

Hackathon Participant:
- Built a language learning chatbot in 24 hours
- Won 2nd place out of 30 teams
"""
    },

    "student_2": {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "phone": "123-456-7890",
        "education": "B.S. in Computer Engineering, ABC University, Expected 2028",
        "skills": "Java, SQL, Soldering, MS Office",
        "experience": """ 
Software Development Intern (Summer 2026):
- Worked on developing backend APIs and assisted in debugging frontend features

Research Assistant:
- Assisted in research on machine learning algorithms and data analysis
"""
    }
}

SAMPLE_JOB_DESCRIPTIONS = {
    "job_1": """
Google is looking for a Cybersecurity Engineer to help protect our systems, users, and data. 
You will play a key role in identifying vulnerabilities, responding to threats, and building secure solutions. 
This is a hands-on technical role that requires a deep understanding of security principles and a passion for solving complex challenges.
""",

    "job_2": """
Apple is seeking a passionate and skilled Mobile App Developer to join our dynamic team. 
You will be responsible for designing, developing, and maintaining innovative and high-performance 
iOS applications that enhance the user experience across Apple devices.
""",

    "job_3": """
Microsoft is seeking a talented and motivated AI & Machine Learning Software Engineer to join our team. 
You will help design and build intelligent systems that power next-generation products and services. 
This role involves developing machine learning models, integrating them into scalable systems, 
and collaborating with product and research teams.
"""
}

def get_student(student_id):
    """Get student information by ID"""
    return SAMPLE_STUDENTS.get(student_id)

def get_job_description(job_id):
    """Get job description by ID"""
    return SAMPLE_JOB_DESCRIPTIONS.get(job_id)

def get_all_students():
    """Get all sample students"""
    return SAMPLE_STUDENTS

def get_all_job_descriptions():
    """Get all sample job descriptions"""
    return SAMPLE_JOB_DESCRIPTIONS