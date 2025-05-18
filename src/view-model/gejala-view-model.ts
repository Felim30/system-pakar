import apiClient from "@/lib/apiUrl"
import { GET_ALL_GEJALA } from "@/lib/constant"
import setHeaders from "@/lib/getHeaders"
import { useCallback } from "react"

const useGejala = () => {

    const callbackedGetGejala = useCallback(async () => {
        const headers = await setHeaders();

        const response = await apiClient.get(GET_ALL_GEJALA, {headers})

         if(response.status !== 200){
            return response.data.message;
        }

        return response.data.gejalaList;
    },[])

    return {
        callbackedGetGejala
    }
}

export default useGejala