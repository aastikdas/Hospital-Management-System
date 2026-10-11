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
      <div className="mx-auto grid min-h-[calc(100vh-3rem)] max-w-7xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden overflow-hidden border-r border-slate-200 bg-slate-50 p-10 text-slate-900 md:flex md:flex-col md:justify-between">
          <div className="relative z-10 flex items-center gap-4">
            <img src="/logo.png" alt="logo" className="h-14 w-14 rounded-lg border border-slate-200 bg-white p-2 shadow-sm" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">MediTrack</p>
              <h2 className="mt-1 text-2xl font-bold text-slate-900">Hospital Admin Console</h2>
            </div>
          </div>

          <div className="relative z-10 max-w-md">
            <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Hospital Administration</p>
            <h3 className="mt-3 text-3xl font-bold leading-tight text-slate-900">
              Hospital management and administrative control.
            </h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Keep appointments, staff records, and patient communication organized in one place with a clear, reliable administrative workspace.
            </p>
          </div>

          <div className="relative z-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm">
              <p className="text-xl font-bold text-slate-900">24/7</p>
              <p className="mt-1 text-xs text-slate-500">Admin access</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm">
              <p className="text-xl font-bold text-slate-900">Fast</p>
              <p className="mt-1 text-xs text-slate-500">Patient flow</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3.5 shadow-sm">
              <p className="text-xl font-bold text-slate-900">Secure</p>
              <p className="mt-1 text-xs text-slate-500">Authorized only</p>
            </div>
          </div>
        </div>

        <div className="relative flex items-center justify-center px-4 py-10 sm:px-10">
          <div className="w-full max-w-md">
            <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
              <div className="flex flex-col items-center gap-4 text-center">
                <img src="/logo.png" alt="logo" className="h-14 w-14 rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm" />

                <div>
                  <h1 className="text-2xl font-bold text-slate-900">
                    Welcome Back
                  </h1>
                  <p className="mt-1 text-sm text-slate-600">
                    Sign in to continue to the MediTrack admin panel
                  </p>
                </div>
              </div>

              <form onSubmit={handleLogin} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email Address</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-1.5">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-1.5">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="block w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-xs placeholder:text-slate-400 hover:border-slate-400 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-2.5 text-center text-sm font-semibold text-white shadow-xs transition hover:bg-blue-700"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;