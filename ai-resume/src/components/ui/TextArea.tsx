// TextArea.tsx
import React from 'react';

interface TextAreaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'> {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  size?: 'sm' | 'md' | 'lg';
  rows?: number;
  fullWidth?: boolean;
  maxLength?: number;
  showCharCount?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  error,
  hint,
  rows = 4,
  size = 'md',
  fullWidth = true,
  maxLength,
  showCharCount = Boolean(maxLength),
  className = '',
  required = false,
  disabled = false,
  value = '',
  ...rest
}) => {
  // Generate a unique ID for the textarea field
  const id = `textarea-${name}`;

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

  // Character count calculation
  const charCount = typeof value === 'string' ? value.length : 0;

  // Input classes
  const textareaClasses = `
    ${sizeClasses[size]} 
    ${widthClass} 
    ${borderClass} 
    ${disabledClass}
    rounded-md 
    shadow-sm 
    focus:outline-none 
    focus:ring-1 
    transition-colors
    resize-y
    ${className}
  `;

  return (
    <div className={`${widthClass} mb-4`}>
      <div className='flex justify-between'>
        <label
          htmlFor={id}
          className={`block text-sm font-medium mb-1 ${
            error ? 'text-red-600' : 'text-gray-700'
          }`}>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>

        {showCharCount && maxLength && (
          <span
            className={`text-xs ${
              charCount > maxLength ? 'text-red-500' : 'text-gray-500'
            }`}>
            {charCount}/{maxLength}
          </span>
        )}
      </div>

      <textarea
        id={id}
        name={name}
        rows={rows}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        className={textareaClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={
          error ? `${id}-error` : hint ? `${id}-hint` : undefined
        }
        value={value}
        {...rest}
      />

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

export default TextArea;
