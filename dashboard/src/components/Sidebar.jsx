import React, { useContext, useState } from "react";
import { TiHome } from "react-icons/ti";
import { RiLogoutBoxFill } from "react-icons/ri";
import { AiFillMessage } from "react-icons/ai";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserDoctor } from "react-icons/fa6";
import { MdAddModerator } from "react-icons/md";
import { IoPersonAddSharp } from "react-icons/io5";
import { toast } from "react-toastify";
import { Context } from "../main";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../axios/axios";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const handleLogout = async () => {
    await api
      .get("/api/v1/user/admin/logout", {
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

  const gotoHomePage = () => {
    navigateTo("/");
    setShow(!show);
  };
  const gotoDoctorsPage = () => {
    navigateTo("/doctors");
    setShow(!show);
  };
  const gotoMessagesPage = () => {
    navigateTo("/messages");
    setShow(!show);
  };
  const gotoAddNewDoctor = () => {
    navigateTo("/doctor/addnew");
    setShow(!show);
  };
  const gotoAddNewAdmin = () => {
    navigateTo("/admin/addnew");
    setShow(!show);
  };

  const getNavBtnClass = (path) => {
    const isActive = currentPath === path;
    if (isActive) {
      return "flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-xl text-white shadow-sm ring-2 ring-blue-400/30 transition md:h-12 md:w-12";
    }
    return "flex h-11 w-11 items-center justify-center rounded-lg bg-slate-800 text-xl text-slate-300 transition hover:bg-slate-700 hover:text-white md:h-12 md:w-12";
  };

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className="dashboard-sidebar-bg fixed left-0 top-0 z-40 flex h-screen w-20 flex-col items-center justify-between border-r border-slate-800 px-3 py-6 shadow-sm transition-all duration-200 md:w-28"
      >
        <div className="flex flex-col items-center gap-6">
          <img src="/logo.png" alt="logo" className="h-11 w-11 rounded-lg bg-white p-1.5 shadow-sm" />
          
          <div className="flex flex-col items-center gap-4">
            <button
              onClick={gotoHomePage}
              className={getNavBtnClass("/")}
              title="Dashboard"
            >
              <TiHome />
            </button>
            
            <button
              onClick={gotoDoctorsPage}
              className={getNavBtnClass("/doctors")}
              title="Doctors"
            >
              <FaUserDoctor />
            </button>
            
            <button
              onClick={gotoAddNewAdmin}
              className={getNavBtnClass("/admin/addnew")}
              title="Add Admin"
            >
              <MdAddModerator />
            </button>
            
            <button
              onClick={gotoAddNewDoctor}
              className={getNavBtnClass("/doctor/addnew")}
              title="Add Doctor"
            >
              <IoPersonAddSharp />
            </button>
            
            <button
              onClick={gotoMessagesPage}
              className={getNavBtnClass("/messages")}
              title="Messages"
            >
              <AiFillMessage />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-600/20 text-xl text-red-300 transition hover:bg-red-600 hover:text-white md:h-12 md:w-12"
            title="Logout"
          >
            <RiLogoutBoxFill />
          </button>
        </div>
      </nav>

      <div
        className={`fixed left-0 top-0 z-30 h-screen w-full bg-black/50 transition-opacity duration-200 md:hidden ${
          show ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setShow(false)}
      />

      <div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center gap-4 border-b border-slate-200 bg-white px-4 transition-colors duration-200 md:hidden">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-lg text-xl text-slate-700 transition hover:bg-slate-100"
          onClick={() => setShow(!show)}
        >
          <GiHamburgerMenu />
        </button>
        <img src="/logo.png" alt="logo" className="h-9 w-9 rounded-lg border border-slate-200 bg-white p-1" />
        <p className="font-semibold text-slate-900">MediTrack Admin</p>
      </div>
    </>
  );
};

export default Sidebar;