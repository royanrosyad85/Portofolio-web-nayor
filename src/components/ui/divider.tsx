import React from 'react';

interface DividerProps {
  className?: string;
  variant?: 'default' | 'thick' | 'gradient' | 'dashed';
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
}

const Divider: React.FC<DividerProps> = ({ 
  className = '', 
  variant = 'default',
  spacing = 'md'
}) => {
  const spacingClasses = {
    sm: 'my-4',
    md: 'my-6',
    lg: 'my-8',
    xl: 'my-12'
  };

  const variantClasses = {
    default: 'border-t border-border',
    thick: 'border-t-2 border-border',
    gradient: 'h-px bg-gradient-to-r from-transparent via-border to-transparent border-none',
    dashed: 'border-t border-dashed border-border'
  };

  return (
    <hr 
      className={`
        w-full 
        ${spacingClasses[spacing]} 
        ${variantClasses[variant]}
        ${className}
      `} 
    />
  );
};

export default Divider;
