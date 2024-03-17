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
        <div className='Allt'>
        <div class="wrapper">
        <form class="Allt" onSubmit={handleSubmit}>
            <h1>Add new User</h1>

            <label htmlFor="email">email:</label>
            <div class="input_box">
            <input
                placeholder="Email"
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            <i class='bx bxs-envelope'></i>
            </div>
            <label htmlFor="password">password:</label>
            <div class="input_box">
            <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            <i class='bx bxs-user'></i>
            </div>

            <label htmlFor="phone">phone:</label>
            <div class="input_box">
            <input
                type="text"
                id="phone"
                name="phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
            />
            </div>


            <button type="submit" onClick="" class="btn">submit</button>
        </form>
        </div>
        </div>
    );
};

export default CreateUser;
