import { IonPage , IonContent  } from "@ionic/react"
import { ReactNode } from "react"

export const GeneralContainer : React.FC<{children : ReactNode}> = ({children}) => {
    return (
        <IonPage>
            <IonContent fullscreen className="">
                {children}
            </IonContent>
        </IonPage>
    )
}

