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
      <section className="mx-auto mt-12 w-full max-w-7xl px-4 sm:px-6 lg:mt-16 lg:px-8">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Departments</h2>
          <p className="text-sm text-slate-500 dark:text-neutral-400">Explore specialized units and care pathways.</p>
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
              <div key={i} className="mx-2 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-900">
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={dept.imageUrl}
                    alt={dept.name}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <div className="absolute left-3 top-3 rounded bg-white/90 px-2.5 py-0.5 text-xs font-medium text-slate-800 shadow-sm dark:bg-neutral-800/90 dark:text-neutral-200">
                    Specialty
                  </div>
                </div>
                <div className="p-4">
                  <div className="text-base font-semibold text-slate-900 dark:text-white">{dept.name}</div>
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