import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authActions from 'redux/auth/actions'
import { Lock } from "react-feather";


export default function ResetPassword() {
    const [userCred, setUserCred] = useState({ email: "", curr_pass: "", new_pass: "" })
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        e.preventDefault()
        const { email, curr_pass, new_pass } = userCred
        if (email !== "" && curr_pass !== "" && new_pass !== "") {
            dispatch(authActions.resetPassword(userCred))
        }
    }
    return (
        <div className="container-fluid">
            <div className="row title-sec">
                <div className="col-sm headline">Change Password</div>
            </div>

            <div className="div-container d-flex align-items-center card-box">
                <div className="col-12">
                    <div className="row justify-content-center">
                        <div className="col-md-5 ">
                            <form className="form-with-icons">
                                <div className="form-group">
                                    {/* <Lock className="form-icons" /> */}
                                    <label>
                                        Email <span className="error-msg">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control react-form-input"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Enter email"
                                        value={userCred.email}
                                        onChange={(e) => setUserCred({ ...userCred, email: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <Lock className="form-icons" />
                                    <label>
                                        Current password <span className="error-msg">*</span>
                                    </label>
                                    <input
                                        type="password"

                                        className="form-control react-form-input"
                                        id="pass"
                                        aria-describedby="pass"
                                        placeholder="Enter current password"
                                        value={userCred.curr_pass}
                                        onChange={(e) => setUserCred({ ...userCred, curr_pass: e.target.value })}
                                    />
                                </div>
                                <div className="form-group">
                                    <Lock className="form-icons" />
                                    <label>
                                        Confirm Password <span className="error-msg">*</span>
                                    </label>
                                    <input
                                        type="password"

                                        className="form-control react-form-input"
                                        id="new_pass"
                                        aria-describedby="new_pass"
                                        placeholder="Enter new password"
                                        value={userCred.new_pass}
                                        onChange={(e) => setUserCred({ ...userCred, new_pass: e.target.value })}
                                    />
                                </div>
                                <div className="text-center">
                                    <button className="btn btn-blue w-100" onClick={(e) => handleSubmit(e)}>
                                        CHANGE PASSWORD
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
