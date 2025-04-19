// FormSection.tsx
import React from 'react';
import Card from '../ui/Card';

interface FormSectionProps {
  children: React.ReactNode;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  className?: string;
  titleRight?: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({
  children,
  title,
  description,
  icon,
  className = '',
  titleRight,
}) => {
  return (
    <Card className={`mb-6 ${className}`}>
      <div className='border-b border-gray-200'>
        <div className='px-6 py-4 flex justify-between items-center'>
          <div className='flex items-center'>
            {icon && <div className='mr-3 text-blue-600'>{icon}</div>}
            <div>
              <h3 className='text-lg font-medium text-gray-900'>{title}</h3>
              {description && (
                <p className='mt-1 text-sm text-gray-500'>{description}</p>
              )}
            </div>
          </div>
          {titleRight && <div>{titleRight}</div>}
        </div>
      </div>
      <div className='px-6 py-4'>{children}</div>
    </Card>
  );
};

export default FormSection;
