// FileUpload.tsx
import React, { useState, useRef } from 'react';

interface FileUploadProps {
  label: string;
  name: string;
  accept?: string;
  error?: string;
  hint?: string;
  maxSizeInMB?: number;
  fullWidth?: boolean;
  onChange?: (file: File | null) => void;
  onError?: (error: string) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
  label,
  name,
  accept = '.pdf,.doc,.docx',
  error,
  hint,
  maxSizeInMB = 5,
  fullWidth = true,
  onChange,
  onError,
}) => {
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>(error || '');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Generate a unique ID for the file input
  const id = `file-upload-${name}`;

  // Width class
  const widthClass = fullWidth ? 'w-full' : '';

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      setFileName('');
      setErrorMsg('');
      if (onChange) onChange(null);
      return;
    }

    const file = files[0];
    validateFile(file);
  };

  // Validate the file
  const validateFile = (file: File) => {
    // Check file type
    if (
      accept !== '*' &&
      accept
        .split(',')
        .every(
          (type) =>
            !file.name.toLowerCase().endsWith(type.replace('*', '').trim())
        )
    ) {
      const errorMessage = `Invalid file type. Accepted types: ${accept}`;
      setErrorMsg(errorMessage);
      if (onError) onError(errorMessage);
      setFileName('');
      if (onChange) onChange(null);
      return;
    }

    // Check file size
    const fileSizeInMB = file.size / (1024 * 1024);
    if (fileSizeInMB > maxSizeInMB) {
      const errorMessage = `File size exceeds ${maxSizeInMB}MB limit`;
      setErrorMsg(errorMessage);
      if (onError) onError(errorMessage);
      setFileName('');
      if (onChange) onChange(null);
      return;
    }

    // All validations passed
    setErrorMsg('');
    setFileName(file.name);
    if (onChange) onChange(file);
  };

  // Handle drag and drop
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    validateFile(files[0]);
    // Update the file input for form submission
    if (fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      fileInputRef.current.files = dataTransfer.files;
    }
  };

  // Handle clicking the upload area
  const handleAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle removing the file
  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFileName('');
    setErrorMsg('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (onChange) onChange(null);
  };

  return (
    <div className={`${widthClass} mb-4`}>
      <label
        htmlFor={id}
        className={`block text-sm font-medium mb-1 ${
          errorMsg ? 'text-red-600' : 'text-gray-700'
        }`}>
        {label}
      </label>

      <div
        className={`
          border-2 border-dashed rounded-md p-4 cursor-pointer
          ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : errorMsg
              ? 'border-red-300'
              : 'border-gray-300 hover:border-blue-400'
          }
          transition-colors
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleAreaClick}>
        <input
          id={id}
          ref={fileInputRef}
          type='file'
          name={name}
          accept={accept}
          onChange={handleFileChange}
          className='hidden'
        />

        <div className='flex flex-col items-center justify-center py-3'>
          {!fileName ? (
            <>
              <svg
                className='w-10 h-10 text-gray-400 mb-3'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12'
                />
              </svg>
              <p className='text-sm text-gray-500 mb-1'>
                Click or drag file to upload
              </p>
              <p className='text-xs text-gray-400'>
                Supported formats: {accept}
              </p>
              {maxSizeInMB && (
                <p className='text-xs text-gray-400'>
                  Max size: {maxSizeInMB}MB
                </p>
              )}
            </>
          ) : (
            <div className='flex items-center'>
              <svg
                className='w-8 h-8 text-green-500 mr-2'
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
              <div className='flex-1'>
                <p className='text-sm font-medium text-gray-700 break-all'>
                  {fileName}
                </p>
              </div>
              <button
                type='button'
                className='ml-2 text-gray-400 hover:text-red-500'
                onClick={handleRemoveFile}>
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
          )}
        </div>
      </div>

      {errorMsg && (
        <p id={`${id}-error`} className='mt-1 text-sm text-red-600'>
          {errorMsg}
        </p>
      )}

      {!errorMsg && hint && (
        <p id={`${id}-hint`} className='mt-1 text-sm text-gray-500'>
          {hint}
        </p>
      )}
    </div>
  );
};

export default FileUpload;
