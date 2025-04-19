// PersonalInfoForm.tsx
import React, { useState, useEffect } from 'react';
import FormSection from '../layout/FormSection';
import TextField from '../ui/TextField';
import TextArea from '../ui/TextArea';

interface PersonalInfoFormProps {
  formData: Record<string, any>;
  onUpdateFormData: (data: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({
  formData,
  onUpdateFormData,
  onNext,
}) => {
  const [personalInfo, setPersonalInfo] = useState({
    fullName: formData.fullName || '',
    email: formData.email || '',
    phone: formData.phone || '',
    location: formData.location || '',
    linkedIn: formData.linkedIn || '',
    website: formData.website || '',
    summary: formData.summary || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Update parent form data when local state changes
  useEffect(() => {
    onUpdateFormData(personalInfo);
  }, [personalInfo, onUpdateFormData]);

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({
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

    // Required fields
    if (!personalInfo.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    if (!personalInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(personalInfo.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!personalInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!personalInfo.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (
      personalInfo.linkedIn &&
      !personalInfo.linkedIn.includes('linkedin.com')
    ) {
      newErrors.linkedIn = 'Please enter a valid LinkedIn URL';
    }

    if (personalInfo.website && !personalInfo.website.startsWith('http')) {
      newErrors.website =
        'Please enter a valid website URL including http:// or https://';
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

  return (
    <FormSection
      title='Personal Information'
      description="Let's start with your basic contact information."
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
            d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
          />
        </svg>
      }>
      <form onSubmit={handleSubmit}>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          <TextField
            label='Full Name'
            name='fullName'
            value={personalInfo.fullName}
            onChange={handleChange}
            placeholder='John Doe'
            error={errors.fullName}
            required
          />

          <TextField
            label='Email'
            name='email'
            type='email'
            value={personalInfo.email}
            onChange={handleChange}
            placeholder='johndoe@example.com'
            error={errors.email}
            required
          />

          <TextField
            label='Phone'
            name='phone'
            type='tel'
            value={personalInfo.phone}
            onChange={handleChange}
            placeholder='(123) 456-7890'
            error={errors.phone}
            required
          />

          <TextField
            label='Location'
            name='location'
            value={personalInfo.location}
            onChange={handleChange}
            placeholder='City, State/Province, Country'
            error={errors.location}
            hint="You can be as specific as you'd like (e.g., 'Remote' or 'NYC')"
            required
          />

          <TextField
            label='LinkedIn Profile'
            name='linkedIn'
            value={personalInfo.linkedIn}
            onChange={handleChange}
            placeholder='https://linkedin.com/in/johndoe'
            error={errors.linkedIn}
            hint='Optional, but recommended'
          />

          <TextField
            label='Personal Website'
            name='website'
            value={personalInfo.website}
            onChange={handleChange}
            placeholder='https://johndoe.com'
            error={errors.website}
            hint='Optional'
          />
        </div>

        <div className='mt-4'>
          <TextArea
            label='Professional Summary'
            name='summary'
            value={personalInfo.summary}
            onChange={handleChange}
            placeholder='Briefly describe your professional background, key strengths, and career objectives...'
            rows={5}
            hint='This will appear at the top of your resume. Keep it concise and impactful (2-4 sentences recommended).'
            maxLength={500}
            showCharCount
          />
        </div>

        <div className='mt-6 text-right'>
          <button type='submit' className='hidden'>
            Save and Continue
          </button>
        </div>
      </form>
    </FormSection>
  );
};

export default PersonalInfoForm;
