import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSun, BsMoon } from "react-icons/bs";
import { toast } from "react-toastify";
import { Context } from "../main";
import api from "../axios/axios";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated, toggleTheme, isDark } = useContext(Context);

  const handleLogout = async () => {
    await api
      .get("/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate();

  const goToLogin = () => {
    navigateTo("/login");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-sky-100/80 bg-white/75 backdrop-blur-xl transition-colors duration-300 dark:border-sky-900/40 dark:bg-slate-950/75">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-8 lg:px-12 lg:py-4">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-11 w-11 rounded-xl bg-white p-1 shadow-md shadow-sky-100 dark:bg-slate-800 dark:shadow-slate-700 sm:h-12 sm:w-12" />
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400 sm:text-xs">MediTrack</p>
              <p className="truncate text-sm font-bold text-slate-800 dark:text-white sm:text-base">Medical Center</p>
            </div>
          </div>

          <div
            className={`absolute left-4 right-4 top-full mt-3 origin-top rounded-2xl border border-sky-100 bg-white/98 p-4 shadow-xl shadow-slate-200/60 transition-all duration-300 dark:border-sky-900 dark:bg-slate-900/98 dark:shadow-slate-900/60 md:static md:mt-0 md:flex md:w-auto md:items-center md:gap-6 md:border-none md:bg-transparent md:p-0 md:shadow-none ${
              show ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0 md:pointer-events-auto md:scale-100 md:opacity-100"
            }`}
          >
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-5">
              <Link
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700 dark:text-slate-300 dark:hover:bg-sky-950/40 dark:hover:text-sky-300 md:text-[15px]"
                to={"/"}
                onClick={() => setShow(false)}
              >
                Home
              </Link>
              <Link
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700 dark:text-slate-300 dark:hover:bg-sky-950/40 dark:hover:text-sky-300 md:text-[15px]"
                to={"/appointment"}
                onClick={() => setShow(false)}
              >
                Appointment
              </Link>
              <Link
                className="rounded-xl px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-sky-50 hover:text-sky-700 dark:text-slate-300 dark:hover:bg-sky-950/40 dark:hover:text-sky-300 w-full text-center whitespace-nowrap md:w-auto md:text-[15px]"
                to={"/about"}
                onClick={() => setShow(false)}
              >
                About Us
              </Link>
            </div>

            <div className="my-3 h-px bg-slate-200 md:hidden dark:bg-slate-700" />

            {isAuthenticated ? (
              <button
                className="inline-flex w-full items-center justify-center rounded-xl bg-rose-500 px-5 py-2 text-sm font-semibold tracking-wide text-white shadow-md shadow-rose-200 transition hover:-translate-y-0.5 hover:bg-rose-600 dark:shadow-rose-900 md:w-auto"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            ) : (
              <button
                className="inline-flex w-full items-center justify-center rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold tracking-wide text-white shadow-md shadow-sky-200 transition hover:-translate-y-0.5 hover:bg-sky-700 dark:shadow-sky-900 md:w-auto md:px-5"
                onClick={goToLogin}
              >
                LOGIN
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition duration-300 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-amber-400"
            >
              <div className={`absolute inline-flex items-center justify-center transition-all duration-500 ${isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}>
                <BsSun size={18} />
              </div>
              <div className={`absolute inline-flex items-center justify-center transition-all duration-500 ${isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                <BsMoon size={18} />
              </div>
            </button>

            <button
              type="button"
              aria-label="Toggle menu"
              className="inline-flex rounded-xl border border-sky-100 bg-white p-2 text-slate-700 shadow-sm transition dark:border-sky-900/30 dark:bg-slate-800 dark:text-slate-300 md:hidden"
              onClick={() => setShow(!show)}
            >
              <GiHamburgerMenu />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;