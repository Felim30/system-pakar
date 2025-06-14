import apiClient from "@/lib/apiUrl";
import { GET_ALL_PENYAKIT, GET_PENYAKIT_BY_ID } from "@/lib/constant";
import setHeaders from "@/lib/getHeaders"
import logOut from "@/lib/logOut";
import { useCallback } from "react";
import { useHistory } from "react-router";


const usePenyakit = () => {

    const history = useHistory();

    const getAllPenyakit = useCallback(async () => {

        const headers = await setHeaders();

        const response = await apiClient.get(GET_ALL_PENYAKIT, {headers});

        if(response.status == 403){  
            logOut();
            history.push('/');
        } 

        if(response.status !== 200){
            return response.data.message;
        }

        return response.data.penyakit;
    }, [history])

    const getPenyakitById = useCallback(async (id : string) => {
        const headers = await setHeaders();

        const response = await apiClient.get(`${GET_PENYAKIT_BY_ID}/${id}`, {headers});

        if(response.status == 403){  
            logOut();
            history.push('/');
        } 

        if(response.status != 200){
            return response.data.message
        }

        return response.data
    },[history])

    return {
        getAllPenyakit,
        getPenyakitById
    }
}

export default usePenyakit;