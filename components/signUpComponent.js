import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';


const Signup = () => {
    const handleLogin = (event) => {
       
        event.preventDefault();
        console.log("Login clicked");
    };

    return (
        <div class="wrapper">
        <form class="sign_in_form">
            <h1>sign in</h1>
            <div class="input_box">
                <input type="text" placeholder="Email" required />
                <i class='bx bxs-envelope'></i>
            </div>
            <div class="input_box">
                <input type="text" placeholder="Phone Number" required />
                <i class='bx bxs-user'></i>
            </div>
            <div class="input_box">
                <input type="password" placeholder="Password" required />
                <i class='bx bxs-lock-alt'></i>
            </div>
            <button type="submit" onclick="" class="btn">Sign in</button>
        </form>
    </div>

    );
};
export default Signup;
