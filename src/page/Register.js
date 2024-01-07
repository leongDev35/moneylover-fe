import { useState } from "react";
import axios from "axios";
import { notification } from "antd";
import { SITE } from "../App";

function SignUpSuccess() {
    return (
        <>
            <section>
                <center>
                    <h1>Success</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </center>
            </section>
        </>
    )
}

function isValidEmail(email) {
    // Sử dụng biểu thức chính quy để kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

export default function Register() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [success, setSuccess] = useState(false);
    const [api, contextHolder] = notification.useNotification();


    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!username || !password1 || !email || !fullName) {
            api.info({
                message: 'Please fill in the information'
            })
        } else if(!isValidEmail(email)) {
            api.info({
                message: 'Email invalid'
            })
        } else {
            if (password1 === password2) {
                const user = { userName: username, password: password1, email : email, fullName: fullName }
                try {
                    const res = await axios.post(`${SITE}/users`, user);
                     console.log(res)
                     if (res.data.message == `User ${username} exists already`) {
                        api.info({
                            message: `User ${username} exists already`
                        })
                    } else if (res.data.message == `Email ${email} exists already`) {
                        api.info({
                            message: `Email ${email} exists already`
                        })
                    } else {
                        setSuccess(true)
                    }
                } catch (e) {
                    console.log('check axios error: ', e, axios.isAxiosError(e))
                    if (axios.isAxiosError(e)) {
                        if (e.response.data) {
                            api.info({
                                message: e.response.data
                            });
                        } else {
                            api.info({
                                message: e.response.data.message
                            });
                        }
                    }
                }
            } else {
                api.info({
                    message: 'Password not match'
                })
            }
        }

    }

    return (

        <>
            {contextHolder}
          

            {success ? (<SignUpSuccess />) : (<div className="container">
                <div className="row justify-content-center align-items-center vh-100 py-5">
                    <div className="col-sm-10 col-md-8 col-lg-7 col-xl-6 col-xxl-5">

                        <div className="card card-body rounded-3 p-4 p-sm-5">
                            <div className="text-center">

                                <h1 className="mb-2">Sign up</h1>
                                <span className="d-block">Already have an account? <a
                                    href="/login">Sign in here</a></span>
                            </div>
                            <form className="mt-4">
                                <div className="mb-3 input-group-lg">
                                    <input type="text" className="form-control" placeholder="Enter username"
                                        onChange={(event) => setUsername(event.target.value)} />
                                </div>
                                <div className="mb-3 input-group-lg">
                                    <input type="text" className="form-control" placeholder="Enter fullName"
                                        onChange={(event) => setFullName(event.target.value)} />
                                </div>
                                <div className="mb-3 input-group-lg">
                                    <input type="email" className="form-control" placeholder="Enter email"
                                        onChange={(event) => setEmail(event.target.value)} />
                                </div>
                                <div className="mb-3 position-relative">
                                    <div className="input-group input-group-lg">
                                        <input className="form-control fakepassword"
                                            type={showPassword ? "text" : "password"} id="psw-input"
                                            placeholder="Enter new password"
                                            onChange={(event) => setPassword1(event.target.value)} />
                                        <span className="input-group-text p-0">
                                            <i className="fakepasswordicon fa-solid fa-eye-slash cursor-pointer p-2 w-40px"
                                                onClick={handleShowPassword} />
                                        </span>
                                    </div>
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
                                <div className="mb-3 input-group-lg">
                                    <input className="form-control" type="password" placeholder="Confirm password"
                                        onChange={(event) => setPassword2(event.target.value)} />
                                </div>
                                <div className="mb-3 text-start">
                                    <input type="checkbox" className="form-check-input" id="keepsingnedCheck" />
                                    <label style={{marginLeft: 5}} className="form-check-label" htmlFor="keepsingnedCheck"> Keep me signed
                                        in</label>
                                </div>
                                <div className="d-grid">
                                    <button type="submit" className="btn btn-lg btn-primary"
                                        onClick={handleSubmit}>Sign me up
                                    </button>
                                </div>
                            </form>

                        </div>

                    </div>
                </div>
            </div>)}
        </>)
}