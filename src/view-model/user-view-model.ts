import apiClient from "@/lib/apiUrl"
import { GET_USER, UPDATE_USER } from "@/lib/constant"
import setHeaders from "@/lib/getHeaders"
import logOut from "@/lib/logOut";
import { useCallback } from "react";
import { useHistory } from "react-router";

interface User {
  username: string,
  tinggi: number,
  berat: number,
  jenisKelamin: string
}

const useUser = () => {
  
  const history = useHistory();

  const getUser = useCallback(async () => {
    try {
      const headers = await setHeaders();

      const response = await apiClient.get(GET_USER, { headers: headers });

      if(response.status == 403) {
        logOut();
        history.push('/');
      }
      
      if (response.status !== 200) {
        return response.data.message;
      } else {
        return response.data;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      throw error;
    }
  }, [history]);

  const updateUser = async (user: User, profileFile: File | null) => {
    try {
      const headers = await setHeaders();
      const formData = new FormData();
  
      formData.append(
        "updateUserRequest",
        new Blob([JSON.stringify(user)], { type: "application/json" })
      );
  
      if (profileFile) {
        formData.append("profile", profileFile);
      }
  
      const response = await apiClient.post(UPDATE_USER, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        }
      });

      if(response.status == 403){  
          logOut();
          history.push('/');
      }else if (response.status == 201){
          return response.data;
      }else{
        return response.data.message
      }
    
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };
  

  return {
    getUser,
    updateUser
  };
};

export default useUser;