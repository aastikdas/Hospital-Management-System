import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import api from "../axios/axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get(
          "/api/v1/user/doctors",
          { withCredentials: true }
        );
        setDoctors(data.doctors);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };
    fetchDoctors();
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
            Healthcare Professionals
          </h1>
          <p className="mt-2 text-slate-600">
            Manage and view all registered doctors
          </p>
        </div>

        {doctors && doctors.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {doctors.map((element) => (
              <div key={element._id} className="card overflow-hidden flex flex-col">
                <div className="relative h-48 w-full overflow-hidden bg-slate-200">
                  <img
                    src={element.docAvatar && element.docAvatar.url}
                    alt={`${element.firstName} ${element.lastName}`}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-4">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {`${element.firstName} ${element.lastName}`}
                    </h3>
                    <p className="mt-1 inline-block rounded-lg bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
                      {element.doctorDepartment}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-slate-200 pt-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Email
                      </p>
                      <p className="mt-1 break-all text-xs text-slate-700">
                        {element.email}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Phone
                      </p>
                      <p className="mt-1 text-xs text-slate-700">
                        {element.phone}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        NIC
                      </p>
                      <p className="mt-1 text-xs text-slate-700">
                        {element.nic}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Date of Birth
                      </p>
                      <p className="mt-1 text-xs text-slate-700">
                        {element.dob.substring(0, 10)}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                        Gender
                      </p>
                      <p className="mt-1 text-xs text-slate-700">
                        {element.gender}
                      </p>
                    </div>
                  </div>
                </div>

                <button className="btn-primary m-4">View Details</button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-slate-300 py-16">
            <div className="text-5xl mb-4">👨‍⚕️</div>
            <p className="text-lg font-semibold text-slate-600">
              No Doctors Registered
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Start by adding the first doctor to your team
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Doctors;