// types.ts
export interface PersonalInfo {
  name: string;
  email: string;
  phone: string;
  location: string;
  linkedIn?: string;
  website?: string;
  summary?: string;
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location?: string;
  gpa?: string;
  description?: string;
  current: boolean;
}

export interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  location?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bullets: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level?: string;
}

export interface ResumeProfile {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedIn: string;
  website: string;
  summary: string;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
}

export interface JobTarget {
  targetJobTitle: string;
  targetIndustry?: string;
  targetCompanySize?: string;
  targetJobLevel?: string;
  jobDescription?: string;
  keySkillsToHighlight?: string;
  additionalNotes?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  jobTarget?: JobTarget;
}

export type FormStepId =
  | 'personal'
  | 'education'
  | 'experience'
  | 'skills'
  | 'job-target';

export interface FormStep {
  id: FormStepId;
  label: string;
  component: React.ReactElement;
  optional?: boolean;
}

export interface StepInfo {
  id: string;
  label: string;
  optional?: boolean;
}

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'danger'
  | 'success';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type InputSize = 'sm' | 'md' | 'lg';

export interface Option {
  value: string;
  label: string;
}

// API related types
export interface APIError {
  message: string;
  code?: string;
  details?: any;
}

export interface ResumeGenerationResponse {
  success: boolean;
  resume?: ResumeProfile;
  error?: APIError | string;
  optimizationScore?: number;
  suggestions?: ResumeSuggestion[];
  atsResults?: ATSResults;
}

export interface ResumeSuggestion {
  id: string;
  type: 'improvement' | 'warning' | 'tip';
  section: FormStepId;
  title: string;
  description: string;
  fieldId?: string;
  suggestedChange?: string;
}

export interface ATSResults {
  score: number;
  matchedKeywords: string[];
  suggestedKeywords: string[];
  formatAnalysis: {
    structure: boolean;
    headers: boolean;
    chronological: boolean;
    bulletPoints?: boolean;
  };
}

// Context types
export interface ResumeContextType {
  resumeData: ResumeData;
  setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
  updateSection: <K extends keyof ResumeData>(
    section: K,
    data: ResumeData[K]
  ) => void;
  isLoading: boolean;
  errors: Record<string, any>;
}

// Utility type helpers
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};
