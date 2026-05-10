import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <>
      <section className="mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:mt-20 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-b from-emerald-50 to-sky-50 p-4 shadow-lg shadow-emerald-100/60 transition-colors duration-300 dark:border-emerald-900/40 dark:from-emerald-950 dark:to-sky-950 dark:shadow-emerald-950/60 sm:p-6">
          <img src={imageUrl} alt="who-we-are" className="h-full w-full rounded-2xl object-cover" />
        </div>
        <div className="rounded-3xl border border-sky-100 bg-white/80 p-7 shadow-lg shadow-sky-100/60 backdrop-blur-sm transition-colors duration-300 dark:border-sky-900/40 dark:bg-slate-900/80 dark:shadow-sky-950/60 sm:p-9">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700 dark:text-sky-400">About Us</p>
          <h3 className="mb-5 text-3xl font-extrabold text-slate-900 dark:text-white">Who We Are</h3>
          <p className="mb-4 leading-7 text-slate-600 dark:text-slate-300">
            MediTrack Medical Center is a modern healthcare institution focused on
            delivering accurate, reliable, and patient-centric medical services.
            We believe in combining clinical expertise with efficient digital
            systems to improve patient care and hospital management.
          </p>
          <p className="mb-4 leading-7 text-slate-600 dark:text-slate-300">
            Our mission is to provide timely diagnosis, transparent treatment
            processes, and continuous monitoring for better health outcomes.
          </p>
          <p className="mb-4 leading-7 text-slate-600 dark:text-slate-300">
            MediTrack is built with a strong foundation in modern medical
            practices and smart healthcare technology, ensuring seamless
            coordination between doctors, patients, and administrative staff.
          </p>
          <p className="mb-4 leading-7 text-slate-600 dark:text-slate-300">
            From appointment scheduling to medical records and treatment
            tracking, our platform is designed to enhance efficiency while
            maintaining compassion and trust in healthcare delivery.
          </p>
          <p className="mb-4 leading-7 text-slate-600 dark:text-slate-300">
            We are committed to innovation, ethical medical practices, and
            personalized care for every patient.
          </p>
          <p className="text-lg font-semibold text-emerald-700 dark:text-emerald-400">Your health, our responsibility.</p>
        </div>
      </section>
    </>
  );
};

export default Biography;
