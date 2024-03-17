import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Nihad = () => {
    const handleLogin = (event) => {
       
        event.preventDefault();
        console.log("Login clicked");
    };

    return (
        <body className="bodytest">
        <div className="wrapper">
            <form className="Login_form">
                <h1>Login</h1>
                <div className="input_box">
                    <input type="text" placeholder="Username" required/>
                    <i className='bx bxs-user'></i>
                </div>
                <div className="input_box">
                    <input type="password" placeholder="Password" required/>
                    <i className='bx bxs-lock-alt'></i>
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="">Forgot password</a>
                </div>
                <button type="submit" onClick={handleLogin} className="btn" id="login_btn">Login</button>

                <div className="register_link">
                    <p>Don't have an account?<a href="sign_in.html" target="_self">Register</a></p>
                </div>
            </form>
        </div>
        </body>
    );
};

export default Nihad;
