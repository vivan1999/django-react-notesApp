import { Navigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { useEffect, useState } from "react"
import LoadingSpinner from "./LoadingSpinner"

function ProtectedRoutes({ children }) {

    const [isAuthorized, setIsAuthorized] = useState(null)

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false))
    }, [])

    const refresh = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN)
        if (!refreshToken) {
            setIsAuthorized(false)
            return
        }
        try {
            const result = await api.post("/api/token/refresh", { refresh: refreshToken });
            if (result.status == 200) {
                localStorage.setItem(ACCESS_TOKEN, result.data.access)
                setIsAuthorized(true)
            } else {
                setIsAuthorized(false)
            }
        } catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }

    }
    const auth = async () => {
        const authToken = localStorage.getItem(ACCESS_TOKEN)
        console.log("auth token in protected route", authToken)
        if (!authToken) {
            setIsAuthorized(false)
            return
        }
        const decodedToken = jwtDecode(authToken)
        const expiryTime = decodedToken.exp
        const currentTime = Date.now() / 1000
        if (expiryTime < currentTime) {
            await refresh();
        } else {
            setIsAuthorized(true);
        }
    }

    if (isAuthorized == null) {
        return <LoadingSpinner />
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoutes;