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

  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400 dark:focus:border-emerald-500 dark:focus:ring-emerald-950";

  return (
    <>
      <div className="mx-auto mt-10 grid w-full max-w-7xl grid-cols-1 gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <section className="flex flex-col justify-between gap-7 rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-800 via-teal-700 to-sky-500 p-7 text-white shadow-2xl shadow-emerald-200/70 sm:p-10">
          <div className="inline-flex w-fit items-center gap-4 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 backdrop-blur-sm">
            <img src="/logo.png" alt="Hospital Management System logo" className="h-16 w-16 rounded-xl bg-white p-2" />
            <div>
              <span className="block text-xs uppercase tracking-[0.22em] text-white/80">Hospital Management System</span>
              <strong className="block text-xl">Patient Registration</strong>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Create your account</p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight">Join the patient portal and keep your hospital details organized.</h1>
            <p className="text-base leading-7 text-white/85">
              Register once to book appointments, manage your profile, and stay connected with the care team.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <span className="block text-xs uppercase tracking-wide text-emerald-100">Secure setup</span>
              <strong className="mt-1 block text-sm leading-6">Enter your details in a clean, easy-to-scan form.</strong>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <span className="block text-xs uppercase tracking-wide text-emerald-100">Responsive design</span>
              <strong className="mt-1 block text-sm leading-6">The page stays balanced on smaller screens and wide displays.</strong>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <img src="/signupheader.png" alt="Patient registration illustration" className="mx-auto w-full max-w-sm" />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-xl shadow-slate-200/60 backdrop-blur-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-slate-900/60 sm:p-9">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Sign Up</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Please sign up to continue.</p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
            Create a patient profile with the essential details needed for appointments and communication.
          </p>
          <form onSubmit={handleRegistration} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className={fieldClass}
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className={fieldClass}
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className={fieldClass}
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={fieldClass}
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className={fieldClass}
                type="text"
                placeholder="NIC"
                value={nic}
                onChange={(e) => setNic(e.target.value)}
              />
              <input
                className={fieldClass}
                type={"date"}
                placeholder="Date of Birth"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <select className={fieldClass} value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input
                className={fieldClass}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800">
              <p className="text-slate-600 dark:text-slate-400">Already registered?</p>
              <Link className="font-semibold text-emerald-700 transition hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300" to={"/login"}>Login now</Link>
            </div>
            <div className="flex justify-center pt-1">
              <button
                className="rounded-xl bg-emerald-600 px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                type="submit"
              >
                Register
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Register;