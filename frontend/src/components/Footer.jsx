import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaMailchimp, FaPhone } from "react-icons/fa6";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Monday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <>
      <footer className="mx-auto mt-16 w-full max-w-7xl px-4 pb-8 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-100/80 backdrop-blur-sm transition-colors duration-300 dark:border-slate-700 dark:bg-slate-900/80 dark:shadow-slate-900/80 sm:p-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <img src="/logo.png" alt="logo" className="h-16 w-16 rounded-xl bg-white p-2 shadow-sm dark:bg-slate-800" />
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400">
                Smart, compassionate hospital management focused on reliable patient outcomes.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Quick Links</h4>
              <ul className="mt-3 flex flex-col gap-2 text-sm">
                <Link className="text-slate-600 transition hover:text-sky-700 dark:text-slate-400 dark:hover:text-sky-400" to={"/"}>Home</Link>
                <Link className="text-slate-600 transition hover:text-sky-700 dark:text-slate-400 dark:hover:text-sky-400" to={"/appointment"}>Appointment</Link>
                <Link className="text-slate-600 transition hover:text-sky-700 dark:text-slate-400 dark:hover:text-sky-400" to={"/about"}>About</Link>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Hours</h4>
              <ul className="mt-3 space-y-2 text-sm">
                {hours.map((element) => (
                  <li key={element.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 dark:bg-slate-800">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{element.day}</span>
                    <span className="text-slate-500 dark:text-slate-400">{element.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">Contact</h4>
              <div className="mt-3 space-y-3 text-sm">
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  <FaPhone className="text-sky-600 dark:text-sky-400" />
                  <span>999-999-99</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  <FaMailchimp className="text-emerald-600 dark:text-emerald-400" />
                  <span>medi@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2 text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                  <FaLocationArrow className="text-rose-500 dark:text-rose-400" />
                  <span>Bhagalpur, Bihar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;