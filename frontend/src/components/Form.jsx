import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import "../styles/button.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            const res = await api.post(route, { username, password });
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            alert(error);
        } finally {
            setLoading(false);
        }
    };

    const goToRegister = () => {
        navigate("/register");
    };

    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit} className="form-container">
                <h1>{name}</h1>
                <div className="input-box">
                    <input
                        className="form-input"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <i className="bx bxs-user"></i>
                </div>
                <div className="input-box">
                    <input
                        className="form-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    <i className="bx bxs-lock-alt"></i>
                </div>

                {loading && <LoadingIndicator />}
                
                <button className="btn form-button" type="submit">
                    {name}
                </button>

                {/* Not registered yet? Register now button */}
                {method === "login" && (
                    <div className="register-link">
                        <p>Not registered yet? Register now:</p><br></br>
                        <button 
                            type="button" 
                            className="btn form-button" 
                            onClick={goToRegister}
                        >
                            Register
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
}

export default Form;
