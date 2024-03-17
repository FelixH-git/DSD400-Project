import React, { useState } from "react";
import axios from "axios";
import bcrypt from 'bcryptjs'
const CreateUser = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");


    const handleSubmit = async (event) => {
        event.preventDefault();
        const salt = await bcrypt.genSalt(10);
        const hashedpass = await bcrypt.hash(password, salt);
        console.log(hashedpass);
        try {
            const user = {
                email, 
                password : hashedpass, 
                phone,
            };

            console.log(user);

            const response = await axios.post("/api/user", user);
            
            setEmail("");
            setPassword("");
            setPhone("");
            alert(response.data.message);
            window.location.assign("/login");
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        <div className="Allt">
        <div className="wrapper">
            <form className="Login_form" onSubmit={handleSubmit}>
                <h1>Register</h1>
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
                <div className="input_box">
                    <input 
                        type="text" 
                        placeholder="Phone Number:" 
                        aria-describedby="emailHelp"
                        id="phone"
                        name="phone"
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)}
                    />
                </div>
                
                <button type="submit" className="btn" id="login_btn">Create Account</button>

                
            </form>
        </div>
        </div>
    );
};

export default CreateUser;
