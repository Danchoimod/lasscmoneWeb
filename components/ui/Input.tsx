import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  multiline?: boolean;
}

export default function Input({ 
  label, 
  helperText, 
  multiline = false, 
  className = '', 
  ...props 
}: InputProps) {
  const commonStyles = 'w-full border border-zinc-200 rounded-sm p-3 focus:outline-none focus:ring-1 focus:ring-green-700/50 font-medium text-zinc-800 transition-all placeholder:text-zinc-400 bg-zinc-50/30';
  
  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600">
          {label}
        </label>
      )}
      
      {multiline ? (
        <textarea 
          className={`${commonStyles} min-h-[150px] resize-none ${className}`}
          {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input 
          className={`${commonStyles} ${className}`}
          {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      )}
      
      {helperText && (
        <p className="text-[10px] uppercase font-bold text-zinc-400">
          {helperText}
        </p>
      )}
    </div>
  );
}
