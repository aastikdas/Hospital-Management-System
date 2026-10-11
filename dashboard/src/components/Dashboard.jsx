import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import api from "../axios/axios";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get(
          "/api/v1/appointment/all",
          { withCredentials: true }
        );

        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
        console.log(error);
      }
    };

    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await api.put(
        `api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, admin } = useContext(Context);

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard-shell min-h-screen transition-colors duration-200 md:ml-20 lg:ml-28">
      {/* Top spacing for mobile */}
      <div className="h-16 md:h-0" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8 grid gap-6 md:grid-cols-3">
          <div className="card md:col-span-2 flex flex-col justify-between gap-6 md:flex-row md:items-center rounded-xl bg-white p-6 border border-slate-200 shadow-sm">
            <div className="flex items-center gap-6">
              <img
                src="/doctor.png"
                alt="Doctor"
                className="h-16 w-16 rounded-full object-cover border border-slate-200 md:h-20 md:w-20"
              />

              <div>
                <p className="text-sm text-slate-500">Welcome back,</p>

                <h1 className="mt-1 text-2xl font-bold text-slate-900">
                  {admin && `${admin.firstName} ${admin.lastName}`}
                </h1>

                <p className="mt-1 text-xs font-medium text-slate-500">
                  Admin Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Total Appointments */}
          <div className="flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Appointments
            </p>

            <h3 className="mt-2 text-4xl font-bold text-slate-900">
              1500
            </h3>

            <p className="mt-1 text-xs text-slate-500">
              All time
            </p>
          </div>
        </div>

        {/* Secondary Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2">
          {/* Registered Doctors */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Registered Doctors
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  10
                </h3>
              </div>

              <div className="text-5xl opacity-30">
                👨‍⚕️
              </div>
            </div>
          </div>

          {/* Pending Appointments */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Pending Appointments
                </p>

                <h3 className="mt-2 text-3xl font-bold text-slate-900">
                  12
                </h3>
              </div>

              <div className="text-5xl opacity-30">
                ⏰
              </div>
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-slate-200 bg-slate-50 px-6 py-5">
            <h2 className="text-lg font-bold text-slate-900">
              Appointment Management
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Review and manage patient appointments
            </p>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            {appointments && appointments.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-100">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Patient Name
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Appointment Date
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Doctor
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Department
                    </th>

                    <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                      Status
                    </th>

                    <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">
                      Visited
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="border-b border-slate-100 transition hover:bg-slate-50"
                    >
                      {/* Patient */}
                      <td className="px-6 py-5 text-sm font-medium text-slate-800">
                        {`${appointment.firstName} ${appointment.lastName}`}
                      </td>

                      {/* Date */}
                      <td className="px-6 py-5 text-sm text-slate-600">
                        {appointment.appointment_date.substring(0, 10)}
                      </td>

                      {/* Doctor */}
                      <td className="px-6 py-5 text-sm text-slate-700">
                        {`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}
                      </td>

                      {/* Department */}
                      <td className="px-6 py-5">
                        <span className="rounded-lg bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                          {appointment.department}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-5">
                        <select
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(
                              appointment._id,
                              e.target.value
                            )
                          }
                          className={`rounded-lg px-3 py-2 text-sm font-semibold outline-none ${
                            appointment.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700"
                              : appointment.status === "Accepted"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          <option value="Pending">
                            Pending
                          </option>

                          <option value="Accepted">
                            Accepted
                          </option>

                          <option value="Rejected">
                            Rejected
                          </option>
                        </select>
                      </td>

                      {/* Visited */}
                      <td className="px-6 py-5 text-center">
                        {appointment.hasVisited === true ? (
                          <GoCheckCircleFill className="inline text-2xl text-emerald-500" />
                        ) : (
                          <AiFillCloseCircle className="inline text-2xl text-rose-500" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="flex items-center justify-center py-20">
                <p className="text-lg text-slate-600">
                  No appointments found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;