import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        if (username === "durga" && password === "12345") {
            const authToken = JSON.stringify({
                username: "durga",
                password: "12345",
            });

            localStorage.setItem("authToken", authToken);
            navigate("/");
        } else {
            setError("Invalid username or password");
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100"
            style={{
                minHeight: "100vh",
                backgroundSize: "cover",
                backgroundImage:
                    "repeating-linear-gradient(45deg, rgba(33,33,33,0.06) 0px, rgba(33,33,33,0.06) 2px, transparent 2px, transparent 4px), linear-gradient(45deg, rgb(192,148,57), transparent), linear-gradient(90deg, rgb(192,148,57), transparent), linear-gradient(90deg, rgb(255,255,255), rgb(255,255,255))",
            }}
        >
            <form
                onSubmit={handleLogin}
                className="shadow p-5  rounded d-flex flex-column justify-content-center align-items-center"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(463deg, transparent 0px, transparent 1px, rgb(251, 251, 251) 1px, rgb(251, 251, 251) 3px), repeating-linear-gradient(193deg, transparent 0px, transparent 1px, rgb(251, 251, 251) 1px, rgb(251, 251, 251) 3px), linear-gradient(269deg, rgb(222, 222, 222), rgb(222, 222, 222))",
                }}
            >
                <h2 className="text-primary mb-4">Login</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3 w-100">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3 w-100">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mb-3">
                    Login
                </button>
                <div>
                    <h3 className="text-danger">My credintials</h3>
                    <center>username : durga</center>
                    <center>password : 12345</center>
                </div>
            </form>
        </div>
    );
};

export default Login;
