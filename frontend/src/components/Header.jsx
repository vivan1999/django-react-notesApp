import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate()

    return <div>
        <button className="form-button" style={{ backgroundColor: "red", color: "white" }} onClick={() => navigate("/logout")}>Logout</button>
    </div>
}

export default Header;