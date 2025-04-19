// FormStepper.tsx
import React from 'react';

interface StepInfo {
  id: string;
  label: string;
  optional?: boolean;
}

interface FormStepperProps {
  steps: StepInfo[];
  currentStepIndex: number;
  onStepClick: (index: number) => void;
  className?: string;
}

const FormStepper: React.FC<FormStepperProps> = ({
  steps,
  currentStepIndex,
  onStepClick,
  className = '',
}) => {
  return (
    <div className={`w-full ${className}`}>
      <div className='hidden sm:block'>
        <nav aria-label='Progress'>
          <ol className='flex items-center'>
            {steps.map((step, index) => {
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;
              const isPending = index > currentStepIndex;

              return (
                <li
                  key={step.id}
                  className={`relative ${
                    index !== steps.length - 1 ? 'flex-1' : ''
                  }`}>
                  {index !== 0 && (
                    <div
                      className={`absolute inset-0 flex items-center`}
                      aria-hidden='true'>
                      <div
                        className={`h-0.5 w-full ${
                          isCompleted ? 'bg-blue-600' : 'bg-gray-200'
                        }`}
                      />
                    </div>
                  )}

                  <div
                    className={`relative flex items-center justify-center`}
                    aria-current={isCurrent ? 'step' : undefined}>
                    <span className='flex items-center' aria-hidden='true'>
                      <span
                        className={`
                          h-8 w-8 flex items-center justify-center rounded-full
                          ${
                            isCompleted
                              ? 'bg-blue-600 hover:bg-blue-700'
                              : isCurrent
                              ? 'bg-blue-600'
                              : 'bg-gray-200'
                          }
                          ${
                            index <= currentStepIndex + 1
                              ? 'cursor-pointer'
                              : 'cursor-not-allowed'
                          }
                          transition-colors duration-200
                        `}
                        onClick={() => onStepClick(index)}>
                        {isCompleted ? (
                          <svg
                            className='h-5 w-5 text-white'
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 20 20'
                            fill='currentColor'
                            aria-hidden='true'>
                            <path
                              fillRule='evenodd'
                              d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                              clipRule='evenodd'
                            />
                          </svg>
                        ) : (
                          <span
                            className={
                              isCurrent ? 'text-white' : 'text-gray-500'
                            }>
                            {index + 1}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className='ml-2 text-sm font-medium'>
                      {step.label}
                      {step.optional && (
                        <span className='text-gray-400 ml-1'>(Optional)</span>
                      )}
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </nav>
      </div>

      {/* Mobile version */}
      <div className='sm:hidden'>
        <div className='flex items-center justify-between mb-4'>
          <span className='text-sm font-medium text-gray-900'>
            Step {currentStepIndex + 1} of {steps.length}
          </span>
          <span className='text-sm font-medium text-blue-600'>
            {steps[currentStepIndex].label}
            {steps[currentStepIndex].optional && (
              <span className='text-gray-400 ml-1'>(Optional)</span>
            )}
          </span>
        </div>
        <div className='overflow-hidden rounded-full bg-gray-200'>
          <div
            className='h-2 rounded-full bg-blue-600'
            style={{
              width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FormStepper;
