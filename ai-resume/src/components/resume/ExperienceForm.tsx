import React, { useState, useEffect } from 'react';
import FormSection from '../layout/FormSection';
import TextField from '../ui/TextField';
import TextArea from '../ui/TextArea';
import Button from '../ui/Button';
import Card from '../ui/Card';

interface Experience {
  id: string;
  company: string;
  jobTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  bullets: string[];
}

interface ExperienceFormProps {
  formData: Record<string, any>;
  onUpdateFormData: (data: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({
  formData,
  onUpdateFormData,
  onNext,
}) => {
  const [experienceList, setExperienceList] = useState<Experience[]>(
    formData.experience || [
      {
        id: Date.now().toString(),
        company: '',
        jobTitle: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: '',
        bullets: [''],
      },
    ]
  );

  const [errors, setErrors] = useState<Record<string, Record<string, string>>>(
    {}
  );
  const [expandedId, setExpandedId] = useState<string | null>(
    experienceList[0]?.id || null
  );

  // Update parent form data when local state changes
  useEffect(() => {
    onUpdateFormData({ experience: experienceList });
  }, [experienceList, onUpdateFormData]);

  // Generate a new empty experience entry
  const createNewExperience = (): Experience => ({
    id: Date.now().toString(),
    company: '',
    jobTitle: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    bullets: [''],
  });

  // Add a new experience entry
  const handleAddExperience = () => {
    const newExperience = createNewExperience();
    setExperienceList([...experienceList, newExperience]);
    setExpandedId(newExperience.id);
  };

  // Remove an experience entry
  const handleRemoveExperience = (id: string) => {
    setExperienceList(experienceList.filter((exp) => exp.id !== id));

    // Clear errors for this experience
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);

    // If the expanded one was removed, expand the first one
    if (expandedId === id && experienceList.length > 1) {
      const remainingIds = experienceList
        .filter((exp) => exp.id !== id)
        .map((exp) => exp.id);
      setExpandedId(remainingIds[0]);
    }
  };

  // Toggle expanded/collapsed state
  const toggleExpanded = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Handle changes to experience fields
  const handleExperienceChange = (
    id: string,
    field: keyof Experience,
    value: string | boolean | string[]
  ) => {
    setExperienceList(
      experienceList.map((exp) => {
        if (exp.id === id) {
          // Special handling for "current" checkbox
          if (field === 'current' && value === true) {
            return { ...exp, [field]: value, endDate: 'Present' };
          }
          return { ...exp, [field]: value };
        }
        return exp;
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

  // Add a new bullet point to an experience
  const handleAddBullet = (id: string) => {
    setExperienceList(
      experienceList.map((exp) => {
        if (exp.id === id) {
          return {
            ...exp,
            bullets: [...exp.bullets, ''],
          };
        }
        return exp;
      })
    );
  };

  // Remove a bullet point from an experience
  const handleRemoveBullet = (expId: string, bulletIndex: number) => {
    setExperienceList(
      experienceList.map((exp) => {
        if (exp.id === expId) {
          const newBullets = [...exp.bullets];
          newBullets.splice(bulletIndex, 1);
          return {
            ...exp,
            bullets: newBullets.length > 0 ? newBullets : [''],
          };
        }
        return exp;
      })
    );

    // Clear error for this bullet
    if (errors[expId]?.[`bullet-${bulletIndex}`]) {
      setErrors({
        ...errors,
        [expId]: {
          ...errors[expId],
          [`bullet-${bulletIndex}`]: '',
        },
      });
    }
  };

  // Handle changes to a bullet point
  const handleBulletChange = (
    expId: string,
    bulletIndex: number,
    value: string
  ) => {
    setExperienceList(
      experienceList.map((exp) => {
        if (exp.id === expId) {
          const newBullets = [...exp.bullets];
          newBullets[bulletIndex] = value;
          return {
            ...exp,
            bullets: newBullets,
          };
        }
        return exp;
      })
    );

    // Clear error for this bullet
    if (errors[expId]?.[`bullet-${bulletIndex}`]) {
      setErrors({
        ...errors,
        [expId]: {
          ...errors[expId],
          [`bullet-${bulletIndex}`]: '',
        },
      });
    }
  };

  // Validate a single experience entry
  const validateExperience = (
    experience: Experience
  ): Record<string, string> => {
    const expErrors: Record<string, string> = {};

    // Required fields
    if (!experience.company.trim()) {
      expErrors.company = 'Company name is required';
    }

    if (!experience.jobTitle.trim()) {
      expErrors.jobTitle = 'Job title is required';
    }

    if (!experience.startDate.trim()) {
      expErrors.startDate = 'Start date is required';
    }

    if (!experience.endDate.trim() && !experience.current) {
      expErrors.endDate = 'End date is required if not current';
    }

    // Validate at least one bullet point with content
    const hasBulletWithContent = experience.bullets.some(
      (bullet) => bullet.trim() !== ''
    );
    if (!hasBulletWithContent) {
      expErrors['bullet-0'] =
        'At least one bullet point with content is required';
    }

    return expErrors;
  };

  // Validate the entire form
  const validateForm = () => {
    const newErrors: Record<string, Record<string, string>> = {};
    let isValid = true;

    experienceList.forEach((experience) => {
      const expErrors = validateExperience(experience);
      if (Object.keys(expErrors).length > 0) {
        newErrors[experience.id] = expErrors;
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
      // Expand the experience with errors
      const errorId = Object.keys(errors)[0];
      if (errorId) {
        setExpandedId(errorId);
      }
    }
  };

  return (
    <FormSection
      title='Work Experience'
      description='Add your work experience, with the most recent first.'
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
            d='M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
          />
        </svg>
      }>
      <form onSubmit={handleSubmit}>
        <div className='space-y-4'>
          {experienceList.map((experience, index) => (
            <Card key={experience.id} className='border-l-4 border-l-green-500'>
              <div
                className='px-4 py-3 flex justify-between items-center cursor-pointer'
                onClick={() => toggleExpanded(experience.id)}>
                <div>
                  <h3 className='font-medium'>
                    {experience.jobTitle || `Experience #${index + 1}`}
                  </h3>
                  {experience.company && (
                    <p className='text-sm text-gray-500'>
                      {experience.company}
                      {experience.location ? `, ${experience.location}` : ''}
                    </p>
                  )}
                </div>
                <div className='flex items-center'>
                  <button
                    type='button'
                    className='text-red-500 hover:text-red-700 mr-3'
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveExperience(experience.id);
                    }}
                    disabled={experienceList.length === 1}>
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
                      expandedId === experience.id ? 'transform rotate-180' : ''
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

              {expandedId === experience.id && (
                <div className='px-4 py-3 border-t border-gray-200'>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <TextField
                      label='Company/Organization'
                      name={`company-${experience.id}`}
                      value={experience.company}
                      onChange={(e) =>
                        handleExperienceChange(
                          experience.id,
                          'company',
                          e.target.value
                        )
                      }
                      placeholder='Google'
                      error={errors[experience.id]?.company}
                      required
                    />

                    <TextField
                      label='Job Title'
                      name={`jobTitle-${experience.id}`}
                      value={experience.jobTitle}
                      onChange={(e) =>
                        handleExperienceChange(
                          experience.id,
                          'jobTitle',
                          e.target.value
                        )
                      }
                      placeholder='Software Engineer'
                      error={errors[experience.id]?.jobTitle}
                      required
                    />

                    <TextField
                      label='Location'
                      name={`location-${experience.id}`}
                      value={experience.location}
                      onChange={(e) =>
                        handleExperienceChange(
                          experience.id,
                          'location',
                          e.target.value
                        )
                      }
                      placeholder='Mountain View, CA'
                      error={errors[experience.id]?.location}
                    />

                    <div className='md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4'>
                      <div className='flex flex-col'>
                        <TextField
                          label='Start Date'
                          name={`startDate-${experience.id}`}
                          type='month'
                          value={experience.startDate}
                          onChange={(e) =>
                            handleExperienceChange(
                              experience.id,
                              'startDate',
                              e.target.value
                            )
                          }
                          error={errors[experience.id]?.startDate}
                          required
                        />
                      </div>

                      <div className='flex flex-col'>
                        <TextField
                          label='End Date'
                          name={`endDate-${experience.id}`}
                          type='month'
                          value={
                            experience.current ? 'Present' : experience.endDate
                          }
                          onChange={(e) =>
                            handleExperienceChange(
                              experience.id,
                              'endDate',
                              e.target.value
                            )
                          }
                          error={errors[experience.id]?.endDate}
                          disabled={experience.current}
                          required={!experience.current}
                        />

                        <div className='mt-2 flex items-center'>
                          <input
                            id={`current-${experience.id}`}
                            name={`current-${experience.id}`}
                            type='checkbox'
                            className='h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                            checked={experience.current}
                            onChange={(e) =>
                              handleExperienceChange(
                                experience.id,
                                'current',
                                e.target.checked
                              )
                            }
                          />
                          <label
                            htmlFor={`current-${experience.id}`}
                            className='ml-2 text-sm text-gray-700'>
                            I currently work here
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className='md:col-span-2'>
                      <TextArea
                        label='Job Description (Optional)'
                        name={`description-${experience.id}`}
                        value={experience.description}
                        onChange={(e) =>
                          handleExperienceChange(
                            experience.id,
                            'description',
                            e.target.value
                          )
                        }
                        placeholder='Briefly describe your role and responsibilities...'
                        rows={3}
                        error={errors[experience.id]?.description}
                      />
                    </div>

                    <div className='md:col-span-2'>
                      <label className='block text-sm font-medium text-gray-700 mb-1'>
                        Key Accomplishments/Responsibilities
                      </label>

                      <div className='space-y-3'>
                        {experience.bullets.map((bullet, bulletIndex) => (
                          <div key={bulletIndex} className='flex items-start'>
                            <div className='mt-2 mr-2 text-gray-400'>•</div>
                            <div className='flex-1'>
                              <TextArea
                                label=''
                                name={`bullet-${experience.id}-${bulletIndex}`}
                                value={bullet}
                                onChange={(e) =>
                                  handleBulletChange(
                                    experience.id,
                                    bulletIndex,
                                    e.target.value
                                  )
                                }
                                placeholder='Use action verbs: Developed, Managed, Increased, etc.'
                                rows={2}
                                error={
                                  errors[experience.id]?.[
                                    `bullet-${bulletIndex}`
                                  ]
                                }
                              />
                            </div>
                            <button
                              type='button'
                              className='mt-2 ml-2 text-red-500 hover:text-red-700'
                              onClick={() =>
                                handleRemoveBullet(experience.id, bulletIndex)
                              }
                              disabled={experience.bullets.length <= 1}>
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
                                  d='M6 18L18 6M6 6l12 12'
                                />
                              </svg>
                            </button>
                          </div>
                        ))}

                        <div className='mt-2'>
                          <Button
                            type='button'
                            variant='outline'
                            size='sm'
                            onClick={() => handleAddBullet(experience.id)}
                            leftIcon={
                              <svg
                                className='w-4 h-4'
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
                            Add Bullet Point
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          ))}

          <div className='mt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={handleAddExperience}
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
              Add Another Experience
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

export default ExperienceForm;
