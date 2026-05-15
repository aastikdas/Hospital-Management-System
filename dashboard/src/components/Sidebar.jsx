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
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";

const Sidebar = () => {
  const [show, setShow] = useState(false);

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

  return (
    <>
      <nav
        style={!isAuthenticated ? { display: "none" } : { display: "flex" }}
        className="dashboard-sidebar-bg fixed left-0 top-0 z-40 flex h-screen w-24 flex-col items-center justify-between px-4 py-8 shadow-xl transition-all duration-300 md:w-32"
      >
        <div className="flex flex-col items-center gap-8">
          <img src="/logo.png" alt="logo" className="h-12 w-12 rounded-lg bg-white p-1 shadow-lg" />
          
          <div className="flex flex-col items-center gap-6">
            <button
              onClick={gotoHomePage}
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl text-white transition hover:bg-sky-500 md:h-14 md:w-14"
              title="Dashboard"
            >
              <TiHome />
            </button>
            
            <button
              onClick={gotoDoctorsPage}
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl text-white transition hover:bg-sky-500 md:h-14 md:w-14"
              title="Doctors"
            >
              <FaUserDoctor />
            </button>
            
            <button
              onClick={gotoAddNewAdmin}
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl text-white transition hover:bg-sky-500 md:h-14 md:w-14"
              title="Add Admin"
            >
              <MdAddModerator />
            </button>
            
            <button
              onClick={gotoAddNewDoctor}
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl text-white transition hover:bg-sky-500 md:h-14 md:w-14"
              title="Add Doctor"
            >
              <IoPersonAddSharp />
            </button>
            
            <button
              onClick={gotoMessagesPage}
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl text-white transition hover:bg-sky-500 md:h-14 md:w-14"
              title="Messages"
            >
              <AiFillMessage />
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleLogout}
            className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-500/20 text-2xl text-rose-300 transition hover:bg-rose-500 hover:text-white md:h-14 md:w-14"
            title="Logout"
          >
            <RiLogoutBoxFill />
          </button>
        </div>
      </nav>

      <div
        className={`fixed left-0 top-0 z-30 h-screen w-full bg-black/50 transition-opacity duration-300 md:hidden ${
          show ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setShow(false)}
      />

      <div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center gap-4 bg-white/75 px-4 backdrop-blur-xl transition-colors duration-300 md:hidden">
        <button
          className="flex h-10 w-10 items-center justify-center rounded-xl text-xl text-slate-700 transition hover:bg-slate-100"
          onClick={() => setShow(!show)}
        >
          <GiHamburgerMenu />
        </button>
        <img src="/logo.png" alt="logo" className="h-10 w-10 rounded-lg bg-white p-1 shadow-md" />
        <p className="font-semibold text-slate-900">MediTrack Admin</p>
      </div>
    </>
  );
};

export default Sidebar;