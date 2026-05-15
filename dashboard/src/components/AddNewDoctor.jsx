import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import api from "../axios/axios";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      await api
        .post("/api/v1/user/doctor/adddoctor", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
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

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="card">
          <div className="border-b border-slate-200 bg-slate-50/50 px-6 py-6 sm:px-8">
            <div className="flex items-center gap-4">
              <img src="/logo.png" alt="logo" className="h-12 w-12 rounded-lg bg-white p-1 shadow-md" />
              <div>
                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Register New Doctor
                </h1>
                <p className="mt-1 text-sm text-slate-600">
                  Add a qualified healthcare professional to your team
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAddNewDoctor} className="p-6 sm:p-8">
            <div className="mb-8 flex flex-col items-center gap-6">
              <div className="relative">
                <img
                  src={docAvatarPreview ? `${docAvatarPreview}` : "/docHolder.jpg"}
                  alt="Doctor Avatar"
                  className="h-32 w-32 rounded-2xl border-4 border-sky-200 object-cover shadow-lg"
                />
                <label className="absolute inset-0 flex cursor-pointer items-center justify-center rounded-2xl bg-black/40 opacity-0 transition hover:opacity-100">
                  <span className="text-sm font-semibold text-white">Change</span>
                  <input 
                    type="file" 
                    onChange={handleAvatar}
                    className="hidden"
                    accept="image/*"
                  />
                </label>
              </div>
            </div>

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

              {/* Professional Information */}
              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">
                  Professional Information
                </h3>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="department" className="form-label">Department</label>
                    <select
                      id="department"
                      value={doctorDepartment}
                      onChange={(e) => setDoctorDepartment(e.target.value)}
                      required
                      className="form-input"
                    >
                      <option value="">Select Department</option>
                      {departmentsArray.map((depart, index) => (
                        <option value={depart} key={index}>
                          {depart}
                        </option>
                      ))}
                    </select>
                  </div>
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

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Register Doctor
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

export default AddNewDoctor;