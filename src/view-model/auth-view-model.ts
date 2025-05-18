import apiClient from "@/lib/apiUrl"
import { FORGET_PASSWORD, LOGIN, REGISTER } from "@/lib/constant"
import initStorage from "@/lib/db"
import { isAxiosError } from "axios"

const useAuth = () => {

    const handleLogin = async (username : string , password : string) => {
        const response = await apiClient.post(LOGIN, {username, password})
        const storage = await initStorage();

        await storage.set("token", response.data.token)

        return response.data.token;
    }

    const handleRegister = async (
        username: string,
        password: string,
        confirmPassword: string
    ): Promise<void> => {
        try {
            await apiClient.post(REGISTER, { username, password, confirmPassword });
            return;

        } catch (err: unknown) {

            if (isAxiosError(err) && err.response) {
                const serverMsg = (err.response.data).message;
                throw new Error(serverMsg ?? 'Terjadi kesalahan saat registrasi.');
            }

            if (err instanceof Error) {
                throw new Error(err.message);
            }

            throw new Error('Unknown error occurred.');
        }
    };



    const handleForgetPassword = async (username : string , password: string , confirmPassword: string) => {
       try {

            await apiClient.post(FORGET_PASSWORD, { username, password, confirmPassword });
            return;

        } catch (err: unknown) {

            if (isAxiosError(err) && err.response) {
                const serverMsg = (err.response.data).message;
                throw new Error(serverMsg ?? 'Terjadi kesalahan saat registrasi.');
            }

            if (err instanceof Error) {
                throw new Error(err.message);
            }

            throw new Error('Unknown error occurred.');
        }
    }

    return {
        handleLogin,
        handleRegister,
        handleForgetPassword
    }

}

export default useAuth