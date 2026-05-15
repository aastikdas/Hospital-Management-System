import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import api from "../axios/axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await api
        .post(
          "/api/v1/user/login",
          { email, password, confirmPassword, role: "Admin" },
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
    <section className="dashboard-shell min-h-screen px-4 py-6 md:px-6 lg:px-8">
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-[2rem] border border-white/50 bg-white/55 shadow-[0_20px_80px_rgba(15,23,42,0.14)] backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden overflow-hidden bg-gradient-to-br from-sky-700 via-cyan-700 to-teal-700 p-10 text-white md:flex md:flex-col md:justify-between">
          <div className="absolute -left-20 top-6 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-sky-200/10 blur-3xl" />

          <div className="relative z-10 flex items-center gap-4">
            <img src="/logo.png" alt="logo" className="h-16 w-16 rounded-2xl bg-white/95 p-2 shadow-lg" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-sky-100/90">MediTrack</p>
              <h2 className="mt-1 text-2xl font-bold">Hospital Admin Console</h2>
            </div>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-sky-100/80">Calm, clear, reliable</p>
            <h3 className="mt-4 text-4xl font-black leading-tight">
              A softer workspace for busy hospital operations.
            </h3>
            <p className="mt-4 text-base leading-7 text-sky-50/90">
              Keep appointments, staff records, and patient communication organized in one place with a more welcoming admin experience.
            </p>
          </div>

          <div className="relative z-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-md">
              <p className="text-2xl font-bold">24/7</p>
              <p className="mt-1 text-sm text-sky-50/80">Admin access</p>
            </div>
            <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-md">
              <p className="text-2xl font-bold">Fast</p>
              <p className="mt-1 text-sm text-sky-50/80">Patient flow</p>
            </div>
            <div className="rounded-2xl bg-white/12 p-4 backdrop-blur-md">
              <p className="text-2xl font-bold">Secure</p>
              <p className="mt-1 text-sm text-sky-50/80">Admin access only</p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center px-4 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="rounded-[1.75rem] border border-slate-200 bg-white/90 p-8 shadow-[0_18px_50px_rgba(15,23,42,0.14)] backdrop-blur-md sm:p-10">
              <div className="flex flex-col items-center gap-5 text-center">
                <img src="/logo.png" alt="logo" className="h-16 w-16 rounded-2xl bg-sky-50 p-2 shadow-md" />

                <div>
                  <h1 className="text-3xl font-extrabold text-slate-900">
                    Welcome Back
                  </h1>
                  <p className="mt-2 text-sm text-slate-600">
                    Sign in to continue to the MediTrack admin panel
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <label htmlFor="email" className="form-label text-black">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="form-input border border-r-4 rounded-md "
                  />
                </div>

                <div>
                  <label htmlFor="password" className="form-label text-black">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input border border-r-4 rounded-md "
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="form-label text-black">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="form-input border border-r-4 rounded-md "
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-fit p-2 rounded-md text-center bg-blue-300 "
                >
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;