import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../../component/ReduxContainer/apiCall";
import "./login.css";

function Login() {
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { email, password });
  };

  return (
    <div className="mainContainerForSignUp">
      <div className="submainContainer">
        <div style={{ flex: 1, marginLeft: 150, marginBottom: "170px" }}>
          <p className="logoText">
            Soci<span className="part">al</span>
          </p>
          <p className="introText">
            Connect with your <span className="part">family and friends</span>
          </p>
        </div>
        <div style={{ flex: 3 }}>
          <p className="createAccountText">Login to your Account</p>

          <input
            type="email"
            className="inputText"
            onChange={(e) => setEmail(e.target.value)}
            name=""
            id="email"
            placeholder="email"
          />
          <input
            type="password"
            className="inputText"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="************"
          />
          <button className="btnForSignUp" onClick={handleClick}>
            Log In
          </button>
          <Link to={"/signup"}>
            <p style={{ textAlign: "start", marginLeft: "30.6%" }}>
              Dont have an account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
