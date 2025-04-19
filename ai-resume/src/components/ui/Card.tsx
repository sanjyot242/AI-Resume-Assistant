// Card.tsx
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
  bordered?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverable = false,
  bordered = true,
  ...rest
}) => {
  // Base classes always applied
  const baseClasses = 'bg-white rounded-lg overflow-hidden';

  // Border class
  const borderClass = bordered ? 'border border-gray-200' : '';

  // Shadow class - default to a light shadow
  const shadowClass = 'shadow-sm';

  // Hover effect class
  const hoverClass = hoverable
    ? 'transition-shadow duration-300 hover:shadow-md'
    : '';

  // Interactive class (if onClick is provided)
  const interactiveClass = onClick ? 'cursor-pointer' : '';

  // Combine all classes
  const classes = `${baseClasses} ${borderClass} ${shadowClass} ${hoverClass} ${interactiveClass} ${className}`;

  return (
    <div className={classes} onClick={onClick} {...rest}>
      {children}
    </div>
  );
};

export default Card;
