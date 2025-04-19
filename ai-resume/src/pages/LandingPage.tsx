// LandingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

// Import our custom components
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import AppLayout from '../components/layout/AppLayout';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleCreateNew = () => {
    navigate('/resume/create');
  };

  const handleImproveExisting = () => {
    navigate('/resume/improve');
  };

  return (
    <AppLayout>
      <div className='w-full max-w-4xl mx-auto px-4 py-12'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            AI-Powered Resume Builder
          </h1>
          <p className='text-xl text-gray-600 max-w-2xl mx-auto'>
            Build a professional resume tailored to your dream job with the help
            of AI. Get personalized suggestions and optimize your resume for
            applicant tracking systems.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-8 mt-12'>
          <Card className='flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow duration-300'>
            <div className='bg-blue-100 p-4 rounded-full mb-4'>
              <svg
                className='w-12 h-12 text-blue-600'
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
            </div>
            <h2 className='text-2xl font-semibold mb-4'>Create New Resume</h2>
            <p className='text-gray-600 mb-8'>
              Start from scratch and build a professional resume tailored to
              your target job. Our AI will help optimize your content to
              highlight your strengths.
            </p>
            <Button
              variant='primary'
              onClick={handleCreateNew}
              className='mt-auto'>
              Get Started
            </Button>
          </Card>

          <Card className='flex flex-col items-center text-center p-8 hover:shadow-lg transition-shadow duration-300'>
            <div className='bg-green-100 p-4 rounded-full mb-4'>
              <svg
                className='w-12 h-12 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12'
                />
              </svg>
            </div>
            <h2 className='text-2xl font-semibold mb-4'>
              Improve Existing Resume
            </h2>
            <p className='text-gray-600 mb-8'>
              Upload your current resume and receive AI-powered suggestions to
              improve content, formatting, and keyword optimization.
            </p>
            <Button
              variant='secondary'
              onClick={handleImproveExisting}
              className='mt-auto'>
              Upload Resume
            </Button>
          </Card>
        </div>

        <div className='mt-16 text-center'>
          <h3 className='text-xl font-semibold mb-4'>
            Why Use Our AI Resume Builder?
          </h3>
          <div className='grid md:grid-cols-3 gap-6 mt-8'>
            <div className='p-4'>
              <div className='bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-6 h-6 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M13 10V3L4 14h7v7l9-11h-7z'
                  />
                </svg>
              </div>
              <h4 className='font-medium mb-2'>ATS-Optimized</h4>
              <p className='text-gray-600 text-sm'>
                Get past automated screening with keyword optimization and
                proper formatting.
              </p>
            </div>
            <div className='p-4'>
              <div className='bg-yellow-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-6 h-6 text-yellow-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
                  />
                </svg>
              </div>
              <h4 className='font-medium mb-2'>Save Time</h4>
              <p className='text-gray-600 text-sm'>
                Create a professional resume in minutes, not hours.
              </p>
            </div>
            <div className='p-4'>
              <div className='bg-red-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-6 h-6 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
                  />
                </svg>
              </div>
              <h4 className='font-medium mb-2'>Tailored Content</h4>
              <p className='text-gray-600 text-sm'>
                Personalized for your target industry and job description.
              </p>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default LandingPage;
