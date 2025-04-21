import axios from "axios"
import { ACCESS_TOKEN } from "./constants"

const serviceUrl = "/choreo-apis/django-react-notesapp/backend/v1"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ? import.meta.env.VITE_API_URL:serviceUrl
})

api.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)

export default api;