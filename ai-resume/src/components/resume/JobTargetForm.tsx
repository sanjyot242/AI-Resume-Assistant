// JobTargetForm.tsx
import React, { useState, useEffect } from 'react';
import FormSection from '../layout/FormSection';
import TextField from '../ui/TextField';
import TextArea from '../ui/TextArea';
import SelectField from '../ui/SelectField';
import Card from '../ui/Card';

interface JobTargetFormProps {
  formData: Record<string, any>;
  onUpdateFormData: (data: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const JobTargetForm: React.FC<JobTargetFormProps> = ({
  formData,
  onUpdateFormData,
  onNext,
}) => {
  const [jobTarget, setJobTarget] = useState({
    targetJobTitle: formData.targetJobTitle || '',
    targetIndustry: formData.targetIndustry || '',
    targetCompanySize: formData.targetCompanySize || '',
    targetJobLevel: formData.targetJobLevel || '',
    jobDescription: formData.jobDescription || '',
    keySkillsToHighlight: formData.keySkillsToHighlight || '',
    additionalNotes: formData.additionalNotes || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update parent form data when local state changes
  useEffect(() => {
    onUpdateFormData(jobTarget);
  }, [jobTarget, onUpdateFormData]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setJobTarget((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  // Validate form before moving to next step
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // At least one of these fields should be filled
    if (!jobTarget.targetJobTitle.trim() && !jobTarget.jobDescription.trim()) {
      newErrors.targetJobTitle =
        'Please provide either a target job title or a job description';
      newErrors.jobDescription =
        'Please provide either a target job title or a job description';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onNext();
    }
  };

  // Options for dropdown selects
  const industrySizeOptions = [
    { value: '', label: 'Select company size (optional)' },
    { value: 'Startup', label: 'Startup (1-50 employees)' },
    { value: 'Small', label: 'Small (51-200 employees)' },
    { value: 'Medium', label: 'Medium (201-1000 employees)' },
    { value: 'Large', label: 'Large (1001-5000 employees)' },
    { value: 'Enterprise', label: 'Enterprise (5001+ employees)' },
  ];

  const jobLevelOptions = [
    { value: '', label: 'Select job level (optional)' },
    { value: 'Entry Level', label: 'Entry Level' },
    { value: 'Junior', label: 'Junior' },
    { value: 'Mid-Level', label: 'Mid-Level' },
    { value: 'Senior', label: 'Senior' },
    { value: 'Lead', label: 'Lead' },
    { value: 'Manager', label: 'Manager' },
    { value: 'Director', label: 'Director' },
    { value: 'Executive', label: 'Executive (VP, C-Suite)' },
  ];

  const industryOptions = [
    { value: '', label: 'Select industry (optional)' },
    { value: 'Technology', label: 'Technology' },
    { value: 'Healthcare', label: 'Healthcare' },
    { value: 'Finance', label: 'Finance' },
    { value: 'Education', label: 'Education' },
    { value: 'Manufacturing', label: 'Manufacturing' },
    { value: 'Retail', label: 'Retail' },
    { value: 'Media', label: 'Media & Entertainment' },
    { value: 'Government', label: 'Government' },
    { value: 'Nonprofit', label: 'Nonprofit' },
    { value: 'Consulting', label: 'Consulting' },
    { value: 'Legal', label: 'Legal' },
    { value: 'Real Estate', label: 'Real Estate' },
    { value: 'Transportation', label: 'Transportation & Logistics' },
    { value: 'Energy', label: 'Energy & Utilities' },
    { value: 'Agriculture', label: 'Agriculture' },
    { value: 'Hospitality', label: 'Hospitality & Tourism' },
    { value: 'Construction', label: 'Construction' },
    { value: 'Telecommunications', label: 'Telecommunications' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <FormSection
      title='Job Target'
      description='Help us tailor your resume to your target job. The more information you provide, the better we can optimize your resume.'
      icon={
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z'
          />
        </svg>
      }>
      <form onSubmit={handleSubmit}>
        <Card className='mb-6'>
          <div className='px-4 py-3 bg-yellow-50 border-l-4 border-yellow-400'>
            <div className='flex'>
              <div className='flex-shrink-0'>
                <svg
                  className='h-5 w-5 text-yellow-400'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 20 20'
                  fill='currentColor'
                  aria-hidden='true'>
                  <path
                    fillRule='evenodd'
                    d='M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z'
                    clipRule='evenodd'
                  />
                </svg>
              </div>
              <div className='ml-3'>
                <h3 className='text-sm font-medium text-yellow-800'>Tip</h3>
                <div className='mt-2 text-sm text-yellow-700'>
                  <p>
                    For the best results, provide a specific job description
                    from a real job posting that you're interested in. Our AI
                    will extract relevant keywords and optimize your resume for
                    applicant tracking systems (ATS).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <TextField
            label='Target Job Title'
            name='targetJobTitle'
            value={jobTarget.targetJobTitle}
            onChange={handleChange}
            placeholder='e.g., Software Engineer, Marketing Manager'
            error={errors.targetJobTitle}
            hint='What position are you applying for?'
          />

          <SelectField
            label='Target Industry'
            name='targetIndustry'
            value={jobTarget.targetIndustry}
            onChange={handleChange}
            options={industryOptions}
            error={errors.targetIndustry}
          />

          <SelectField
            label='Company Size'
            name='targetCompanySize'
            value={jobTarget.targetCompanySize}
            onChange={handleChange}
            options={industrySizeOptions}
            error={errors.targetCompanySize}
          />

          <SelectField
            label='Job Level'
            name='targetJobLevel'
            value={jobTarget.targetJobLevel}
            onChange={handleChange}
            options={jobLevelOptions}
            error={errors.targetJobLevel}
          />
        </div>

        <div className='mt-4'>
          <TextArea
            label='Job Description'
            name='jobDescription'
            value={jobTarget.jobDescription}
            onChange={handleChange}
            placeholder='Paste the full job description here for best results...'
            rows={6}
            error={errors.jobDescription}
            hint="Paste a job description from a posting you're interested in for best optimization"
          />
        </div>

        <div className='mt-4'>
          <TextArea
            label='Key Skills to Highlight'
            name='keySkillsToHighlight'
            value={jobTarget.keySkillsToHighlight}
            onChange={handleChange}
            placeholder='List specific skills you want to emphasize (e.g., Python, Project Management, Leadership)'
            rows={3}
            error={errors.keySkillsToHighlight}
            hint='Optional: List skills that match the job requirements you want to emphasize'
          />
        </div>

        <div className='mt-4'>
          <TextArea
            label='Additional Notes'
            name='additionalNotes'
            value={jobTarget.additionalNotes}
            onChange={handleChange}
            placeholder='Any other information you want to share about your job search goals...'
            rows={3}
            error={errors.additionalNotes}
            hint='Optional: Include any additional context that might help with resume optimization'
          />
        </div>
      </form>
    </FormSection>
  );
};

export default JobTargetForm;
