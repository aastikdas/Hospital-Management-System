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
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";

  return (
    <>
      <div className="mx-auto mt-8 grid w-full max-w-7xl grid-cols-1 gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <section className="flex flex-col justify-between gap-6 rounded-xl border border-slate-200 bg-slate-50 p-6 text-slate-900 shadow-sm transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-900 dark:text-white sm:p-8">
          <div className="inline-flex w-fit items-center gap-3 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <img src="/logo.png" alt="Hospital Management System logo" className="h-12 w-12 rounded-lg border border-slate-200 bg-white p-1.5" />
            <div>
              <span className="block text-xs uppercase tracking-wider text-slate-500 dark:text-slate-400">Hospital Management System</span>
              <strong className="block text-lg font-semibold text-slate-900 dark:text-white">Patient Registration</strong>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Create your account</p>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white">Join the patient portal and keep your hospital details organized.</h1>
            <p className="text-sm leading-6 text-slate-600 dark:text-neutral-300">
              Register once to book appointments, manage your profile, and stay connected with the care team.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
              <span className="block text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">Secure setup</span>
              <strong className="mt-1 block text-sm font-normal text-slate-700 dark:text-slate-200">Enter your details in a clean, easy-to-scan form.</strong>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
              <span className="block text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">Responsive design</span>
              <strong className="mt-1 block text-sm font-normal text-slate-700 dark:text-slate-200">The page stays balanced on smaller screens and wide displays.</strong>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <img src="/signupheader.png" alt="Patient registration illustration" className="mx-auto w-full max-w-sm" />
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Sign Up</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-neutral-400">Please sign up to continue.</p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-neutral-400">
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
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm dark:bg-neutral-800">
              <p className="text-slate-600 dark:text-neutral-400">Already registered?</p>
              <Link className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" to={"/login"}>Login now</Link>
            </div>
            <div className="flex justify-center pt-2">
              <button
                className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
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