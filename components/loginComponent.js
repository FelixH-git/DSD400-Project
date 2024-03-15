import React, { useState } from "react";
import axios from "axios";







const LoginComponent = () => {
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

    const handleLogout = async (event) => {
        try {
            const response = await axios.get("/api/user/logout");

            alert(response.data.message);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
    <>

        
        <form onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div class="divinput">
            <div class="mb-3">
            <label htmlFor="email" class="form-label">Email Address:</label>
            <input
                
                class="form-control"
                aria-describedby="emailHelp"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            
            </div>
            </div>

            <div class="divinput">
            <label htmlFor="password" class="form-label">Password:</label>
            <input
                
                class="form-control"
                aria-describedby="emailHelp"
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            </div>
            <button type="submit" class="btn btn-primary">login</button>
        </form>

        <form onSubmit={handleLogout}>
            <button type="submit" class="btn btn-primary">Logout</button>
        </form>
    </>
    );
};

export default LoginComponent;
