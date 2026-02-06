import React from "react";

// Data for the "Why Choose Us" cards
const featuresData = [
  {
    icon: (
      <svg
        className="w-16 h-16 text-blue-500 group-hover:text-white transition duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9 12l2 2 4-4m5.618-4.275a1.125 1.125 0 011.238-3.076l.322.091c.877.247 1.25 1.144.821 1.902L20.47 6.168a.93.93 0 01-.191 1.054L15 12h-3v4l-4 4-1.636-1.636a2 2 0 01-.546-2.583L7 11.5V11a.5.5 0 01.5-.5h2a.5.5 0 01.5.5v.5L13.061 9.53a.5.5 0 01.488-.135l.983.279a.5.5 0 01.278.487l-.023.23a.5.5 0 01-.487.439l-.983-.279zM12 21.5a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
        />
      </svg>
    ),
    title: "Ethical AI & Responsible Innovation",
    description:
      "We embed ethical considerations into every stage of development, ensuring fairness, transparency, and accountability in all our AI solutions.",
  },
  {
    icon: (
      <svg
        className="w-16 h-16 text-blue-500 group-hover:text-white transition duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    title: "Deep Technical Expertise",
    description:
      "Our team comprises seasoned AI engineers, data scientists, and domain experts committed to leveraging the latest advancements for your success.",
  },
  {
    icon: (
      <svg
        className="w-16 h-16 text-blue-500 group-hover:text-white transition duration-300"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
          d="M9.75 3L11.75 5.5M11.75 5.5L13.75 3M11.75 5.5V17.5M6 19.5h12c1.1 0 2-.9 2-2s-.9-2-2-2H6c-1.1 0-2 .9-2 2s.9 2 2 2z"
        />
      </svg>
    ),
    title: "Agile & Collaborative Approach",
    description:
      "We partner closely with clients, fostering transparency and flexibility throughout the development lifecycle to meet evolving business needs.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="bg-gray-50 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-4xl sm:text-5xl font-serif font-bold text-gray-800 mb-16 text-center tracking-tight">
          Why Partner with <span className="text-blue-600">AiGENThix?</span>
        </h2>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-lg hover:shadow-2xl 
                         transition duration-300 transform hover:-translate-y-2 text-center 
                         group flex flex-col items-center justify-center"
            >
              {/* Icon */}
              <div className="mb-6 bg-blue-50 p-5 rounded-full flex items-center justify-center transition duration-300 group-hover:bg-blue-600">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-semibold text-gray-800 mb-4 leading-tight group-hover:text-blue-600 transition duration-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed group-hover:text-gray-700 transition duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
