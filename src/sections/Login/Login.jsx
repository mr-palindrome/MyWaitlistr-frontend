import React, { useContext, useState, useEffect, useCallback } from 'react';
import AuthContext from "../../context/AuthContext.jsx";
import './Login.modules.css';
import chrome from '/src/assets/icons/chrome.svg';
import email from '../../assets/icons/envelope-solid.svg';
import password from '/src/assets/icons/lock-solid.svg';
import user from '/src/assets/icons/user-solid.svg';
import at from '/src/assets/icons/at-solid.svg';
import axios from "axios";

const BACKEND_API_URL = import.meta.env.VITE_BACKEND_API_URL;
const REACT_APP_GOOGLE_CLIENT_ID = import.meta.env.VITE_REACT_APP_GOOGLE_CLIENT_ID;
const REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT = import.meta.env.VITE_REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT;

const Login = () => {
    const [option, setOption] = useState('Login');
    const [fadeIn, setFadeIn] = useState(false);

    const { loginUser, registerUser } = useContext(AuthContext);

    console.log("BACKEND_API_URL", BACKEND_API_URL);
    console.log("REACT_APP_GOOGLE_CLIENT_ID", REACT_APP_GOOGLE_CLIENT_ID);
    console.log("REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT", REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT);

    const handleSubmit = (e) => {
        e.preventDefault(); // To avoid the page reloading after form submit
        const email = e.target.email.value;
        const password = e.target.password.value;
        const fullName = e.target.full_name?.value || null;
        const userName = e.target.user_name?.value || null;

        if (option === "SignUp") {
            registerUser(email, userName, password, fullName);
        } else {
            loginUser(email, password);
        }
    };

    const openGoogleLoginPage = useCallback(() => {
        const googleAuthUrl = "https://accounts.google.com/o/oauth2/auth";

        const scope = [
            "https://www.googleapis.com/auth/userinfo.email",
            "https://www.googleapis.com/auth/userinfo.profile",
        ].join(" ");

        const params = new URLSearchParams({
            response_type: "code",
            client_id: REACT_APP_GOOGLE_CLIENT_ID,
            redirect_uri: `${REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT}/google`,
            prompt: "select_account",
            access_type: "offline",
            scope,
        });

        const url = `${googleAuthUrl}?${params}`;

        window.location.href = url;
    }, []);

    useEffect(() => {
        setFadeIn(true);
        const timer = setTimeout(() => {
            setFadeIn(false);
        }, 500); // Adjust timeout to match transition duration
        return () => clearTimeout(timer);
    }, [option]);

    return (
        <div className="container loginDiv">
            <div className="container input-container">
                <div className="row mt-3">
                    <div className="col-6 text-center" style={{ width: "15vw" }}>
                        <span className="optionSpan"
                              onClick={() => setOption("Login")}
                        >
                            Login
                        </span>
                        <div className="container-fluid d-flex flex-row align-items-center justify-content-center">
                            <div className={`underline ${option === "Login" ? "underline-active" : "underline-inactive"}`}></div>
                        </div>
                    </div>
                    <div className="col-6 text-center" style={{ width: "15vw" }}>
                        <span className="optionSpan"
                              onClick={() => setOption("SignUp")}
                        >
                            SignUp
                        </span>
                        <div className="container-fluid d-flex flex-row align-items-center justify-content-center">
                            <div className={`underline ${option === "SignUp" ? "underline-active" : "underline-inactive"}`}></div>
                        </div>
                    </div>
                </div>
                <form onSubmit={handleSubmit} className={fadeIn ? 'fade-in' : 'fade-out'}>
                    {option === "SignUp" && (
                        <>
                            <div className="row mt-3 input">
                                <div className="col">
                                    <img src={user} alt="user-icon" />
                                    <input type="text" name="full_name" className="form-control" placeholder="Full Name" />
                                </div>
                            </div>
                            <div className="row mt-3 input">
                                <div className="col">
                                    <img src={at} alt="user-icon" />
                                    <input type="text" name="user_name" className="form-control" placeholder="Username" />
                                </div>
                            </div>
                        </>
                    )}

                    <div className="row mt-3 input">
                        <div className="col">
                            <img src={email} alt="email-icon" />
                            <input type="email" name="email" className="form-control" placeholder="Email" />
                        </div>
                    </div>
                    <div className="row mt-3 input">
                        <div className="col">
                            <img src={password} alt="password-icon" />
                            <input type="password" name="password" className="form-control" placeholder="Password" />
                        </div>
                    </div>
                    <div className="row mt-3">
                        <div className="col">
                            <button className="my-2 submit">Submit</button>
                        </div>
                    </div>
                </form>
            </div>

            <div className="container mt-1">
                <div className="row">
                    <div className="col">
                        <button className="submit gray" style={{width: "150px"}} onClick={openGoogleLoginPage}>
                            <div className="flex items-center justify-center">
                                <svg
                                    className="pe-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 48 48"
                                    width="40px"
                                    height="40px"
                                >
                                    <path
                                        fill="#FFC107"
                                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                    />
                                    <path
                                        fill="#FF3D00"
                                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                    />
                                    <path
                                        fill="#4CAF50"
                                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                    />
                                    <path
                                        fill="#1976D2"
                                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                    />
                                </svg>
                                Google
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;