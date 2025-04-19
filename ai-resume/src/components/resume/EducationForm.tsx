// EducationForm.tsx
import React, { useState, useEffect } from 'react';
import FormSection from '../layout/FormSection';
import TextField from '../ui/TextField';
import SelectField from '../ui/SelectField';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface Education {
  id: string;
  school: string;
  degree: string;
  fieldOfStudy: string;
  startDate: string;
  endDate: string;
  location: string;
  gpa?: string;
  description?: string;
  current: boolean;
}

interface EducationFormProps {
  formData: Record<string, any>;
  onUpdateFormData: (data: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const EducationForm: React.FC<EducationFormProps> = ({
  formData,
  onUpdateFormData,
  onNext,
}) => {
  const [educationList, setEducationList] = useState<Education[]>(
    formData.education || [
      {
        id: Date.now().toString(),
        school: '',
        degree: '',
        fieldOfStudy: '',
        startDate: '',
        endDate: '',
        location: '',
        gpa: '',
        description: '',
        current: false,
      },
    ]
  );

  const [errors, setErrors] = useState<Record<string, Record<string, string>>>(
    {}
  );
  const [expandedId, setExpandedId] = useState<string | null>(
    educationList[0]?.id || null
  );

  // Update parent form data when local state changes
  useEffect(() => {
    onUpdateFormData({ education: educationList });
  }, [educationList, onUpdateFormData]);

  // Generate a new empty education entry
  const createNewEducation = (): Education => ({
    id: Date.now().toString(),
    school: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    location: '',
    gpa: '',
    description: '',
    current: false,
  });

  // Add a new education entry
  const handleAddEducation = () => {
    const newEducation = createNewEducation();
    setEducationList([...educationList, newEducation]);
    setExpandedId(newEducation.id);
  };

  // Remove an education entry
  const handleRemoveEducation = (id: string) => {
    setEducationList(educationList.filter((edu) => edu.id !== id));

    // Clear errors for this education
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);

    // If the expanded one was removed, expand the first one
    if (expandedId === id && educationList.length > 1) {
      const remainingIds = educationList
        .filter((edu) => edu.id !== id)
        .map((edu) => edu.id);
      setExpandedId(remainingIds[0]);
    }
  };

  // Toggle expanded/collapsed state
  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle changes to education fields
  const handleEducationChange = (
    id: string,
    field: keyof Education,
    value: string | boolean
  ) => {
    setEducationList(
      educationList.map((edu) => {
        if (edu.id === id) {
          // Special handling for "current" checkbox
          if (field === 'current' && value === true) {
            return { ...edu, [field]: value, endDate: 'Present' };
          }
          return { ...edu, [field]: value };
        }
        return edu;
      })
    );

    // Clear error for this field
    if (errors[id]?.[field as string]) {
      setErrors({
        ...errors,
        [id]: {
          ...errors[id],
          [field]: '',
        },
      });
    }
  };

  // Validate a single education entry
  const validateEducation = (education: Education): Record<string, string> => {
    const eduErrors: Record<string, string> = {};

    // Required fields
    if (!education.school.trim()) {
      eduErrors.school = 'School name is required';
    }

    if (!education.degree.trim()) {
      eduErrors.degree = 'Degree is required';
    }

    if (!education.fieldOfStudy.trim()) {
      eduErrors.fieldOfStudy = 'Field of study is required';
    }

    if (!education.startDate.trim()) {
      eduErrors.startDate = 'Start date is required';
    }

    if (!education.endDate.trim() && !education.current) {
      eduErrors.endDate = 'End date is required if not current';
    }

    // GPA validation (optional)
    if (education.gpa && !/^[0-9]*\.?[0-9]+$/.test(education.gpa)) {
      eduErrors.gpa = 'GPA must be a valid number';
    }

    return eduErrors;
  };

  // Validate the entire form
  const validateForm = () => {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;

    educationList.forEach((education) => {
      const eduErrors = validateEducation(education);
      if (Object.keys(eduErrors).length > 0) {
        newErrors[education.id] = eduErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onNext();
    } else {
      // Expand the education with errors
      const errorId = Object.keys(errors)[0];
      if (errorId) {
        setExpandedId(errorId);
      }
    }
  };

  // Degree options for select
  const degreeOptions = [
    { value: '', label: 'Select a degree' },
    { value: 'High School Diploma', label: 'High School Diploma' },
    { value: "Associate's Degree", label: "Associate's Degree" },
    { value: "Bachelor's Degree", label: "Bachelor's Degree" },
    { value: "Master's Degree", label: "Master's Degree" },
    { value: 'MBA', label: 'MBA' },
    { value: 'Ph.D.', label: 'Ph.D.' },
    { value: 'M.D.', label: 'M.D.' },
    { value: 'J.D.', label: 'J.D.' },
    { value: 'Certificate', label: 'Certificate' },
    { value: 'Other', label: 'Other' },
  ];

  return (
    <FormSection
      title='Education'
      description='Add your educational background, with the most recent first.'
      icon={
        <svg
          className='w-6 h-6'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
          xmlns='http://www.w3.org/2000/svg'>
          <path d='M12 14l9-5-9-5-9 5 9 5z' />
          <path d='M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z' />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222'
          />
        </svg>
      }>
      <form onSubmit={handleSubmit}>
        <div className='space-y-4'>
          {educationList.map((education, index) => (
            <Card key={education.id} className='border-l-4 border-l-blue-500'>
              <div
                className='px-4 py-3 flex justify-between items-center cursor-pointer'
                onClick={() => toggleExpanded(education.id)}>
                <div>
                  <h3 className='font-medium'>
                    {education.school || `Education #${index + 1}`}
                  </h3>
                  {education.degree && (
                    <p className='text-sm text-gray-500'>
                      {education.degree}
                      {education.fieldOfStudy
                        ? `, ${education.fieldOfStudy}`
                        : ''}
                    </p>
                  )}
                </div>
                <div className='flex items-center'>
                  <button
                    type='button'
                    className='text-red-500 hover:text-red-700 mr-3'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveEducation(education.id);
                    }}
                    disabled={educationList.length === 1}>
                    <svg
                      className='w-5 h-5'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
                      />
                    </svg>
                  </button>
                  <svg
                    className={`w-5 h-5 transition-transform ${
                      expandedId === education.id ? 'transform rotate-180' : ''
                    }`}
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M19 9l-7 7-7-7'
                    />
                  </svg>
                </div>
              </div>

              {expandedId === education.id && (
                <div className='px-4 py-3 border-t border-gray-200'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <TextField
                      label='School/University'
                      name={`school-${education.id}`}
                      value={education.school}
                      onChange={(e) =>
                        handleEducationChange(
                          education.id,
                          'school',
                          e.target.value
                        )
                      }
                      placeholder='Harvard University'
                      error={errors[education.id]?.school}
                      required
                    />

                    <TextField
                      label='Location'
                      name={`location-${education.id}`}
                      value={education.location}
                      onChange={(e) =>
                        handleEducationChange(
                          education.id,
                          'location',
                          e.target.value
                        )
                      }
                      placeholder='Cambridge, MA'
                      error={errors[education.id]?.location}
                    />

                    <SelectField
                      label='Degree'
                      name={`degree-${education.id}`}
                      value={education.degree}
                      onChange={(e) =>
                        handleEducationChange(
                          education.id,
                          'degree',
                          e.target.value
                        )
                      }
                      options={degreeOptions}
                      error={errors[education.id]?.degree}
                      required
                    />

                    <TextField
                      label='Field of Study'
                      name={`fieldOfStudy-${education.id}`}
                      value={education.fieldOfStudy}
                      onChange={(e) =>
                        handleEducationChange(
                          education.id,
                          'fieldOfStudy',
                          e.target.value
                        )
                      }
                      placeholder='Computer Science'
                      error={errors[education.id]?.fieldOfStudy}
                      required
                    />

                    <div className='flex flex-col'>
                      <TextField
                        label='Start Date'
                        name={`startDate-${education.id}`}
                        type='month'
                        value={education.startDate}
                        onChange={(e) =>
                          handleEducationChange(
                            education.id,
                            'startDate',
                            e.target.value
                          )
                        }
                        error={errors[education.id]?.startDate}
                        required
                      />
                    </div>

                    <div className='flex flex-col'>
                      <TextField
                        label='End Date'
                        name={`endDate-${education.id}`}
                        type='month'
                        value={
                          education.current ? 'Present' : education.endDate
                        }
                        onChange={(e) =>
                          handleEducationChange(
                            education.id,
                            'endDate',
                            e.target.value
                          )
                        }
                        error={errors[education.id]?.endDate}
                        disabled={education.current}
                        required={!education.current}
                      />

                      <div className='mt-2 flex items-center'>
                        <input
                          id={`current-${education.id}`}
                          name={`current-${education.id}`}
                          type='checkbox'
                          className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                          checked={education.current}
                          onChange={(e) =>
                            handleEducationChange(
                              education.id,
                              'current',
                              e.target.checked
                            )
                          }
                        />
                        <label
                          htmlFor={`current-${education.id}`}
                          className='ml-2 text-sm text-gray-700'>
                          I am currently studying here
                        </label>
                      </div>
                    </div>

                    <TextField
                      label='GPA'
                      name={`gpa-${education.id}`}
                      value={education.gpa}
                      onChange={(e) =>
                        handleEducationChange(
                          education.id,
                          'gpa',
                          e.target.value
                        )
                      }
                      placeholder='3.8'
                      error={errors[education.id]?.gpa}
                      hint='Optional'
                    />

                    <TextField
                      label='Additional Information'
                      name={`description-${education.id}`}
                      value={education.description}
                      onChange={(e) =>
                        handleEducationChange(
                          education.id,
                          'description',
                          e.target.value
                        )
                      }
                      placeholder='Relevant coursework, honors, awards, etc.'
                      error={errors[education.id]?.description}
                      hint='Optional'
                    />
                  </div>
                </div>
              )}
            </Card>
          ))}

          <div className='mt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={handleAddEducation}
              fullWidth
              leftIcon={
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 6v6m0 0v6m0-6h6m-6 0H6'
                  />
                </svg>
              }>
              Add Another Education
            </Button>
          </div>
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

export default EducationForm;
