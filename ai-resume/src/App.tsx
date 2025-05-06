// App.tsx
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AppLayout from './components/layout/AppLayout';
import MultiStepForm from './components/form/MultiStepForm';
import PersonalInfoForm from './components/resume/PersonalInfoForm';
import EducationForm from './components/resume/EducationForm';
import ExperienceForm from './components/resume/ExperienceForm';
import SkillsForm from './components/resume/SkillsForm';
import JobTargetForm from './components/resume/JobTargetForm';
import ResumePreview from './components/resume/ResumePreview';
import FileUpload from './components/ui/FileUpload';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import apiService from './services/apiService';

// API call for resume generation
const generateResume = async (
  formData: Record<string, any>
): Promise<Record<string, any>> => {
  // Call our backend API service
  const response = await apiService.generateResume(formData);

  // If the API call was successful, return the data
  if (response.success && response.resume) {
    // In a real implementation, we would parse the resume content
    // For now, we'll just return the original form data
    return {
      ...formData,
      generatedResume: response.resume,
    };
  }

  // If the API call failed, return the original data
  console.error('Error generating resume:', response.error);
  return formData;
};

// Create New Resume Page
const CreateResumePage: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [isGenerating, setIsGenerating] = useState(false);

  const handleFormComplete = async (data: Record<string, any>) => {
    setIsGenerating(true);
    try {
      const generatedResume = await generateResume(data);
      setFormData(generatedResume);
      navigate('/resume/preview');
    } catch (error) {
      console.error('Error generating resume:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const steps = [
    {
      id: 'personal',
      label: 'Personal Info',
      component: (
        <PersonalInfoForm
          formData={{}}
          onUpdateFormData={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          isFirstStep={true}
          isLastStep={false}
        />
      ),
    },
    {
      id: 'education',
      label: 'Education',
      component: (
        <EducationForm
          formData={{}}
          onUpdateFormData={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          isFirstStep={false}
          isLastStep={false}
        />
      ),
    },
    {
      id: 'experience',
      label: 'Experience',
      component: (
        <ExperienceForm
          formData={{}}
          onUpdateFormData={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          isFirstStep={false}
          isLastStep={false}
        />
      ),
    },
    {
      id: 'skills',
      label: 'Skills',
      component: (
        <SkillsForm
          formData={{}}
          onUpdateFormData={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          isFirstStep={false}
          isLastStep={false}
        />
      ),
    },
    {
      id: 'job-target',
      label: 'Job Target',
      component: (
        <JobTargetForm
          formData={{}}
          onUpdateFormData={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          isFirstStep={false}
          isLastStep={true}
        />
      ),
    },
  ];

  return (
    <AppLayout>
      <div className='max-w-4xl mx-auto py-8 px-4'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Create Your Resume
        </h1>
        <MultiStepForm
          steps={steps}
          onComplete={handleFormComplete}
          initialData={formData}
        />
      </div>
    </AppLayout>
  );
};

// Improve Existing Resume Page
const ImproveResumePage: React.FC = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (uploadedFile: File | null) => {
    setFile(uploadedFile);
    if (uploadedFile) {
      setError('');
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a resume file to upload');
      return;
    }

    setIsLoading(true);

    try {
      // Call our backend API service to parse the resume file
      const response = await apiService.parseResumeFile(file);

      if (response.success) {
        // Store parsed data in sessionStorage or state management
        // This would be handled better in a real implementation
        sessionStorage.setItem('parsedResumeData', JSON.stringify(response));
        navigate('/resume/edit');
      } else {
        setError(
          response.error ||
            'There was an error processing your resume. Please try again.'
        );
      }
    } catch (error) {
      console.error('Error parsing resume:', error);
      setError('There was an error processing your resume. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppLayout>
      <div className='max-w-4xl mx-auto py-8 px-4'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Improve Your Existing Resume
        </h1>

        <Card className='p-8'>
          <h2 className='text-xl font-semibold mb-6'>
            Upload Your Current Resume
          </h2>
          <p className='text-gray-600 mb-6'>
            Upload your existing resume, and our AI will analyze it, suggest
            improvements, and optimize it for applicant tracking systems.
          </p>

          <FileUpload
            label='Resume File'
            name='resume'
            accept='.pdf,.doc,.docx'
            onChange={handleFileChange}
            error={error}
            hint='Upload your resume in PDF, DOC, or DOCX format'
          />

          <div className='mt-6'>
            <Button
              variant='primary'
              fullWidth
              onClick={handleUpload}
              isLoading={isLoading}>
              Analyze My Resume
            </Button>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

// Resume Preview Page
const ResumePreviewPage: React.FC = () => {
  const navigate = useNavigate();
  const [isReGenerating, setIsReGenerating] = useState(false);

  // In a real app, this data would come from a state management library or context
  const [formData] = useState<Record<string, any>>({
    fullName: 'John Doe',
    email: 'john.doe@example.com',
    phone: '(555) 123-4567',
    location: 'New York, NY',
    linkedIn: 'linkedin.com/in/johndoe',
    website: 'johndoe.dev',
    summary:
      'Experienced software engineer with a passion for developing innovative solutions that solve real-world problems. Specializing in frontend development with React and TypeScript, with a strong background in user experience design and responsive web applications.',
    education: [
      {
        id: '1',
        school: 'University of Technology',
        degree: "Bachelor's Degree",
        fieldOfStudy: 'Computer Science',
        startDate: '2015-09',
        endDate: '2019-05',
        location: 'Boston, MA',
        gpa: '3.8',
        description:
          "Dean's List, Relevant coursework in Software Engineering, Data Structures, Algorithms",
        current: false,
      },
    ],
    experience: [
      {
        id: '1',
        company: 'Tech Solutions Inc.',
        jobTitle: 'Senior Frontend Developer',
        location: 'New York, NY',
        startDate: '2021-06',
        endDate: 'Present',
        current: true,
        description: 'Lead developer on customer-facing web applications',
        bullets: [
          'Architected and implemented a React component library that reduced development time by 40%',
          "Led a team of 5 developers in rebuilding the company's flagship product using React and TypeScript",
          'Implemented performance optimizations that improved load times by 60%',
          'Collaborated with UX designers to create an intuitive, accessible user interface',
        ],
      },
      {
        id: '2',
        company: 'Digital Innovations',
        jobTitle: 'Frontend Developer',
        location: 'Boston, MA',
        startDate: '2019-06',
        endDate: '2021-05',
        current: false,
        description: '',
        bullets: [
          'Developed responsive web applications using React and Redux',
          'Implemented unit tests that increased code coverage from 45% to 85%',
          'Mentored junior developers and conducted code reviews',
        ],
      },
    ],
    skills: [
      { id: '1', name: 'React', category: 'Programming', level: 'Expert' },
      { id: '2', name: 'TypeScript', category: 'Programming', level: 'Expert' },
      { id: '3', name: 'JavaScript', category: 'Programming', level: 'Expert' },
      { id: '4', name: 'HTML/CSS', category: 'Programming', level: 'Advanced' },
      { id: '5', name: 'Redux', category: 'Programming', level: 'Advanced' },
      { id: '6', name: 'Git', category: 'Tools', level: 'Advanced' },
      { id: '7', name: 'Jest', category: 'Tools', level: 'Intermediate' },
      { id: '8', name: 'Webpack', category: 'Tools', level: 'Intermediate' },
      {
        id: '9',
        name: 'UI/UX Design',
        category: 'Design',
        level: 'Intermediate',
      },
      {
        id: '10',
        name: 'Agile/Scrum',
        category: 'Management',
        level: 'Advanced',
      },
      {
        id: '11',
        name: 'Team Leadership',
        category: 'Soft Skills',
        level: 'Advanced',
      },
      {
        id: '12',
        name: 'Problem Solving',
        category: 'Soft Skills',
        level: 'Expert',
      },
    ],
  });

  const handleEdit = (section: string) => {
    navigate(`/resume/create?section=${section}`);
  };

  const handleSave = () => {
    console.log('Saving resume...');
    // Implementation would connect to backend service
  };

  const handleRegenerate = async () => {
    setIsReGenerating(true);
    try {
      // Call our backend API service to regenerate the resume
      const response = await apiService.generateResume(formData);

      if (response.success && response.resume) {
        // In a real implementation, we would update the form data with the new resume
        console.log('Resume regenerated successfully:', response.resume);

        // We could show a success message or update the UI
        // For now, we'll just show a console message
      } else {
        console.error('Error regenerating resume:', response.error);
      }
    } catch (error) {
      console.error('Error regenerating resume:', error);
    } finally {
      setIsReGenerating(false);
    }
  };

  return (
    <AppLayout>
      <div className='max-w-7xl mx-auto py-8 px-4'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Resume Preview
        </h1>
        <ResumePreview
          formData={formData}
          onEdit={handleEdit}
          onSave={handleSave}
          onRegenerate={handleRegenerate}
          isLoading={isReGenerating}
        />
      </div>
    </AppLayout>
  );
};

// Edit Resume After Upload Page
const EditResumePage: React.FC = () => {
  const navigate = useNavigate();

  // In a real app, this data would come from the resume parsing service
  const parsedResumeData = {
    fullName: 'Jane Smith',
    email: 'jane.smith@example.com',
    // ... other fields would be here
  };

  const steps = [
    {
      id: 'personal',
      label: 'Personal Info',
      component: (
        <PersonalInfoForm
          formData={{}}
          onUpdateFormData={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          isFirstStep={true}
          isLastStep={false}
        />
      ),
    },
    {
      id: 'education',
      label: 'Education',
      component: (
        <EducationForm
          formData={{}}
          onUpdateFormData={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          isFirstStep={false}
          isLastStep={false}
        />
      ),
    },
    {
      id: 'experience',
      label: 'Experience',
      component: (
        <ExperienceForm
          formData={{}}
          onUpdateFormData={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          isFirstStep={false}
          isLastStep={false}
        />
      ),
    },
    {
      id: 'skills',
      label: 'Skills',
      component: (
        <SkillsForm
          formData={{}}
          onUpdateFormData={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          isFirstStep={false}
          isLastStep={false}
        />
      ),
    },
    {
      id: 'job-target',
      label: 'Job Target',
      component: (
        <JobTargetForm
          formData={{}}
          onUpdateFormData={() => {}}
          onNext={() => {}}
          onBack={() => {}}
          isFirstStep={false}
          isLastStep={true}
        />
      ),
    },
  ];

  const handleFormComplete = async (data: Record<string, any>) => {
    // In a real implementation, this would send the data to a backend service
    // that would generate the improved resume
    navigate('/resume/preview');
  };

  return (
    <AppLayout>
      <div className='max-w-4xl mx-auto py-8 px-4'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>
          Edit Your Resume
        </h1>

        <Card className='p-6 mb-8'>
          <div className='flex items-start'>
            <div className='bg-blue-100 p-2 rounded-full mr-4'>
              <svg
                className='w-6 h-6 text-blue-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                />
              </svg>
            </div>
            <div>
              <h3 className='font-medium text-lg text-gray-900'>
                We've Pre-Filled Your Information
              </h3>
              <p className='text-gray-600'>
                We've parsed your uploaded resume and pre-filled the forms.
                Please review and edit each section, then add your target job
                information to optimize your resume.
              </p>
            </div>
          </div>
        </Card>

        <MultiStepForm
          steps={steps}
          onComplete={handleFormComplete}
          initialData={parsedResumeData}
        />
      </div>
    </AppLayout>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/resume/create' element={<CreateResumePage />} />
        <Route path='/resume/improve' element={<ImproveResumePage />} />
        <Route path='/resume/edit' element={<EditResumePage />} />
        <Route path='/resume/preview' element={<ResumePreviewPage />} />
      </Routes>
    </Router>
  );
};

export default App;
