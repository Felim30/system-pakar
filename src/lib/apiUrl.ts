import axios from 'axios'
import { MAIN_URL } from './constant';

const apiClient = axios.create({
    baseURL : MAIN_URL
})

export default apiClient;