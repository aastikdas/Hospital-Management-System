import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsSun, BsMoon } from "react-icons/bs";
import { toast } from "react-toastify";
import { Context } from "../main";
import api from "../axios/axios";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated, toggleTheme, isDark } = useContext(Context);
  const location = useLocation();
  const currentPath = location.pathname;

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

  const getLinkClass = (path, extra = "") => {
    const isActive =
      path === "/login"
        ? currentPath === "/login" || currentPath === "/register"
        : currentPath === path;

    if (isActive) {
      return `rounded-lg px-3.5 py-2 text-sm font-semibold bg-blue-50 text-blue-600 border border-blue-200/90 shadow-xs dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/60 transition md:text-[15px] ${extra}`;
    }
    return `rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 border border-transparent transition hover:bg-slate-100 hover:text-slate-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white md:text-[15px] ${extra}`;
  };

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-950">
        <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-8 lg:px-12">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/logo.png" alt="logo" className="h-10 w-10 rounded-lg border border-slate-200 bg-white p-1 dark:border-neutral-800 dark:bg-neutral-900 sm:h-11 sm:w-11" />
            <div className="min-w-0">
              <p className="truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500 dark:text-neutral-400 sm:text-xs">MediTrack</p>
              <p className="truncate text-sm font-bold text-slate-900 dark:text-white sm:text-base">Medical Center</p>
            </div>
          </div>

          <div
            className={`absolute left-4 right-4 top-full mt-3 origin-top rounded-xl border border-slate-200 bg-white p-4 shadow-lg transition-all duration-200 dark:border-neutral-800 dark:bg-neutral-900 md:static md:mt-0 md:flex md:w-auto md:items-center md:gap-4 md:border-none md:bg-transparent md:p-0 md:shadow-none ${
              show ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0 md:pointer-events-auto md:scale-100 md:opacity-100"
            }`}
          >
            <div className="flex flex-col gap-1.5 md:flex-row md:items-center md:gap-2">
              <Link
                className={getLinkClass("/")}
                to={"/"}
                onClick={() => setShow(false)}
              >
                Home
              </Link>
              <Link
                className={getLinkClass("/appointment")}
                to={"/appointment"}
                onClick={() => setShow(false)}
              >
                Appointment
              </Link>
              <Link
                className={getLinkClass("/about", "w-full text-center whitespace-nowrap md:w-auto")}
                to={"/about"}
                onClick={() => setShow(false)}
              >
                About Us
              </Link>
            </div>

            <div className="my-3 h-px bg-slate-200 md:hidden dark:bg-neutral-800" />

            <div className="flex items-center">
              {isAuthenticated ? (
                <button
                  className="inline-flex w-full items-center justify-center rounded-lg border border-red-200 bg-red-50/60 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 hover:text-red-700 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400 dark:hover:bg-red-900/50 md:w-auto md:text-[15px]"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              ) : (
                <Link
                  className={
                    currentPath === "/login" || currentPath === "/register"
                      ? getLinkClass("/login", "w-full text-center md:w-auto")
                      : "inline-flex w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50/70 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:border-neutral-700 dark:bg-neutral-900/60 dark:text-neutral-300 dark:hover:bg-neutral-800 md:w-auto md:text-[15px]"
                  }
                  to="/login"
                  onClick={() => setShow(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Toggle dark mode"
              onClick={toggleTheme}
              className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-300 bg-white text-slate-700 transition hover:bg-slate-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-800"
            >
              <div className={`absolute inline-flex items-center justify-center transition-all duration-300 ${isDark ? "scale-0 opacity-0" : "scale-100 opacity-100"}`}>
                <BsSun size={17} />
              </div>
              <div className={`absolute inline-flex items-center justify-center transition-all duration-300 ${isDark ? "scale-100 opacity-100" : "scale-0 opacity-0"}`}>
                <BsMoon size={17} />
              </div>
            </button>

            <button
              type="button"
              aria-label="Toggle menu"
              className="inline-flex rounded-lg border border-slate-300 bg-white p-2 text-slate-700 transition hover:bg-slate-100 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 md:hidden"
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