import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <style>{`@keyframes hero-fly { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }`}</style>
      <section className="relative mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:mt-20 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="rounded-3xl border border-sky-100/80 bg-white/70 p-8 shadow-xl shadow-sky-100/50 backdrop-blur-sm transition-colors duration-300 dark:border-sky-900/40 dark:bg-slate-900/70 dark:shadow-sky-950/50 lg:p-10">
          <p className="mb-3 inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 dark:border-emerald-900 dark:bg-emerald-950 dark:text-emerald-300">
            Trusted Care Network
          </p>
          <h1 className="mb-5 text-3xl font-extrabold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="text-justify text-base leading-7 text-slate-600 dark:text-slate-300">
            MediTrack Medical Center is a modern healthcare facility committed to delivering reliable, patient-centric medical services with precision and care. Our team of experienced doctors and healthcare professionals focuses on accurate diagnosis, efficient treatment, and continuous patient monitoring. At MediTrack, we combine medical expertise with smart healthcare management to ensure seamless, transparent, and high-quality care throughout your health journey.
          </p>
        </div>
        <div className="group relative overflow-hidden rounded-3xl border border-sky-100 bg-gradient-to-br from-sky-100 via-cyan-50 to-emerald-100 p-6 shadow-xl shadow-cyan-100/60 transition-colors duration-300 dark:border-sky-900/40 dark:from-sky-950 dark:via-slate-800 dark:to-emerald-950 dark:shadow-sky-950/60">
          <img
            src={imageUrl}
            alt="hero"
            className="mx-auto h-auto w-[50%] max-w-sm origin-center drop-shadow-xl transition duration-500 hover:scale-[1.03] motion-safe:animate-[hero-fly_4s_ease-in-out_infinite] group-hover:[animation-play-state:paused]"
          />
          <span className="pointer-events-none absolute bottom-0 right-0 opacity-70">
            <img src="/Vector.png" alt="vector" className="w-32 animate-pulse sm:w-40" />
          </span>
        </div>
      </section>
    </>
  );
};

export default Hero;