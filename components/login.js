import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const loginDetails = {
                email, 
                password, 
            };

            const response = await axios.post("/api/user/login", loginDetails);

            setEmail("");
            setPassword("");
            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>

            <label htmlFor="email">email:</label>
            <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <label htmlFor="password">password:</label>
            <input
                type="text"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />

            <button type="submit">login</button>
        </form>
    );
};

export default Login;
