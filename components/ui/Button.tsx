import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed rounded-sm';
  
  const variants = {
    primary: 'bg-green-700 text-white hover:bg-green-800 shadow-sm active:scale-95',
    secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200 border border-zinc-200 shadow-sm active:scale-95',
    outline: 'bg-transparent text-zinc-700 border border-zinc-200 hover:bg-zinc-50 active:scale-95',
    danger: 'text-red-600 hover:bg-red-50'
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-5 py-3 text-sm',
    lg: 'px-8 py-4 text-sm'
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
