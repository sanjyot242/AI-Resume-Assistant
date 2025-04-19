// SelectField.tsx
import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectFieldProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  label: string;
  name: string;
  options: Option[];
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  placeholder?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
  label,
  name,
  options,
  error,
  hint,
  size = 'md',
  fullWidth = true,
  placeholder,
  className = '',
  required = false,
  disabled = false,
  ...rest
}) => {
  // Generate a unique ID for the select field
  const id = `select-field-${name}`;

  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  };

  // Width class
  const widthClass = fullWidth ? 'w-full' : '';

  // Error classes
  const borderClass = error
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
    : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500';

  // Disabled classes
  const disabledClass = disabled
    ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
    : '';

  // Select classes
  const selectClasses = `
    ${sizeClasses[size]} 
    ${widthClass} 
    ${borderClass} 
    ${disabledClass}
    rounded-md 
    shadow-sm 
    focus:outline-none 
    focus:ring-1 
    transition-colors
    pr-10
    appearance-none
    bg-no-repeat
    bg-right-4
    ${className}
  `;

  return (
    <div className={`${widthClass} mb-4`}>
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-1 ${
          error ? 'text-red-600' : 'text-gray-700'
        }`}>
        {label}
        {required && <span className='text-red-500 ml-1'>*</span>}
      </label>

      <div className='relative'>
        <select
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          className={selectClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          {...rest}>
          {placeholder && (
            <option value='' disabled>
              {placeholder}
            </option>
          )}

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
          <svg
            className='h-5 w-5 text-gray-400'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 20 20'
            fill='currentColor'
            aria-hidden='true'>
            <path
              fillRule='evenodd'
              d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
              clipRule='evenodd'
            />
          </svg>
        </div>
      </div>

      {error && (
        <p id={`${id}-error`} className='mt-1 text-sm text-red-600'>
          {error}
        </p>
      )}

      {!error && hint && (
        <p id={`${id}-hint`} className='mt-1 text-sm text-gray-500'>
          {hint}
        </p>
      )}
    </div>
  );
};

export default SelectField;
