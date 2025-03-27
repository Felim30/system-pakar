import React from 'react';

type RadioProps = {
  label: string,
  variant?: 'primary' | 'foreground'
} & React.InputHTMLAttributes<HTMLInputElement>;

const RadioInput: React.FC<RadioProps> = ({ label, variant="primary" , ...props }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative flex items-center">
        <input
          type="radio"
          className="peer sr-only"
          {...props}
        />
        <div className={`h-5 w-5 rounded-full border border-${variant == 'primary' ? '[#0EB96F]' : 'white'} 
        peer-checked:border-${variant == 'primary' ? '[#0EB96F]' : 'white'} peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-${variant == 'primary' ? '[#0EB96F]' : 'white'} peer-focus:ring-opacity-50`}></div>
        <div className={`pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-${variant == 'primary' ? '[#0EB96F]' : 'white'} opacity-0 transition-opacity peer-checked:opacity-100`}></div>
      </div>
      <span className={`text-${variant == 'primary' ? '[#0EB96F]' : 'white'}`}>{label}</span>
    </label>
  );
};

export default RadioInput;