// AppLayout.tsx
import React from 'react';

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <header className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 py-4 flex justify-between items-center'>
          <div className='flex items-center'>
            <svg
              className='w-8 h-8 text-blue-600'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
              />
            </svg>
            <span className='ml-2 text-xl font-bold text-gray-900'>
              ResumeAI
            </span>
          </div>
          <nav>
            <ul className='flex space-x-6'>
              <li>
                <a
                  href='/'
                  className='text-gray-600 hover:text-blue-600 transition-colors'>
                  Home
                </a>
              </li>
              <li>
                <a
                  href='/resume/create'
                  className='text-gray-600 hover:text-blue-600 transition-colors'>
                  Create Resume
                </a>
              </li>
              <li>
                <a
                  href='/help'
                  className='text-gray-600 hover:text-blue-600 transition-colors'>
                  Help
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      <main className='max-w-7xl mx-auto px-4 py-6'>{children}</main>
      <footer className='bg-white border-t border-gray-200 mt-auto'>
        <div className='max-w-7xl mx-auto px-4 py-6'>
          <div className='flex justify-between items-center'>
            <div className='text-sm text-gray-500'>
              &copy; {new Date().getFullYear()} ResumeAI. All rights reserved.
            </div>
            <div className='flex space-x-4'>
              <a
                href='/privacy'
                className='text-sm text-gray-500 hover:text-blue-600 transition-colors'>
                Privacy Policy
              </a>
              <a
                href='/terms'
                className='text-sm text-gray-500 hover:text-blue-600 transition-colors'>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
