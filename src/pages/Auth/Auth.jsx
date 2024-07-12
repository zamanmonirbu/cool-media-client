import React, { useState } from "react";
import "./Auth.css";
import Logo from "../../img/logo.png";
import { logIn, signUp } from "../../actions/AuthActions.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const Auth = () => {
  const initialState = {
    firstname: "",
    lastname: "",
    username: "",
    password: "",
    confirmpass: "",
  };

  const { loading, error } = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSignUp, setIsSignUp] = useState(false);
  const [data, setData] = useState(initialState);
  const [confirmPass, setConfirmPass] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const resetForm = () => {
    setData(initialState);
    setConfirmPass(confirmPass);
    setErrorMessage("");
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    setConfirmPass(true);
    e.preventDefault();
    if (isSignUp) {
      if (data.password === data.confirmpass) {
        dispatch(signUp(data, navigate));
      } else {
        setConfirmPass(false);
        setErrorMessage("Passwords do not match.");
      }
    } else {
      dispatch(logIn(data, navigate));
    }
  };


  return (
    <div className="Auth">
      <div className="a-left">
        <img src={Logo} alt="" />
        <div className="Webname">
          <h1> Cool Media</h1>
          <h6>Share your thoughts with us</h6>
        </div>
      </div>

      <div className="a-right">
        <form className="infoForm authForm" onSubmit={handleSubmit}>
          <h3>{isSignUp ? "Register" : "Login"}</h3>
          {isSignUp && (
            <div>
              <input
                required
                type="text"
                placeholder="First Name"
                className="infoInput"
                name="firstname"
                value={data.firstname}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                placeholder="Last Name"
                className="infoInput"
                name="lastname"
                value={data.lastname}
                onChange={handleChange}
              />
            </div>
          )}

          <div>
            <input
              required
              type="text"
              placeholder="Username"
              className="infoInput"
              name="username"
              value={data.username}
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              required
              type="password"
              className="infoInput"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleChange}
            />
            {isSignUp && (
              <input
                required
                type="password"
                className="infoInput"
                name="confirmpass"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            )}
          </div>

          <span
            style={{
              color: "red",
              fontSize: "12px",
              alignSelf: "flex-end",
              marginRight: "5px",
              display: confirmPass ? "none" : "block",
            }}
          >
            {errorMessage}
            
          </span>
          <div>
            <span
              style={{
                fontSize: "12px",
                cursor: "pointer",
                textDecoration: "underline",
              }}
              onClick={() => {
                resetForm();
                setIsSignUp((prev) => !prev);
              }}
            >
              
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign up"}
            </span>
            <button className="button infoButton" type="Submit" disabled={loading}>
              {loading ? <BeatLoader /> : isSignUp ? "SignUp" : "Login"}
            </button>
          </div>

          {!isSignUp&&error && (
            <p style={{ color: "red", textAlign: "right", marginTop: "10px" }}>
              {error} <br />
            </p>
          )}
          {isSignUp&&error?.message && (
            <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
              {error?.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Auth;
