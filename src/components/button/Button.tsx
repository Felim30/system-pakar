import { IonSpinner } from "@ionic/react";
import { ReactNode } from "react";

type ButtonProps =  {
    text: string | ReactNode;
    variant: "primary" | "foreground";
    disable?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>
  
  export const Button: React.FC<ButtonProps> = ({ text, disable ,variant ,...props}) => {
    return (
      <button
        className={` ${variant == "primary" ? "text-foreground" : "text-primary"} !py-4 w-1/2 !px-6 drop-shadow-lg !rounded-full ${variant == "primary" ? 'bg-primary' : 'bg-foreground'}`}
        {...props}
        disabled={disable}
      >
        {disable ?(
          <div className="flex gap-2 items-center justify-center">
            <IonSpinner className="text-foreground "/>
            <span>Loading ...</span>
          </div>
      ) : text}
      </button>
    );
  };
  