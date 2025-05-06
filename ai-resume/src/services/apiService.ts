// apiService.ts - API service for handling backend requests
import { ResumeGenerationResponse } from '../types'; // Adjust the import path as necessary
// API base URL - would come from environment in a real app
const API_BASE_URL = 'http://localhost:8000';

interface StudentInfo {
  name: string;
  email: string;
  phone: string;
  location?: string;
  linkedIn?: string;
  website?: string;
  education: string;
  skills: string;
  experience: string;
  summary?: string;
  job_target?: string;
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

// Updated convertFormDataToStudentInfo function:
const convertFormDataToStudentInfo = (
  formData: Record<string, any>
): StudentInfo => {
  // Personal info
  const name = formData.fullName || '';
  const email = formData.email || '';
  const phone = formData.phone || '';
  const location = formData.location || '';
  const linkedIn = formData.linkedIn || '';
  const website = formData.website || '';
  const summary = formData.summary || '';

  // Format education more effectively
  const education =
    formData.education
      ?.map((edu: any) => {
        return `${edu.degree} in ${edu.fieldOfStudy}, ${edu.school}, ${
          edu.startDate
        } - ${edu.current ? 'Present' : edu.endDate}${
          edu.gpa ? `, GPA: ${edu.gpa}` : ''
        }${edu.location ? `, ${edu.location}` : ''}${
          edu.description ? `\n${edu.description}` : ''
        }`;
      })
      .join('\n\n') || '';

  // Format experience more effectively
  const experience =
    formData.experience
      ?.map((exp: any) => {
        const bullets =
          exp.bullets
            ?.filter((b: string) => b.trim())
            .map((bullet: string) => `- ${bullet}`)
            .join('\n') || '';
        return `${exp.jobTitle} at ${exp.company}, ${exp.startDate} - ${
          exp.current ? 'Present' : exp.endDate
        }${exp.location ? `, ${exp.location}` : ''}${
          exp.description ? `\n${exp.description}` : ''
        }${bullets ? `\n${bullets}` : ''}`;
      })
      .join('\n\n') || '';

  // Group skills by category for better organization
  const skillsByCategory =
    formData.skills?.reduce((acc: any, skill: any) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(
        `${skill.name}${skill.level ? ` (${skill.level})` : ''}`
      );
      return acc;
    }, {}) || {};

  const skillsFormatted = Object.entries(skillsByCategory)
    .map(
      ([category, skills]) => `${category}: ${(skills as string[]).join(', ')}`
    )
    .join('\n');

  // Critical fix: Extract job target information correctly
  // This directly references the individual fields from formData
  const jobTarget =
    `Target Job Title: ${formData.targetJobTitle || ''}\n` +
    `Target Industry: ${formData.targetIndustry || ''}\n` +
    `Target Company Size: ${formData.targetCompanySize || ''}\n` +
    `Target Level: ${formData.targetJobLevel || ''}\n` +
    `Key Skills to Highlight: ${formData.keySkillsToHighlight || ''}\n` +
    `Job Description: ${formData.jobDescription || ''}\n` +
    `Additional Notes: ${formData.additionalNotes || ''}`;

  return {
    name,
    email,
    phone,
    location,
    linkedIn,
    website,
    education,
    skills: skillsFormatted,
    experience,
    summary,
    job_target: jobTarget, // Include the job target information
  };
};

/**
 * Generate a resume with AI assistance
 */
export async function generateResume(
  formData: Record<string, any>
): Promise<ResumeGenerationResponse> {
  try {
    const studentInfo = convertFormDataToStudentInfo(formData);
    // Extract job description directly from formData
    const jobDescription = formData.jobDescription || '';

    console.log('Sending to backend:', {
      student_info: studentInfo,
      job_description: jobDescription,
    });

    const response = await fetch(`${API_BASE_URL}/api/generate-resume`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_info: studentInfo,
        job_description: jobDescription,
      }),
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
