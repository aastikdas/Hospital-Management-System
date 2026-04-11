import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";
import api from "../axios/axios";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await api
        .post(
          "/api/v1/user/patient/register",
          { firstName, lastName, email, phone, nic, dob, gender, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
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
      <div className="container auth-page auth-page--register">
        <section className="auth-visual auth-visual--register">
          <div className="auth-brand">
            <img src="/logo.png" alt="Hospital Management System logo" className="auth-logo" />
            <div>
              <span>Hospital Management System</span>
              <strong>Patient Registration</strong>
            </div>
          </div>

          <div>
            <p className="auth-kicker">Create your account</p>
            <h1>Join the patient portal and keep your hospital details organized.</h1>
            <p>
              Register once to book appointments, manage your profile, and stay connected with the care team.
            </p>
          </div>

          <div className="auth-highlights">
            <div className="auth-highlight">
              <span>Secure setup</span>
              <strong>Enter your details in a clean, easy-to-scan form.</strong>
            </div>
            <div className="auth-highlight">
              <span>Responsive design</span>
              <strong>The page stays balanced on smaller screens and wide displays.</strong>
            </div>
          </div>

          <div className="auth-image-card">
            <img src="/signupheader.png" alt="Patient registration illustration" />
          </div>
        </section>

        <section className="form-component register-form auth-card">
          <h2>Sign Up</h2>
          <p>Please sign up to continue.</p>
          <p className="auth-description">
            Create a patient profile with the essential details needed for appointments and communication.
          </p>
          <form onSubmit={handleRegistration}>
            <div>
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="NIC"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
              <input
                type={"date"}
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div>
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="auth-switch">
              <p>Already registered?</p>
              <Link to={"/login"}>Login now</Link>
            </div>
            <div className="auth-actions">
              <button type="submit">Register</button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Register;