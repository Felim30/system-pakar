import apiClient from "@/lib/apiUrl";
import { GET_ALL_RIWAYAT, KONSULTASI } from "@/lib/constant";
import setHeaders from "@/lib/getHeaders"
import { useCallback } from "react";

const useRiwayat = () => {

    const callbackedRiwayat =  useCallback(async () => {
        const headers = await setHeaders();

        const response = await apiClient.get(GET_ALL_RIWAYAT, {
            headers
        })

        if(response.status != 200){
            return response.data.message
        }

        return response.data.riwayat
    }, [])

    const konsultasi = async (gejala : string[]) => {

        const headers = await setHeaders();

        const response = await apiClient.post(KONSULTASI, { gejala }, { headers });

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