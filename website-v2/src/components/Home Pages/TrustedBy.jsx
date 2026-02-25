import React from "react";

/* ======================================================
   TrustedBy Component
====================================================== */
const TrustedBy = () => {
  /* ✅ Logos with Image Links */
  const logos = [
    {
      name: "Times Group",
      img: "https://www.time4education.com/theme/times/time/images/logov2.png",
    },
    {
      name: "BeamWelly",
      img: "https://beamwelly.com/wp-content/uploads/2023/11/beam_welly_logo-removebg-preview.png",
    },
    {
      name: "SVPCET",
      img: "https://almashines.s3.dualstack.ap-southeast-1.amazonaws.com/assets/images/institutes/logo/170x170/1519.jpg?v=1702015468",
    },
    {
      name: "Maharashtra Govt",
      img: "https://e7.pngegg.com/pngimages/921/740/png-clipart-black-text-with-logo-illustration-mumbai-government-of-india-government-of-maharashtra-logo-government-miscellaneous-emblem.png",
    },
  ];

  return (
    <section className="bg-transparent pt-6 pb-2 sm:pt-10 sm:pb-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-20">
        {/* Heading */}
        <h2
          className="text-center text-2xl sm:text-3xl font-semibold text-gray-800 mb-12"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Trusted By Leading Enterprises
        </h2>

        {/* ======================================================
            LOGO INFINITE SCROLL
        ====================================================== */}
        <div className="relative overflow-hidden mb-4">
          <div className="flex whitespace-nowrap animate-scroll">
            {/* First Set */}
            {logos.map((logo, index) => (
              <div
                key={`logo-first-${index}`}
                className="flex-shrink-0 w-36 sm:w-48 md:w-56 h-20 mx-6 sm:mx-10 flex justify-center items-center"
              >
                <img
                  src={logo.img}
                  alt={logo.name}
                  className="h-14 sm:h-16 object-contain hover:scale-110 transition duration-300"
                />
              </div>
            ))}

            {/* Duplicate Set */}
            {logos.map((logo, index) => (
              <div
                key={`logo-second-${index}`}
                className="flex-shrink-0 w-36 sm:w-48 md:w-56 h-20 mx-6 sm:mx-10 flex justify-center items-center"
              >
                <img
                  src={logo.img}
                  alt={logo.name}
                  className="h-14 sm:h-16 object-contain hover:scale-110 transition duration-300"
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default TrustedBy;
