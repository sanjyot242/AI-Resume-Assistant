# AI Resume Builder

A full-stack application that uses AI to help users create, optimize, and improve resumes tailored to specific job descriptions.

## Project Structure Overview

The project is organized into two main parts:
- **Frontend**: React/TypeScript application built with Vite (in the `ai-resume` directory)
- **Backend**: Python FastAPI application (in the `backend` directory)

## Frontend Structure (`ai-resume` directory)

### Core Files
- `index.html`: Main HTML entry point
- `tsconfig.json`: TypeScript configuration
- `package.json`: Dependencies and scripts
- `tailwind.config.js`: Tailwind CSS configuration
- `vite.config.ts`: Vite bundler configuration

### Source Code (`src` directory)
- `main.tsx`: Application entry point
- `App.tsx`: Main React component with router setup
- `index.css`: Global styles (uses Tailwind CSS)

### Components Organization
- `components/`: Reusable UI components
  - `ui/`: Basic UI elements (buttons, inputs, cards, etc.)
    - `Button.tsx`: Reusable button component with variants
    - `Card.tsx`: Container component
    - `TextField.tsx`: Input field component
    - `TextArea.tsx`: Multiline text input
    - `SelectField.tsx`: Dropdown component
    - `FileUpload.tsx`: File upload component
  - `layout/`: Layout-related components
    - `AppLayout.tsx`: Main application layout with header/footer
    - `FormSection.tsx`: Section container for forms
  - `form/`: Form-related components
    - `FormStepper.tsx`: Multi-step form navigation
    - `MultiStepForm.tsx`: Container for multi-step forms
  - `resume/`: Resume-specific components
    - `PersonalInfoForm.tsx`: Personal information form
    - `EducationForm.tsx`: Education form
    - `ExperienceForm.tsx`: Work experience form
    - `SkillsForm.tsx`: Skills form
    - `JobTargetForm.tsx`: Target job information form
    - `ResumePreview.tsx`: Resume preview and editing

### Pages
- `pages/`: Application pages
  - `LandingPage.tsx`: Homepage

### Services & Context
- `services/`: API and other service interfaces
  - `apiService.ts`: Handles communication with backend
- `ResumeContext.tsx`: React context for resume data
- `types.ts`: TypeScript type definitions

## Backend Structure (`backend` directory)

### Core Files
- `server.py`: Main FastAPI server setup and endpoints
- `requirements.txt`: Python dependencies

### API Implementation
- `api/`: API-related code
  - `__init__.py`: Module exports
  - `resume_generator.py`: Core AI-powered resume generation logic

### Data Models
- `models/`: Data models and sample data
  - `models.py`: Pydantic models for request/response validation
  - `student_info.py`: Sample student data for testing

## How the Application Works

### Frontend Flow
1. User starts at the landing page (`LandingPage.tsx`)
2. User can choose to create a new resume or improve an existing one
3. For new resumes, user goes through a series of forms (`MultiStepForm.tsx`):
   - Personal info (`PersonalInfoForm.tsx`)
   - Education (`EducationForm.tsx`)
   - Work experience (`ExperienceForm.tsx`)
   - Skills (`SkillsForm.tsx`)
   - Job target info (`JobTargetForm.tsx`)
4. The form data is sent to the backend via `apiService.ts`
5. Once processed, the user sees the optimized resume in `ResumePreview.tsx`

### Backend Flow
1. Server receives requests through FastAPI endpoints in `server.py`
2. Request data is validated using Pydantic models in `models.py`
3. The resume generator in `resume_generator.py` uses OpenAI to:
   - Generate an optimized resume based on user input and job description
   - Format the content to match the expected schema
4. The response is sent back to the frontend with the generated resume data

## Key Features

- **Multi-step forms**: Easy-to-follow form process
- **AI optimization**: Uses OpenAI to tailor resumes to specific job descriptions
- **ATS optimization**: Ensures resumes pass Applicant Tracking Systems
- **Resume preview**: Interactive preview with tabs for different views
- **Export options**: Download as PDF or DOCX
- **Responsive design**: Works on mobile and desktop

## How to Run the Project

### Frontend
```bash
cd ai-resume
npm install
npm run dev
```

### Backend
```bash
cd backend
# Create a virtual environment (optional but recommended)
python -m venv my_env
source my_env/bin/activate  # On Windows: my_env\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up .env file with your OpenAI API key
echo "OPENAI_API_KEY=your-api-key-here" > .env

# Run the server
uvicorn server:app --reload
```

## Technology Stack

### Frontend
- React 19
- TypeScript
- Tailwind CSS
- React Router
- Vite

### Backend
- Python
- FastAPI
- Pydantic
- OpenAI API


