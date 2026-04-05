import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { useContext } from "react";
import {  useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate()
  const [mode, setmode] = useState("signup");
  const {signUp,login} = useAuth();
  const [error, seterror] = useState(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function onSubmit(data){
    seterror(null)
    let result
    if(mode ==="signup"){
   result=signUp(data.email,data.password)
   }else
   {
    result = login(data.email,data.password)
   }
   if(result.success){
    navigate("/")
   }else{
    seterror(result.error)
   }
   console.log(result);
   
  }
  return (
    <div className="page">
      <div className="container">
        <div className="auth-container">
         
          <h1 className="page-title">
            {mode === "signup" ? "Sign Up" : "Login"}
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
            {error && <div className="error-message">{error}</div>}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-input"
                id="email"
                {...register("email", { required: "Email is required" })}
              />
              {errors.email &&<span className="form-error">{errors.email.message}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-input"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                  maxLength:{
                    value:12,
                    message:"Password must be less then 12 characters"
                  }
                })}
              />
              {errors.password &&<span className="form-error">{errors.password.message}</span>}
            </div>
            <button type="submit" className="btn btn-primary btn-large">
              {mode === "signup" ? "Sign Up" : "Login"}
            </button>
          </form>
          <div className="auth-switch">
            {mode === "signup" ? (
              <p>
                Already have an account?{" "}
                <span onClick={() => setmode("login")} className="auth-link">
                  Login
                </span>
              </p>
            ) : (
              <p>
                Don't have an account?{" "}
                <span onClick={() => setmode("signup")} className="auth-link">
                  SignUp
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
