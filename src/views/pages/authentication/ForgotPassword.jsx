import React, { useState } from "react";
import { loginBack, ForgotIcon } from "helper/constant";
import { useDispatch, useSelector } from "react-redux";
import authActions from "redux/auth/actions";
import constants from "redux/auth/constants";
import { Spinner } from "reactstrap";

const ForgotPassword = () => {
  const loginContainer = {
    backgroundImage: `url(${loginBack})`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    position: "fixed",
    overflow: "auto",
    top: 0,
    bottom: 0,
  };
  const dispatch = useDispatch();
  const networkCalls = useSelector((store) => store.NetworkCall.NETWORK_CALLS);
  const [email, setEmail] = useState("");
  const [otpData, setOtpData] = useState({ otp: "", otpClicked: false });
  const handleSubmit = (e) => {
    e.preventDefault();
    setOtpData({ ...otpData, otpClicked: !otpData.otpClicked });
    if (email && otpData.otp === "") {
      dispatch(authActions.forgetPassword({ email: email }));
    }
    if (email && otpData.otp !== "" && otpData.otp.length > 2) {
      localStorage.setItem("isOtpSent", true);
      dispatch(authActions.matchOtp({ email: email, otp: otpData.otp }));
    }
  };
  return (
    <div className="container-fluid" style={loginContainer}>
      {[constants.MATCH_OTP].some((i) => networkCalls.includes(i)) ? (
        <div className="d-flex justify-content-center align-items-center vh-100">
          <Spinner color="primary" />
        </div>
      ) : (
        <div className="form-container">
          <div className="login-icon">
            <img src={ForgotIcon} alt="icon" height="100px" />
          </div>
          <div className="login-title">Forgot Password ?</div>
          <div className="text-center form-info-text plr-24 mt-16">
            Provide your e-mail address to reset your password
          </div>
          <form className="pa-24" onSubmit={(e) => handleSubmit(e)}>
            <div className="form-group">
              <input
                type="email"
                className="form-control react-form-input"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={otpData.otpClicked}
              />
            </div>

            {otpData.otpClicked && email && (
              <div className="form-group">
                <input
                  className="form-control react-form-input"
                  id="otp"
                  aria-describedby="otp"
                  placeholder="Enter OTP"
                  value={otpData.otp}
                  onChange={(e) =>
                    setOtpData({ ...otpData, otp: e.target.value })
                  }
                />
              </div>
            )}
            <button
              type="submit"
              className="btn form-button"
              disabled={
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
              }
            >
              {otpData.otpClicked && email ? "Verify" : "Get OTP"}
            </button>
            {otpData.otpClicked && email && (
              <div
                className="text-center link-label"
                onClick={() =>
                  setOtpData({
                    ...otpData,
                    otpClicked: !otpData.otpClicked,
                    otp: "",
                  })
                }
              >
                Change email ?
              </div>
            )}
          </form>
        </div>
      )}
    </div>
  );
};

export default ForgotPassword;
