import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";
import api from "../axios/axios";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api
        .post(
          "/api/v1/user/login",
          { email, password, confirmPassword, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container auth-page auth-page--login">
        <section className="auth-visual auth-visual--login">
          <div className="auth-brand">
            <img src="/logo.png" alt="Hospital Management System logo" className="auth-logo" />
            <div>
              <span>Hospital Management System</span>
              <strong>Patient Portal</strong>
            </div>
          </div>

          <div>
            <p className="auth-kicker">Welcome back</p>
            <h1>Sign in to manage your care, appointments, and messages.</h1>
            <p>
              Keep everything in one place with a clean dashboard built for quick access on any device.
            </p>
          </div>

          <div className="auth-highlights">
            <div className="auth-highlight">
              <span>Fast access</span>
              <strong>Book visits and check updates without extra steps.</strong>
            </div>
            <div className="auth-highlight">
              <span>Mobile friendly</span>
              <strong>The layout adapts cleanly to phones, tablets, and desktops.</strong>
            </div>
          </div>

          <div className="auth-image-card">
            <img src="/signin.png" alt="Patient login illustration" />
          </div>
        </section>

        <section className="form-component login-form auth-card">
          <h2>Log In</h2>
          <p>Please log in to continue.</p>

          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="auth-switch">
              <p>Not registered yet?</p>
              <Link to={"/register"}>Create an account</Link>
            </div>
            <div className="auth-actions">
              <button type="submit">Login</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;