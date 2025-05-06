// apiService.ts - API service for handling backend requests

// API base URL - would come from environment in a real app
const API_BASE_URL = 'http://localhost:8000';

// Types
interface StudentInfo {
  name: string;
  email: string;
  phone: string;
  education: string;
  skills: string;
  experience: string;
}

interface ResumeRequest {
  student_info: StudentInfo;
  job_description: string;
}

interface ResumeResponse {
  success: boolean;
  resume?: string;
  cover_letter?: string;
  advice?: string;
  error?: string;
}

/**
 * Convert frontend form data to backend student info format
 */
const convertFormDataToStudentInfo = (
  formData: Record<string, any>
): StudentInfo => {
  // Personal info
  const name = formData.fullName || '';
  const email = formData.email || '';
  const phone = formData.phone || '';

  // Education
  const education =
    formData.education
      ?.map((edu: any) => {
        return `${edu.degree} in ${edu.fieldOfStudy}, ${edu.school}, ${
          edu.startDate
        } - ${edu.current ? 'Present' : edu.endDate}${
          edu.gpa ? `, GPA: ${edu.gpa}` : ''
        }${edu.description ? `\n${edu.description}` : ''}`;
      })
      .join('\n\n') || '';

  // Experience
  const experience =
    formData.experience
      ?.map((exp: any) => {
        const bullets =
          exp.bullets?.map((bullet: string) => `- ${bullet}`).join('\n') || '';
        return `${exp.jobTitle} at ${exp.company}, ${exp.startDate} - ${
          exp.current ? 'Present' : exp.endDate
        }${exp.location ? `, ${exp.location}` : ''}${
          exp.description ? `\n${exp.description}` : ''
        }${bullets ? `\n${bullets}` : ''}`;
      })
      .join('\n\n') || '';

  // Skills
  const skills =
    formData.skills
      ?.map((skill: any) => {
        return `${skill.name}${skill.level ? ` (${skill.level})` : ''}`;
      })
      .join(', ') || '';

  return {
    name,
    email,
    phone,
    education,
    skills,
    experience,
  };
};

/**
 * Generate a resume with AI assistance
 */
export async function generateResume(
  formData: Record<string, any>
): Promise<ResumeResponse> {
  try {
    const studentInfo = convertFormDataToStudentInfo(formData);
    const jobDescription = formData.jobTarget?.jobDescription || '';

    const response = await fetch(`${API_BASE_URL}/api/generate-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_info: studentInfo,
        job_description: jobDescription,
      } as ResumeRequest),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating resume:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate a cover letter with AI assistance
 */
export async function generateCoverLetter(
  formData: Record<string, any>
): Promise<ResumeResponse> {
  try {
    const studentInfo = convertFormDataToStudentInfo(formData);
    const jobDescription = formData.jobTarget?.jobDescription || '';

    const response = await fetch(`${API_BASE_URL}/api/generate-cover-letter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_info: studentInfo,
        job_description: jobDescription,
      } as ResumeRequest),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating cover letter:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Generate resume advice with AI assistance
 */
export async function generateResumeAdvice(
  formData: Record<string, any>
): Promise<ResumeResponse> {
  try {
    const studentInfo = convertFormDataToStudentInfo(formData);
    const jobDescription = formData.jobTarget?.jobDescription || '';

    const response = await fetch(`${API_BASE_URL}/api/generate-resume-advice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_info: studentInfo,
        job_description: jobDescription,
      } as ResumeRequest),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error generating resume advice:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

/**
 * Parse an uploaded resume file
 * Note: This is a placeholder and would need a real backend implementation
 */
export async function parseResumeFile(file: File): Promise<ResumeResponse> {
  try {
    // In a real implementation, this would be a file upload to backend
    // For now, we'll simulate it
    const formData = new FormData();
    formData.append('resume', file);

    // Simulating a response
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // This is where the real implementation would call the backend
    return {
      success: true,
      // Mocked parsed data would be returned here
    };
  } catch (error) {
    console.error('Error parsing resume file:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export default {
  generateResume,
  generateCoverLetter,
  generateResumeAdvice,
  parseResumeFile,
};
