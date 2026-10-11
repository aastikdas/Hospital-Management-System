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
    "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400 dark:focus:border-blue-500 dark:focus:ring-blue-500";

  return (
    <section className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:mt-16 lg:px-8">
      <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-900 sm:p-8">
        <h2 className="mb-5 text-3xl font-bold text-slate-900 dark:text-white">Send Us A Message</h2>
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
              type="email"
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
          <div className="flex justify-center pt-2">
            <button
              className="rounded-lg bg-blue-600 px-8 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              type="submit"
            >
              Send
            </button>
          </div>
        </form>
        <img src="/Vector.png" alt="vector" className="pointer-events-none absolute bottom-0 right-0 w-24 opacity-30 sm:w-32" />
      </div>
    </section>
  );
};

export default MessageForm;