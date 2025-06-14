import apiClient from "@/lib/apiUrl";
import { GET_ALL_RIWAYAT, KONSULTASI } from "@/lib/constant";
import setHeaders from "@/lib/getHeaders"
import logOut from "@/lib/logOut";
import { useCallback } from "react";
import { useHistory } from "react-router";

const useRiwayat = () => {

    const history = useHistory();

    const callbackedRiwayat =  useCallback(async () => {
        const headers = await setHeaders();

        const response = await apiClient.get(GET_ALL_RIWAYAT, {
            headers
        })

        if(response.status == 403){  
            logOut();
            history.push('/');
        } 

        if(response.status != 200){
            return response.data.message
        }

        return response.data.riwayat
    }, [history])

    const konsultasi = async (gejala : string[]) => {

        const headers = await setHeaders();

        const response = await apiClient.post(KONSULTASI, { gejala }, { headers });

        if(response.status == 403){  
            logOut();
            history.push('/');
        } 

        if(response.status != 201){
            return response.data.message
        }

        return response.data
    }

    return {
        callbackedRiwayat,
        konsultasi
    }
}

export default useRiwayat