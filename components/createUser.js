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
        } catch (error) {
            console.error(error);
            alert(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Add new User</h1>

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
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />


            <label htmlFor="phone">phone:</label>
            <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
            />


            <button type="submit">submit</button>
        </form>
    );
};

export default CreateUser;
