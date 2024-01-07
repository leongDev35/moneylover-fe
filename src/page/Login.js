import React from 'react'
import { useState } from "react";
import { notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../service/userService";

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const [error, setError] = useState({ status: false, message: '' });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async (event) => {
        event.preventDefault();
        if (!username || !password) {
            api.info({
                message: 'Please fill in the information'
            })
        } else {
            try {
                const user = { username: username, password: password }
                dispatch(login(user)).then((data) => {
                    console.log(data);
                    if (data.payload.message == 'Password is wrong') {
                        api.info({
                            message: 'Password is wrong'
                        })
                    } else if (data.payload.message == `User ${username} is not exist`) {
                        api.info({
                            message: 'User is not exist'
                        })
                    } else {
                        navigate('/home');
                    }
                })
            } catch (e) {
                console.log('check axios error: ', axios.isAxiosError(e))
                if (axios.isAxiosError(e)) {
                    setError({ status: true, message: e.response.data.message });
                    api.info({
                        message: e.response.data.message
                    });
                }
            }
        }
    }
  return (
    <>
            {contextHolder}

     <div className="container">
                <div className="row justify-content-center align-items-center vh-100 py-5">
                    {/* Main content START */}
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">
                        {/* Sign in START */}
                        <div className="card card-body text-center p-4 p-sm-5">
                            {/* Title */}
                            <h1 className="mb-2">Sign in</h1>
                            <p className="mb-0">Don't have an account?<a href="/register"> Click here to sign up</a></p>
                            {/* Form START */}
                            <form className="mt-sm-4">
                                {/* Email */}
                                <div className="mb-3 input-group-lg">
                                    <input type="text" className="form-control" placeholder="Enter username"
                                        onChange={event => setUsername(event.target.value)} />
                                </div>
                                {/* New password */}
                                <div className="mb-3 position-relative">
                                    {/* Password */}
                                    <div className="input-group input-group-lg">
                                        <input className="form-control fakepassword"
                                            type={showPassword ? "text" : "password"} id="psw-input"
                                            placeholder="Enter password"
                                            onChange={event => setPassword(event.target.value)} />
                                        <span className="input-group-text p-0">
                                            <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"
                                                onClick={handleShowPassword} />
                                        </span>
                                    </div>
                                    {/* Pswmeter */}
                                    <div id="pswmeter" className="mt-2" />
                                    <div className="d-flex mt-1">
                                        <div id="pswmeter-message" className="rounded" />
                                        <div className="ms-auto">
                                            <i className="bi bi-info-circle ps-1" data-bs-container="body"
                                                data-bs-toggle="popover" data-bs-placement="top"
                                                data-bs-content="Include at least one uppercase, one lowercase, one special character, one number and 8 characters long."
                                                data-bs-original-title title />
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-3 d-sm-flex justify-content-between">
                                    <div>
                                        <input type="checkbox" className="form-check-input" id="rememberCheck" />
                                        <label style={{marginLeft: 5}} className="form-check-label" htmlFor="rememberCheck">Remember me?</label>
                                    </div>
                                    <a href="/register">Forgot password?</a>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-lg btn-primary"
                                        onClick={handleLogin}>Login
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
    </>
    
  )
}
