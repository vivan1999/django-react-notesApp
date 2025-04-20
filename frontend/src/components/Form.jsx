import { useState } from "react"
import api from "../api"
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants"
import { useNavigate } from "react-router-dom"
import "../styles/Form.css"
import LoadingSpinner from "./LoadingSpinner"

function Form({ method, route }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        try {
            const res = await api.post(route, { username, password })
            if (res.status == 200 || res.status == 201) {
                if (method == "login") {
                    console.log(res.data)
                    localStorage.setItem(ACCESS_TOKEN, res.data.access)
                    localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                    navigate("/")
                } else {
                    navigate("/login")
                }
            }
        } catch (e) {
            alert(e)
        } finally {
            setLoading(false)
        }
    }
    const name = method == "login" ? "LOGIN" : "REGISTER";

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input className="form-input" value={username} type="text" placeholder="Enter username" onChange={(e) => setUsername(e.target.value)}></input>
        <input className="form-input" value={password} type="password" placeholder="Enter password" onChange={(e) => setPassword(e.target.value)}></input>
        {loading ? <LoadingSpinner /> : <button className="form-button" type="submit">{name}</button>}
    </form>
}

export default Form