import React from "react";

const Hero = ({ title, imageUrl }) => {
  return (
    <>
      <style>{`
        @keyframes hero-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
      `}</style>
      <section className="relative mx-auto mt-12 grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:mt-16 lg:grid-cols-2 lg:items-center lg:px-8">
        <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-900 lg:p-10">
          <p className="mb-3 inline-flex items-center rounded border border-slate-200 bg-slate-100 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-slate-700 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300">
            Trusted Care Network
          </p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">{title}</h1>
          <p className="text-justify text-base leading-7 text-slate-600 dark:text-neutral-300">
            MediTrack Medical Center is a modern healthcare facility committed to delivering reliable, patient-centric medical services with precision and care. Our team of experienced doctors and healthcare professionals focuses on accurate diagnosis, efficient treatment, and continuous patient monitoring. At MediTrack, we combine medical expertise with smart healthcare management to ensure seamless, transparent, and high-quality care throughout your health journey.
          </p>
        </div>
        <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-colors duration-200 dark:border-neutral-800 dark:bg-neutral-900">
          <img
            src={imageUrl}
            alt="hero"
            className="mx-auto h-auto w-[55%] max-w-sm drop-shadow-sm transition duration-300 motion-safe:animate-[hero-float_4s_ease-in-out_infinite]"
          />
          <span className="pointer-events-none absolute bottom-0 right-0 opacity-30">
            <img src="/Vector.png" alt="vector" className="w-32 sm:w-40" />
          </span>
        </div>
      </section>
    </>
  );
};

export default Hero;