import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

// Import images
import healthcareImg from '../IMAGES/healthcare.jpeg';
import financialImg from '../IMAGES/financial.jpeg';
import retailImg from '../IMAGES/retail &ecommerce.jpeg';
import manufacturingImg from '../IMAGES/manifacturing intelligence.jpeg';
import educationImg from '../IMAGES/education.jpeg';
import enterpriseImg from '../IMAGES/enterprise.jpeg';

// Services the user requested (with route slugs)
const servicesData = [
  {
    title: "AI Strategy Consulting",
    content: "Advisory services to align AI initiatives with business strategy, roadmap creation and governance.",
    icon: "🧭",
    image: enterpriseImg,
    slug: "ai-strategy"
  },
  {
    title: "AI Development and Integration",
    content: "End-to-end AI development, systems integration and deployment into your existing stack.",
    icon: "🔗",
    image: manufacturingImg,
    slug: "ai-development-integration"
  },
  {
    title: "Data Engineering",
    content: "Data pipelines, warehousing, ETL/ELT and real-time data infrastructure to power AI solutions.",
    icon: "🗄️",
    image: financialImg,
    slug: "data-engineering"
  },
  {
    title: "Software Design and Development",
    content: "Design-led engineering, APIs, scalable backend and frontend systems tailored for AI workloads.",
    icon: "💻",
    image: retailImg,
    slug: "software-development"
  },
  {
    title: "Machine Learning Model Development",
    content: "Model design, training, evaluation and MLOps to productionize ML at scale.",
    icon: "🤖",
    image: healthcareImg,
    slug: "ai-ml"
  },
  {
    title: "AI Agents Development",
    content: "Build intelligent agents and autonomous systems to automate tasks and augment teams.",
    icon: "🧠",
    image: enterpriseImg,
    slug: "ai-agents"
  }
];

const ServicesSection = () => {
  const scrollRef = useRef(null);

  return (
    <section className="bg-[#0B2847] py-20 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold text-white mb-16 text-center tracking-tight">
          Our Services — AI Solutions
        </h2>

        {/* Card Container (fully responsive) */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto md:overflow-visible scroll-smooth snap-x snap-mandatory scrollbar-hide"
        >
          {servicesData.map((service, index) => (
            <div
              key={index}
              className="bg-[#0D345B] min-w-[85%] sm:min-w-[60%] md:min-w-0 rounded-xl border border-[#1a4f8d] shadow-lg hover:shadow-2xl transition duration-500 transform hover:scale-[1.02] flex flex-col overflow-hidden group snap-center"
            >
              {/* Image Header */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D345B]"></div>

                <div className="absolute bottom-4 left-6">
                  <span className="text-4xl p-3 rounded-full bg-[#1A4F8D]/90 backdrop-blur-sm inline-block shadow-lg">
                    {service.icon}
                  </span>
                </div>
              </div>

              {/* Content Area */}
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-300 text-base leading-relaxed flex-grow mb-4">
                  {service.content}
                </p>
                <Link
                  to={`/services/${service.slug}`}
                  className="mt-auto text-[#4285F4] hover:text-[#6DD5ED] font-semibold text-sm transition duration-200 flex items-center group-hover:translate-x-1"
                >
                  Explore Solution
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
