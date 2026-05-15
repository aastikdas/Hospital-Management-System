import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import api from "../axios/axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await api.get(
          "/api/v1/message/allmessages",
          { withCredentials: true }
        );
        setMessages(data.messages);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    fetchMessages();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard-shell min-h-screen transition-colors duration-300 md:ml-24 lg:ml-32">
      {/* Top spacing for mobile */}
      <div className="h-16 md:h-0" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Patient Messages
          </h1>
          <p className="mt-2 text-slate-600">
            Review and respond to patient inquiries
          </p>
        </div>

        {messages && messages.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {messages.map((element) => (
              <div key={element._id} className="card flex flex-col gap-4">
                <div className="border-b border-slate-200 pb-4">
                  <h3 className="text-lg font-bold text-slate-900">
                    {element.firstName} {element.lastName}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    Patient Inquiry
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Email
                    </p>
                    <p className="mt-1 break-all text-sm text-slate-700">
                      {element.email}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Phone
                    </p>
                    <p className="mt-1 text-sm text-slate-700">
                      {element.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                      Message
                    </p>
                    <p className="mt-2 rounded-lg bg-slate-100 p-3 text-sm text-slate-700">
                      {element.message}
                    </p>
                  </div>
                </div>

                <button className="btn-primary mt-2 w-full">
                  Reply to Message
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 py-16">
            <div className="text-5xl mb-4">📭</div>
            <p className="text-lg font-semibold text-slate-600">
              No Messages Yet
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Patient inquiries will appear here
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Messages;