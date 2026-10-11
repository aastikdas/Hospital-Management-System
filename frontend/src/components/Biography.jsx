import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <section className="mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:mt-16 lg:grid-cols-2 lg:items-center lg:px-8">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-900 sm:p-6">
        <img src={imageUrl} alt="who-we-are" className="h-full w-full rounded-lg object-cover" />
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-7 shadow-sm transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-900 sm:p-9">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">About Us</p>
        <h3 className="mb-4 text-3xl font-bold text-slate-900 dark:text-white">Who We Are</h3>
        <p className="mb-4 leading-7 text-slate-600 dark:text-neutral-300">
          MediTrack Medical Center is a modern healthcare institution focused on
          delivering accurate, reliable, and patient-centric medical services.
          We believe in combining clinical expertise with efficient digital
          systems to improve patient care and hospital management.
        </p>
        <p className="mb-4 leading-7 text-slate-600 dark:text-neutral-300">
          Our mission is to provide timely diagnosis, transparent treatment
          processes, and continuous monitoring for better health outcomes.
        </p>
        <p className="mb-4 leading-7 text-slate-600 dark:text-neutral-300">
          MediTrack is built with a strong foundation in modern medical
          practices and smart healthcare technology, ensuring seamless
          coordination between doctors, patients, and administrative staff.
        </p>
        <p className="mb-4 leading-7 text-slate-600 dark:text-neutral-300">
          From appointment scheduling to medical records and treatment
          tracking, our platform is designed to enhance efficiency while
          maintaining compassion and trust in healthcare delivery.
        </p>
        <p className="mb-4 leading-7 text-slate-600 dark:text-neutral-300">
          We are committed to innovation, ethical medical practices, and
          personalized care for every patient.
        </p>
        <p className="text-base font-semibold text-blue-700 dark:text-blue-400">Your health, our responsibility.</p>
      </div>
    </section>
  );
};

export default Biography;
