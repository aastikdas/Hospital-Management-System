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

  const fieldClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400 dark:focus:border-sky-500 dark:focus:ring-sky-950";

  return (
    <>
      <div className="mx-auto mt-10 grid w-full max-w-7xl grid-cols-1 gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <section className="flex flex-col justify-between gap-7 rounded-3xl border border-sky-100 bg-gradient-to-br from-slate-900 via-sky-800 to-cyan-500 p-7 text-white shadow-2xl shadow-sky-200/70 sm:p-10">
          <div className="inline-flex w-fit items-center gap-4 rounded-2xl border border-white/30 bg-white/15 px-4 py-3 backdrop-blur-sm">
            <img src="/logo.png" alt="Hospital Management System logo" className="h-16 w-16 rounded-xl bg-white p-2" />
            <div>
              <span className="block text-xs uppercase tracking-[0.22em] text-white/80">Hospital Management System</span>
              <strong className="block text-xl">Patient Portal</strong>
            </div>
          </div>

          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/80">Welcome back</p>
            <h1 className="mb-4 text-4xl font-extrabold leading-tight">Sign in to manage your care, appointments, and messages.</h1>
            <p className="text-base leading-7 text-white/85">
              Keep everything in one place with a clean dashboard built for quick access on any device.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <span className="block text-xs uppercase tracking-wide text-cyan-100">Fast access</span>
              <strong className="mt-1 block text-sm leading-6">Book visits and check updates without extra steps.</strong>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
              <span className="block text-xs uppercase tracking-wide text-cyan-100">Mobile friendly</span>
              <strong className="mt-1 block text-sm leading-6">The layout adapts cleanly to phones, tablets, and desktops.</strong>
            </div>
          </div>

          <div className="rounded-2xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <img src="/signin.png" alt="Patient login illustration" className="mx-auto w-full max-w-sm" />
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200 bg-white/90 p-7 shadow-xl shadow-slate-200/60 backdrop-blur-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/90 dark:shadow-slate-900/60 sm:p-9">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Log In</h2>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Please log in to continue.</p>

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
            <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-800">
              <p className="text-slate-600 dark:text-slate-400">Not registered yet?</p>
              <Link className="font-semibold text-sky-700 transition hover:text-sky-800 dark:text-sky-400 dark:hover:text-sky-300" to={"/register"}>Create an account</Link>
            </div>
            <div className="flex justify-center pt-1">
              <button
                className="rounded-xl bg-sky-600 px-8 py-3 text-sm font-semibold tracking-wide text-white shadow-md shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-700"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;