import { useState } from "react";
import { IonIcon, IonInput } from '@ionic/react';
import { eyeOff, eyeSharp } from 'ionicons/icons';

type InputProps = {
  type?: string;
  isPassword?: boolean;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const Input: React.FC<InputProps> = ({
  isPassword = false,
  value,
  onChange,
  placeholder
}) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(prev => !prev);
  };

  return (
    <div className="bg-transparent text-white w-3/5 border-b-2 border-white py-2 flex items-center justify-between">
      <IonInput
        type={isPassword && !isVisible ? "password" : "text"}
        value={value}
        placeholder={placeholder}
        onIonInput={(e) => onChange(e.detail.value ?? '')}
        className="input-white"
      />
      {isPassword && (
        <button
          type="button"
          onClick={toggleVisibility}
          className="ml-2"
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          <IonIcon icon={isVisible ? eyeOff : eyeSharp} className="text-2xl text-white" />
        </button>
      )}
    </div>
  );
};
