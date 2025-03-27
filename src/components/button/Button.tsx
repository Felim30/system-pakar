import { IonSpinner } from "@ionic/react";
import { ReactNode } from "react";

type ButtonProps =  {
    text: string | ReactNode;
    variant: "primary" | "foreground";
    disable?: boolean;
    size? : '4/5'
} & React.ButtonHTMLAttributes<HTMLButtonElement>
  
  export const Button: React.FC<ButtonProps> = ({ text, disable ,variant, size ,...props}) => {
    return (
      <button
        className={` ${variant == "primary" ? "text-white" : "text-[#0EB96F]"} !py-4 ${size ? `w-${size}` : 'w-1/2'} !px-6 drop-shadow-lg !rounded-full ${variant == "primary" ? 'bg-[#0EB96F]' : 'bg-white'}`}
        {...props}
        disabled={disable}
      >
        {disable ?(
          <div className="flex gap-2 items-center justify-center">
            <IonSpinner className="text-white "/>
            <span>Loading ...</span>
          </div>
      ) : text}
      </button>
    );
  };
  