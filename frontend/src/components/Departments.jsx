import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const Departments = () => {
  const dptArr = [
    {
      name: "Pediatrics",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Cardiology",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Oncology",
      imageUrl: "/departments/onco.jpg",
    },
    {
      name: "Radiology",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Physical Therapy",
      imageUrl: "/departments/therapy.jpg",
    },
    {
      name: "Dermatology",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      imageUrl: "/departments/ent.jpg",
    },
  ];

  const responsive = {
    extraLarge: {
      breakpoint: { max: 3000, min: 1324 },
      items: 4,
    },
    large: {
      breakpoint: { max: 1324, min: 1005 },
      items: 3,
    },
    medium: {
      breakpoint: { max: 1005, min: 700 },
      items: 2,
    },
    small: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <section className="mx-auto mt-16 w-full max-w-7xl px-4 sm:px-6 lg:mt-20 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Departments</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Explore specialized units and care pathways.</p>
        </div>
        <Carousel
          responsive={responsive}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2200}
          removeArrowOnDeviceType={["medium", "small"]}
        >
          {dptArr.map((dept,i)=>{
            return(
              <div key={i} className="group mx-2 overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-md shadow-slate-100/70 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-sky-100 dark:border-sky-900/40 dark:bg-slate-800 dark:shadow-slate-800/70 dark:hover:shadow-sky-950/70">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={dept.imageUrl}
                    alt={dept.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-110 group-hover:rotate-1"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/5 to-transparent dark:from-slate-900/70 dark:via-slate-900/10" />
                  <div className="absolute left-4 top-4 rounded-full border border-white/60 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-sky-700 backdrop-blur-sm dark:bg-slate-800/80 dark:text-sky-300">
                    Specialty
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-base font-bold text-slate-800 dark:text-white">{dept.name}</div>
                </div>
              </div>
            )
          })}
        </Carousel>
      </section>
    </>
  );
};

export default Departments;