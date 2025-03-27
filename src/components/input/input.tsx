import { useState } from "react"
import { IonIcon } from '@ionic/react';
import { eyeOff, eyeSharp } from 'ionicons/icons';

type InputProps =  {
    type? : string,
    isPassword?: boolean,
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input : React.FC<InputProps> = ({type , isPassword = false, ...props}) => {
    
    const [isVisible , setIsVisible] = useState<boolean>(false);

    const Toggle = () => {
        setIsVisible((prev) => !prev)
    }

    return (
        <div className="bg-transparent !text-white w-3/5 outline-none border-b-2 border-solid border-b-white border-transparent py-4 flex items-center justify-between">
            <input 
                type={!isVisible && isPassword ? "password" : type} 
                {...props}
                className="outline-none"
            />
           {isPassword && <button onClick={Toggle}>
                <IonIcon icon={isVisible ? eyeOff : eyeSharp} className="text-2xl text-white focus:outline-none" />
            </button>}
        </div>
    )
}

