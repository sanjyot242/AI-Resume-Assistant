import React, { useState, useEffect, ReactElement, useCallback } from 'react';
import Button from '../ui/Button';
import FormStepper from './FormStepper';

interface StepComponentProps {
  formData: Record<string, any>;
  onUpdateFormData: (data: Record<string, any>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}

interface Step {
  id: string;
  label: string;
  component: ReactElement<StepComponentProps>;
  optional?: boolean;
}

interface MultiStepFormProps {
  steps: Step[];
  onComplete: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
  className?: string;
}

const MultiStepForm: React.FC<MultiStepFormProps> = ({
  steps,
  onComplete,
  initialData = {},
  className = '',
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset form data when initialData reference changes (not on every render)
  useEffect(() => {
    setFormData(initialData);
  }, [initialData]); // Only depends on initialData reference

  const currentStep = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  // Use useCallback for functions passed to children to prevent re-creation on every render
  const handleUpdateFormData = useCallback((data: Record<string, any>) => {
    setFormData((prevData) => ({ ...prevData, ...data }));
  }, []); // No dependencies needed since we use functional updates

  const handleNext = useCallback(() => {
    if (isLastStep) {
      handleSubmit();
    } else {
      setCurrentStepIndex((prevIndex) => prevIndex + 1);
      window.scrollTo(0, 0); // Scroll to top for new step
    }
  }, [isLastStep]); // Only depend on isLastStep

  const handleBack = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStepIndex((prevIndex) => prevIndex - 1);
      window.scrollTo(0, 0); // Scroll to top for new step
    }
  }, [isFirstStep]); // Only depend on isFirstStep

  const handleStepClick = useCallback(
    (index: number) => {
      // Only allow navigating to previous steps or next step if current is completed
      if (index < currentStepIndex || index === currentStepIndex + 1) {
        setCurrentStepIndex(index);
        window.scrollTo(0, 0); // Scroll to top for new step
      }
    },
    [currentStepIndex]
  ); // Only depend on currentStepIndex

  // This needs to be outside of useCallback because it needs access to current formData
  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      await onComplete(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  }

  // Clone the current step component with props
  // This happens during render, not in an effect
  const currentStepWithProps = React.cloneElement(currentStep.component, {
    formData,
    onUpdateFormData: handleUpdateFormData,
    onNext: handleNext,
    onBack: handleBack,
    isFirstStep,
    isLastStep,
  });

  return (
    <div className={`${className}`}>
      <FormStepper
        steps={steps.map((step) => ({
          id: step.id,
          label: step.label,
          optional: step.optional,
        }))}
        currentStepIndex={currentStepIndex}
        onStepClick={handleStepClick}
        className='mb-8'
      />

      <div className='mb-8'>{currentStepWithProps}</div>

      <div className='flex justify-between mt-8'>
        <Button
          variant='outline'
          onClick={handleBack}
          disabled={isFirstStep || isSubmitting}>
          Back
        </Button>

        <Button
          variant={isLastStep ? 'primary' : 'secondary'}
          onClick={handleNext}
          isLoading={isSubmitting}>
          {isLastStep ? 'Complete' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default MultiStepForm;
