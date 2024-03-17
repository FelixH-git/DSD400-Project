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
            <div className="Allt">
            <div className="wrapper">
                <form className="Login_form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className="input_box">
                        <input 
                            type="text" 
                            placeholder="Email" 
                            aria-describedby="emailHelp" 
                            id="email"
                            name="email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </div>
                    <div className="input_box">
                        <input 
                            type="password" 
                            placeholder="Password" 
                            aria-describedby="emailHelp"
                            id="password"
                            name="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </div>
                    <div className="remember-forgot">
                        <label><input type="checkbox"/>Remember me</label>
                        <a href="">Forgot password</a>
                    </div>
                    <button type="submit" className="btn" id="login_btn">Login</button>

                    <div className="register_link">
                        <p>Don't have an account?<a href="sign_in.html" target="_self">Register</a></p>
                    </div>
                </form>
            </div>
            </div>
        
    );
};

export default LoginComponent;
