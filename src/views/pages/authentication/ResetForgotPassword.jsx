import React, { useEffect, useState } from "react";
import { loginBack, ForgotIcon } from "helper/constant";
import { useDispatch } from "react-redux";
import authActions from "redux/auth/actions";
import { push } from "react-router-redux";

const ForgotPassword = () => {
    const loginContainer = {
        backgroundImage: `url(${loginBack})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
        position: "fixed",
        overflow: "auto",
        top: 0,
        bottom: 0
    };
    const dispatch = useDispatch()
    const searchParams = new URLSearchParams(document.location.search)
    const [flag, setflag] = useState('')
    const [pass, setPass] = useState({ pass: "", conf_pass: "" })
    const handleSubmit = (e) => {
        e.preventDefault()
        if ((pass.pass === pass.conf_pass) && searchParams.get("email")) {
            const payload = {
                email: searchParams.get("email"),
                pass: pass.pass,
                conf_pass: pass.conf_pass
            }
            localStorage.setItem('isOtpSent', false)
            dispatch(authActions.resetForgotPassword(payload))
        }
    }
    const isOtpSent = localStorage.getItem('isOtpSent')
    console.log(isOtpSent)
    useEffect(() => {
        if (isOtpSent && isOtpSent === 'false') {
           dispatch(push(`/login`))
        }
    }, [])

    return (
        <div className="container-fluid" style={loginContainer}>
            {
                isOtpSent === 'false' ? "" :
                    <div className="form-container">
                        <div className="login-title">Reset your password</div>

                        <form className="pa-24">
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control react-form-input"
                                    id="exampleInputEmail1"
                                    aria-describedby="emailHelp"
                                    placeholder="Enter email"
                                    value={searchParams.get("email")}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control react-form-input"
                                    id="pass"
                                    aria-describedby="pass"
                                    placeholder="Enter password"
                                    value={pass.pass}
                                    onChange={(e) => setPass({ ...pass, pass: e.target.value })}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    className="form-control react-form-input"
                                    id="conf_pass"
                                    aria-describedby="conf_pass"
                                    placeholder="Confirm password"
                                    value={pass.conf_pass}
                                    onChange={(e) => setPass({ ...pass, conf_pass: e.target.value })}
                                />
                            </div>
                            <button type="submit" className="btn form-button" onClick={(e) => handleSubmit(e)}>
                                Reset
                            </button>
                        </form>
                    </div>
            }
        </div>
    );
};

export default ForgotPassword;
