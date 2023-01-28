import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../component/ReduxContainer/apiCall";
import {useNavigate} from "react-router-dom"
import "./signup.css";


function Signup() {
  const navigator = useNavigate()
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
   const user = useSelector((state)=>state.user)
   const userDetails=user.user
   console.log(userDetails)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  
  
  const handleClick = (e) => {
    e.preventDefault();
    signup(dispatch, { email, password,username });
  };
  if(userDetails.Status === 'pending'){
        navigator("/verify/email")
  }
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
          <p className="createAccountText">Create New Account</p>
          <input
            type="text"
            className="inputText"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
         
          <input
            type="email"
            className="inputText"
            name=""
            id=""
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
          <input
            type="password"
            className="inputText"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="************"
          />
          <button className="btnForSignUp" onClick={handleClick }>Sign up</button>
          <Link to={"/login"}>
            <p style={{ textAlign: "start", marginLeft: "30.6%" }}>
              Already have a account
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
