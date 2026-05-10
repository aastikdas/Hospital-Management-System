import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../axios/axios";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await api
        .post(
          "/api/v1/message/send",
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm outline-none transition focus:border-sky-500 focus:ring-4 focus:ring-sky-100 dark:border-slate-600 dark:bg-slate-800 dark:text-white dark:placeholder-slate-400 dark:focus:border-sky-500 dark:focus:ring-sky-950";

  return (
    <>
      <section className="mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6 lg:mt-20 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-white via-emerald-50/40 to-sky-50 p-6 shadow-xl shadow-emerald-100/60 transition-colors duration-300 dark:border-emerald-900/40 dark:from-slate-900 dark:via-emerald-950/20 dark:to-sky-950 dark:shadow-emerald-950/60 sm:p-8">
          <h2 className="mb-5 text-3xl font-extrabold text-slate-900 dark:text-white">Send Us A Message</h2>
          <form onSubmit={handleMessage} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className={inputClass}
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                className={inputClass}
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                className={inputClass}
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className={inputClass}
                type="number"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <textarea
              className={inputClass + " min-h-40 resize-y"}
              rows={7}
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <div className="flex justify-center pt-1">
              <button
                className="rounded-xl bg-emerald-600 px-7 py-3 text-sm font-semibold tracking-wide text-white shadow-md shadow-emerald-200 transition hover:-translate-y-0.5 hover:bg-emerald-700"
                type="submit"
              >
                Send
              </button>
            </div>
          </form>
          <img src="/Vector.png" alt="vector" className="pointer-events-none absolute bottom-0 right-0 w-24 opacity-60 sm:w-32" />
        </div>
      </section>
    </>
  );
};

export default MessageForm;