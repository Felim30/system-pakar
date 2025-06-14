import apiClient from "@/lib/apiUrl"
import { GET_ALL_GEJALA } from "@/lib/constant"
import setHeaders from "@/lib/getHeaders"
import logOut from "@/lib/logOut"
import { useCallback } from "react"
import { useHistory } from "react-router"

const useGejala = () => {
    const history = useHistory();

    const callbackedGetGejala = useCallback(async () => {
        const headers = await setHeaders();

        const response = await apiClient.get(GET_ALL_GEJALA, {headers})

        if(response.status == 403){  
            logOut();
            history.push('/');
        } 

         if(response.status !== 200){

            return response.data.message;
        }

        return response.data.gejalaList;
    },[history])

    return {
        callbackedGetGejala
    }
}

export default useGejala