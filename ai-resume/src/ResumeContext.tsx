// ResumeContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';
import {
  ResumeData,
  ResumeContextType,
  DeepPartial,
  FormStepId,
} from './types';

// Default resume data structure
const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedIn: '',
    website: '',
    summary: '',
  },
  education: [],
  experience: [],
  skills: [],
  jobTarget: {
    targetJobTitle: '',
    targetIndustry: '',
    targetCompanySize: '',
    targetJobLevel: '',
    jobDescription: '',
    keySkillsToHighlight: '',
    additionalNotes: '',
  },
};

// Create context with default values
const ResumeContext = createContext<ResumeContextType>({
  resumeData: defaultResumeData,
  setResumeData: () => {},
  updateSection: () => {},
  isLoading: false,
  errors: {},
});

// Custom hook to use the resume context
export const useResumeContext = () => useContext(ResumeContext);

// Props for the context provider
interface ResumeProviderProps {
  children: ReactNode;
  initialData?: DeepPartial<ResumeData>;
}

// Provider component
export const ResumeProvider: React.FC<ResumeProviderProps> = ({
  children,
  initialData = {},
}) => {
  // Merge the initial data with the default data
  const mergedData: ResumeData = {
    personalInfo: {
      ...defaultResumeData.personalInfo,
      ...initialData.personalInfo,
    },
    education: initialData.education || defaultResumeData.education,
    experience: initialData.experience || defaultResumeData.experience,
    skills: initialData.skills || defaultResumeData.skills,
    jobTarget: {
      ...defaultResumeData.jobTarget,
      ...initialData.jobTarget,
    },
  };

  // State for the resume data
  const [resumeData, setResumeData] = useState<ResumeData>(mergedData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, any>>({});

  // Function to update a specific section of the resume data
  const updateSection = <K extends keyof ResumeData>(
    section: K,
    data: ResumeData[K]
  ) => {
    setResumeData((prevData) => ({
      ...prevData,
      [section]: data,
    }));
  };

  // Context value
  const contextValue: ResumeContextType = {
    resumeData,
    setResumeData,
    updateSection,
    isLoading,
    errors,
  };

  return (
    <ResumeContext.Provider value={contextValue}>
      {children}
    </ResumeContext.Provider>
  );
};

// HOC to wrap components with the resume context
export const withResumeContext = <P extends object>(
  Component: React.ComponentType<P>
): React.FC<P & Omit<ResumeProviderProps, 'children'>> => {
  return ({ initialData, ...props }) => (
    <ResumeProvider initialData={initialData}>
      <Component {...(props as P)} />
    </ResumeProvider>
  );
};

export default ResumeContext;
