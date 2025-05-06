// ResumePreview.tsx
import React, { useState } from 'react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import { ResumeProfile } from '../../types';
import { Skill } from '../../types';

interface ResumePreviewProps {
  formData: Record<string, any>;
  onEdit: (section: string) => void;
  onSave: () => void;
  onRegenerate: () => void;
  isLoading: boolean;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({
  formData,
  onEdit,
  onSave,
  onRegenerate,
  isLoading = false,
}) => {
  const [activeTab, setActiveTab] = useState<'preview' | 'ats' | 'suggestions'>(
    'preview'
  );

  const generatedProfile = formData.generatedResumeProfile as
    | ResumeProfile
    | undefined;

  // Extract data from formData
  // const {
  //   fullName,
  //   email,
  //   phone,
  //   location,
  //   linkedIn,
  //   website,
  //   summary,
  //   education,
  //   experience,
  //   skills,
  //   generatedResume,
  // } = formData;

  const handleExport = (format: 'pdf' | 'docx') => {
    // Placeholder for export functionality
    console.log(`Exporting as ${format}`);
    // Implementation would connect to backend service for file generation
  };

  // Group skills by category
  const skillsByCategory =
    generatedProfile?.skills?.reduce(
      (acc: Record<string, string[]>, skill: any) => {
        if (!acc[skill.category]) {
          acc[skill.category] = [];
        }
        acc[skill.category].push(
          skill.name + (skill.level ? ` (${skill.level})` : '')
        );
        return acc;
      },
      {}
    ) || {};

  return (
    <div className='bg-white rounded-lg shadow-lg overflow-hidden'>
      {/* Loading overlay */}
      {isLoading && (
        <div className='absolute inset-0 bg-gray-100 bg-opacity-75 flex items-center justify-center z-10'>
          <div className='text-center'>
            <svg
              className='animate-spin h-10 w-10 text-blue-600 mx-auto mb-3'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'>
              <circle
                className='opacity-25'
                cx='12'
                cy='12'
                r='10'
                stroke='currentColor'
                strokeWidth='4'></circle>
              <path
                className='opacity-75'
                fill='currentColor'
                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
            </svg>
            <p className='text-lg font-medium text-gray-900'>
              Generating your optimized resume...
            </p>
            <p className='text-sm text-gray-600 mt-1'>
              Our AI is analyzing your information and tailoring it to your
              target job.
            </p>
          </div>
        </div>
      )}

      {/* Resume tabs */}
      <div className='border-b border-gray-200'>
        <nav className='flex -mb-px'>
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'preview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('preview')}>
            Resume Preview
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'ats'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('ats')}>
            ATS Optimization
          </button>
          <button
            className={`py-4 px-6 font-medium text-sm border-b-2 ${
              activeTab === 'suggestions'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setActiveTab('suggestions')}>
            AI Suggestions
          </button>
        </nav>
      </div>

      {/* Tab content */}
      <div className='p-6'>
        {activeTab === 'preview' && (
          <div className='flex flex-col md:flex-row md:space-x-6'>
            {/* Resume preview */}
            <div className='md:w-2/3 mb-6 md:mb-0'>
              <Card className='p-8 h-full overflow-auto shadow-md border-gray-300 max-h-[800px]'>
                {generatedProfile ? (
                  <div>
                    {/* Header section */}
                    <div className='border-b border-gray-300 pb-6 mb-6 text-center'>
                      <h1 className='text-3xl font-bold text-gray-900 mb-2'>
                        {generatedProfile.fullName}
                      </h1>
                      <div className='flex flex-wrap justify-center text-gray-600'>
                        {generatedProfile.email && (
                          <span className='mx-2'>{generatedProfile.email}</span>
                        )}
                        {generatedProfile.phone && (
                          <span className='mx-2'>{generatedProfile.phone}</span>
                        )}
                        {generatedProfile.location && (
                          <span className='mx-2'>
                            {generatedProfile.location}
                          </span>
                        )}
                        {generatedProfile.linkedIn && (
                          <span className='mx-2'>
                            {generatedProfile.linkedIn}
                          </span>
                        )}
                        {generatedProfile.website && (
                          <span className='mx-2'>
                            {generatedProfile.website}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Summary section */}
                    {generatedProfile.summary && (
                      <div className='mb-6'>
                        <h2 className='text-xl font-bold text-gray-800 mb-2 border-b border-gray-200 pb-1'>
                          Professional Summary
                        </h2>
                        <p className='text-gray-700'>
                          {generatedProfile.summary}
                        </p>
                      </div>
                    )}

                    {/* Experience section */}
                    {generatedProfile.experience &&
                      generatedProfile.experience.length > 0 && (
                        <div className='mb-6'>
                          <h2 className='text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1'>
                            Professional Experience
                          </h2>
                          {generatedProfile.experience.map((exp) => (
                            <div key={exp.id} className='mb-4'>
                              <div className='flex justify-between items-start'>
                                <h3 className='text-lg font-semibold text-gray-800'>
                                  {exp.jobTitle}
                                </h3>
                                <span className='text-sm text-gray-600'>
                                  {exp.startDate} -{' '}
                                  {exp.current ? 'Present' : exp.endDate}
                                </span>
                              </div>
                              <div className='flex justify-between items-start'>
                                <p className='text-gray-700 font-medium'>
                                  {exp.company}
                                </p>
                                {exp.location && (
                                  <p className='text-sm text-gray-600'>
                                    {exp.location}
                                  </p>
                                )}
                              </div>
                              {exp.description && (
                                <p className='text-gray-700 mt-1 mb-2'>
                                  {exp.description}
                                </p>
                              )}
                              <ul className='list-disc pl-5 text-gray-700'>
                                {exp.bullets.map(
                                  (bullet, i) =>
                                    bullet.trim() && (
                                      <li key={i} className='mt-1'>
                                        {bullet}
                                      </li>
                                    )
                                )}
                              </ul>
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Education section */}
                    {generatedProfile.education &&
                      generatedProfile.education.length > 0 && (
                        <div className='mb-6'>
                          <h2 className='text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1'>
                            Education
                          </h2>
                          {generatedProfile.education.map((edu) => (
                            <div key={edu.id} className='mb-3'>
                              <div className='flex justify-between items-start'>
                                <h3 className='text-lg font-semibold text-gray-800'>
                                  {edu.school}
                                </h3>
                                <span className='text-sm text-gray-600'>
                                  {edu.startDate} -{' '}
                                  {edu.current ? 'Present' : edu.endDate}
                                </span>
                              </div>
                              <p className='text-gray-700 font-medium'>
                                {edu.degree}
                                {edu.fieldOfStudy
                                  ? `, ${edu.fieldOfStudy}`
                                  : ''}
                                {edu.gpa ? ` | GPA: ${edu.gpa}` : ''}
                              </p>
                              {edu.location && (
                                <p className='text-sm text-gray-600'>
                                  {edu.location}
                                </p>
                              )}
                              {edu.description && (
                                <p className='text-gray-700 mt-1'>
                                  {edu.description}
                                </p>
                              )}
                            </div>
                          ))}
                        </div>
                      )}

                    {/* Skills section */}
                    {generatedProfile.skills &&
                      generatedProfile.skills.length > 0 && (
                        <div>
                          <h2 className='text-xl font-bold text-gray-800 mb-3 border-b border-gray-200 pb-1'>
                            Skills
                          </h2>
                          {(() => {
                            // Group skills by category
                            const skillsByCategory =
                              generatedProfile.skills.reduce((acc, skill) => {
                                if (!acc[skill.category]) {
                                  acc[skill.category] = [];
                                }
                                acc[skill.category].push(skill);
                                return acc;
                              }, {} as Record<string, Skill[]>);

                            return Object.entries(skillsByCategory).map(
                              ([category, skills]) => (
                                <div key={category} className='mb-3'>
                                  <h3 className='text-lg font-semibold text-gray-800'>
                                    {category}
                                  </h3>
                                  <p className='text-gray-700'>
                                    {skills
                                      .map(
                                        (skill) =>
                                          `${skill.name}${
                                            skill.level
                                              ? ` (${skill.level})`
                                              : ''
                                          }`
                                      )
                                      .join(', ')}
                                  </p>
                                </div>
                              )
                            );
                          })()}
                        </div>
                      )}
                  </div>
                ) : (
                  // Fallback if no generated profile is available
                  <div>
                    <h1>Ill have a fall back here </h1>
                    {/* Existing fallback implementation */}
                    {/* This would be your original rendering code using formData */}
                  </div>
                )}
              </Card>
            </div>

            {/* Controls panel */}
            <div className='md:w-1/3'>
              <Card className='p-6'>
                <h3 className='text-lg font-semibold mb-4'>Resume Options</h3>

                <div className='space-y-4'>
                  <Button
                    variant='primary'
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
                          d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                        />
                      </svg>
                    }
                    onClick={() => handleExport('pdf')}>
                    Download as PDF
                  </Button>

                  <Button
                    variant='outline'
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
                          d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4'
                        />
                      </svg>
                    }
                    onClick={() => handleExport('docx')}>
                    Download as Word (DOCX)
                  </Button>

                  <Button
                    variant='outline'
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
                          d='M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
                        />
                      </svg>
                    }
                    onClick={onRegenerate}>
                    Regenerate Resume
                  </Button>
                </div>

                <div className='border-t border-gray-200 mt-6 pt-6'>
                  <h4 className='font-medium mb-3'>Edit Sections</h4>
                  <div className='space-y-2'>
                    <Button
                      variant='outline'
                      size='sm'
                      fullWidth
                      onClick={() => onEdit('personal')}>
                      Personal Information
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      fullWidth
                      onClick={() => onEdit('experience')}>
                      Work Experience
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      fullWidth
                      onClick={() => onEdit('education')}>
                      Education
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      fullWidth
                      onClick={() => onEdit('skills')}>
                      Skills
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      fullWidth
                      onClick={() => onEdit('jobTarget')}>
                      Job Target & Keywords
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}

        {activeTab === 'ats' && (
          <div className='space-y-6'>
            <Card className='p-6'>
              <h3 className='text-xl font-semibold mb-4 flex items-center'>
                <svg
                  className='w-6 h-6 mr-2 text-green-500'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
                ATS Optimization Score
              </h3>

              <div className='bg-gray-100 rounded-full h-6 mb-4'>
                <div
                  className='bg-green-500 h-6 rounded-full text-xs text-white flex items-center justify-center'
                  style={{ width: '85%' }}>
                  85%
                </div>
              </div>

              <p className='text-gray-700 mb-4'>
                Your resume is well-optimized for ATS systems. We've
                incorporated relevant keywords from your target job description.
              </p>

              <h4 className='font-medium mb-2'>Matched Keywords</h4>
              <div className='flex flex-wrap gap-2 mb-4'>
                <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                  JavaScript
                </span>
                <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                  React
                </span>
                <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                  TypeScript
                </span>
                <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                  Frontend Development
                </span>
                <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                  UI/UX
                </span>
                <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                  Agile
                </span>
                <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                  Testing
                </span>
                <span className='bg-green-100 text-green-800 text-xs px-2 py-1 rounded'>
                  Git
                </span>
              </div>

              <h4 className='font-medium mb-2'>Suggested Keywords</h4>
              <div className='flex flex-wrap gap-2'>
                <span className='bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded'>
                  Redux
                </span>
                <span className='bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded'>
                  Webpack
                </span>
                <span className='bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded'>
                  CI/CD
                </span>
              </div>
            </Card>

            <Card className='p-6'>
              <h3 className='text-xl font-semibold mb-4'>
                Resume Format Analysis
              </h3>

              <div className='space-y-4'>
                <div>
                  <h4 className='font-medium flex items-center'>
                    <svg
                      className='w-5 h-5 mr-2 text-green-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    Clear Structure
                  </h4>
                  <p className='text-gray-600 text-sm ml-7'>
                    Your resume has a clean, organized structure that is easy
                    for ATS systems to parse.
                  </p>
                </div>

                <div>
                  <h4 className='font-medium flex items-center'>
                    <svg
                      className='w-5 h-5 mr-2 text-green-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    Standard Headers
                  </h4>
                  <p className='text-gray-600 text-sm ml-7'>
                    You're using standard section headers that ATS systems can
                    recognize.
                  </p>
                </div>

                <div>
                  <h4 className='font-medium flex items-center'>
                    <svg
                      className='w-5 h-5 mr-2 text-green-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M5 13l4 4L19 7'
                      />
                    </svg>
                    Chronological Format
                  </h4>
                  <p className='text-gray-600 text-sm ml-7'>
                    Your experience is listed in reverse chronological order,
                    which is preferred by recruiters and ATS.
                  </p>
                </div>

                <div>
                  <h4 className='font-medium flex items-center'>
                    <svg
                      className='w-5 h-5 mr-2 text-yellow-500'
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                      />
                    </svg>
                    Bullet Point Length
                  </h4>
                  <p className='text-gray-600 text-sm ml-7'>
                    Some of your bullet points are quite long. Consider keeping
                    each to 1-2 lines for better readability.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className='space-y-6'>
            <Card className='p-6'>
              <h3 className='text-xl font-semibold mb-4'>
                AI-Powered Suggestions
              </h3>

              <div className='space-y-5'>
                <div className='border-l-4 border-blue-500 pl-4 py-1'>
                  <h4 className='font-medium text-blue-800'>
                    Strengthen Your Summary
                  </h4>
                  <p className='text-gray-700 text-sm mt-1'>
                    Your summary is good, but could be more impactful by
                    quantifying your achievements and aligning more closely with
                    your target role.
                  </p>
                  <Button variant='outline' size='sm' className='mt-2'>
                    Apply Suggestion
                  </Button>
                </div>

                <div className='border-l-4 border-blue-500 pl-4 py-1'>
                  <h4 className='font-medium text-blue-800'>
                    Add Action Verbs
                  </h4>
                  <p className='text-gray-700 text-sm mt-1'>
                    Consider starting your bullet points with strong action
                    verbs like "Implemented," "Developed," or "Streamlined"
                    instead of using phrases like "Responsible for."
                  </p>
                  <Button variant='outline' size='sm' className='mt-2'>
                    View Suggested Edits
                  </Button>
                </div>

                <div className='border-l-4 border-blue-500 pl-4 py-1'>
                  <h4 className='font-medium text-blue-800'>
                    Quantify Achievements
                  </h4>
                  <p className='text-gray-700 text-sm mt-1'>
                    Add more specific metrics and numbers to demonstrate your
                    impact (e.g., "Increased sales by 20%" instead of "Increased
                    sales").
                  </p>
                  <Button variant='outline' size='sm' className='mt-2'>
                    See Examples
                  </Button>
                </div>

                <div className='border-l-4 border-yellow-500 pl-4 py-1'>
                  <h4 className='font-medium text-yellow-800'>
                    Update Skills Section
                  </h4>
                  <p className='text-gray-700 text-sm mt-1'>
                    Your skills could be better categorized and prioritized
                    based on your target job.
                  </p>
                  <Button variant='outline' size='sm' className='mt-2'>
                    Get Recommendations
                  </Button>
                </div>

                <div className='border-l-4 border-green-500 pl-4 py-1'>
                  <h4 className='font-medium text-green-800'>
                    Cover Letter Opportunity
                  </h4>
                  <p className='text-gray-700 text-sm mt-1'>
                    Based on your target job, we can generate a matching cover
                    letter to complement your resume.
                  </p>
                  <Button
                    variant='outline'
                    size='sm'
                    className='mt-2'
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
                    Create Cover Letter
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;
