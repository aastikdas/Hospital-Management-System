import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../axios/axios";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      await api
        .post(
          "/api/v1/user/admin/addnew",
          { firstName, lastName, email, phone, nic, dob, gender, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="dashboard-shell min-h-screen transition-colors duration-300 md:ml-24 lg:ml-32">
      {/* Top spacing for mobile */}
      <div className="h-16 md:h-0" />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="card">
          <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="logo" className="h-12 w-12 rounded-lg bg-white p-1 shadow-md" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Add New Administrator
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Onboard a new admin user to manage the hospital system
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddNewAdmin} className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  Personal Information
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="form-label">First Name</label>
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Enter first name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="form-label">Last Name</label>
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Enter last name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  Contact Information
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="form-label">Mobile Number</label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="Enter mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Security Information */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  Security Information
                </h3>
                <div>
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="form-input"
                  />
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  Additional Information
                </h3>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div>
                    <label htmlFor="nic" className="form-label">NIC</label>
                    <input
                      id="nic"
                      type="text"
                      placeholder="Enter NIC"
                      value={nic}
                      onChange={(e) => setNic(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                    <input
                      id="dob"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      required
                      className="form-input"
                    />
                  </div>
                  <div>
                    <label htmlFor="gender" className="form-label">Gender</label>
                    <select
                      id="gender"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                      required
                      className="form-input"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Add New Admin
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo("/")}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddNewAdmin;