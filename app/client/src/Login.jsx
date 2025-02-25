// filepath: client/src/Login.jsx
import React, { useState } from "react";
import "./Login.css";

const Login = () => {
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = event.target;

        try {
            const response = await fetch(
                `${process.env.REACT_APP_BACKEND_URL}/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email: email.value,
                        password: password.value,
                    }),
                }
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            window.location.reload();
        } catch (error) {
            setError("Login failed. Please check your credentials and try again.");
            console.error("Error:", error);
        }
    };

    return (
        <div className="login">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <span>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" />
                </span>
                <span>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" />
                </span>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;