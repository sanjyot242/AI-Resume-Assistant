// TextField.tsx
import React from 'react';

interface TextFieldProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  error,
  hint,
  leftIcon,
  rightIcon,
  size = 'md',
  fullWidth = true,
  className = '',
  required = false,
  disabled = false,
  ...rest
}) => {
  // Generate a unique ID for the input field
  const id = `text-field-${name}`;

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

  // Icon padding classes
  const leftPadding = leftIcon ? 'pl-10' : '';
  const rightPadding = rightIcon ? 'pr-10' : '';

  // Input classes
  const inputClasses = `
    ${sizeClasses[size]} 
    ${widthClass} 
    ${borderClass} 
    ${disabledClass} 
    ${leftPadding} 
    ${rightPadding} 
    rounded-md 
    shadow-sm 
    focus:outline-none 
    focus:ring-1 
    transition-colors
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
        {leftIcon && (
          <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500'>
            {leftIcon}
          </div>
        )}

        <input
          id={id}
          name={name}
          disabled={disabled}
          required={required}
          className={inputClasses}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={
            error ? `${id}-error` : hint ? `${id}-hint` : undefined
          }
          {...rest}
        />

        {rightIcon && (
          <div className='absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500'>
            {rightIcon}
          </div>
        )}
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

export default TextField;
