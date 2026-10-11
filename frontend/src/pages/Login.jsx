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
  const adminPortalUrl =
    import.meta.env.VITE_DASHBOARD_URL ||
    (import.meta.env.PROD
      ? "https://hospital-management-system-1-dashboard.onrender.com"
      : "http://localhost:5173");

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
              <strong className="block text-lg font-semibold text-slate-900 dark:text-white">Patient Portal</strong>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">Welcome back</p>
            <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white">Choose your portal and sign in with the right access.</h1>
            <p className="text-sm leading-6 text-slate-600 dark:text-neutral-300">
              Patients can log in here to manage care, appointments, and messages. Admins can open the dashboard portal separately.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
              <span className="block text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">Fast access</span>
              <strong className="mt-1 block text-sm font-normal text-slate-700 dark:text-slate-200">Book visits and check updates without extra steps.</strong>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
              <span className="block text-xs font-medium uppercase tracking-wide text-blue-600 dark:text-blue-400">Mobile friendly</span>
              <strong className="mt-1 block text-sm font-normal text-slate-700 dark:text-slate-200">The layout adapts cleanly to phones, tablets, and desktops.</strong>
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <img src="/signin.png" alt="Patient login illustration" className="mx-auto w-full max-w-sm" />
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm dark:border-neutral-700 dark:bg-neutral-800">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Need the admin area?</p>
            <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">Admin Portal</p>
                <p className="text-xs text-slate-500 dark:text-neutral-400">For doctors, staff, and hospital admins.</p>
              </div>
              <a
                href={adminPortalUrl}
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                Go to Admin Login
              </a>
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Log In</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-neutral-400">Please log in as a patient, or use the admin portal if you manage the hospital.</p>

          <div className="mt-6 flex rounded-lg border border-slate-200 bg-slate-100 p-1 dark:border-neutral-800 dark:bg-neutral-800">
            <span className="flex-1 rounded-md bg-white px-4 py-2.5 text-center text-sm font-medium text-slate-900 shadow-sm dark:bg-neutral-900 dark:text-white">
              Patient Login
            </span>
            <a
              href={adminPortalUrl}
              className="ml-1 flex flex-1 items-center justify-center rounded-md px-4 py-2.5 text-center text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
            >
              Admin Portal
            </a>
          </div>

          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <input
              className={fieldClass}
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className={fieldClass}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              className={fieldClass}
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3 text-sm dark:bg-neutral-800">
              <p className="text-slate-600 dark:text-neutral-400">Not registered yet?</p>
              <Link className="font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300" to={"/register"}>Create an account</Link>
            </div>
            <div className="flex justify-center pt-2">
              <button
                className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                type="submit"
              >
                Sign In as Patient
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;