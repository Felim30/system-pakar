import { IonIcon } from "@ionic/react"
import { arrowBack } from "ionicons/icons"
import { useHistory } from "react-router"

export const TitleBar : React.FC<{title : string}> = ({title}) => {

    const history = useHistory();

    const handleDashboard = () => {
        history.push('/main/dashboard')
    }
    
    return (
        <div className='font-bold p-8 w-full text-2xl text-center fixed bg-white flex items-center justify-start gap-2'>
            <IonIcon icon={arrowBack} onClick={handleDashboard} className='w-1/5'/>
            <p className='text-2xl text-center text-black w-3/5'>{title}</p>
        </div>
    )
}
