import React from 'react';

type RadioProps = {
  label: string,
} & React.InputHTMLAttributes<HTMLInputElement>;

const RadioInput: React.FC<RadioProps> = ({ label, ...props }) => {
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <div className="relative flex items-center">
        <input
          type="radio"
          className="peer sr-only"
          {...props}
        />
        <div className="h-5 w-5 rounded-full border border-primary peer-checked:border-primary peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-primary peer-focus:ring-opacity-50"></div>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary opacity-0 transition-opacity peer-checked:opacity-100"></div>
      </div>
      <span className="text-primary">{label}</span>
    </label>
  );
};

export default RadioInput;