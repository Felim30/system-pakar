import { IonLabel, IonSpinner } from "@ionic/react"
const Loading : React.FC = () => {
    return (
        <>
            <IonLabel style={{ color: '#0EB96F' }}>Loading</IonLabel>
            <IonSpinner name="dots" style={{ color: '#0EB96F' }} />
        </>
    ) 
}

export default Loading