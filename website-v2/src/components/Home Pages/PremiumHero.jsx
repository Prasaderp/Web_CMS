import React, { useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { SEARCH_INDEX } from "../../lib/constants";

const IMAGES = [
  "https://media.istockphoto.com/id/1193074238/photo/technological-prosthetic-robot-arm-is-tested-by-two-professional-development-engineers-in-a.jpg?s=612x612&w=0&k=20&c=JcTyKSb4wKcxM5dT78vtEr68E9Kvm2ZU-oj4QnjP5D8=",
  "https://media.istockphoto.com/id/2200550660/photo/ai-data-analysis-business-people-use-ai-to-analyze-financial-related-data-big-data-complex.jpg?s=612x612&w=0&k=20&c=ujKhJPhsm3P2i_uIbdnG24X_j2airid7iudukSI0yRY=",
  "https://media.istockphoto.com/id/1413210242/photo/asian-woman-watching-hologram-screens-business-and-technology-concept-smart-office-gui.jpg?s=612x612&w=0&k=20&c=cm-63juCrqSh5-BSRIPfmMpeO1UuZo0gcdrvyzj1hIM=",
  "https://media.istockphoto.com/id/2200550653/photo/ai-agents-business-analyze-businesses-together-with-al-assistants-to-perform-tasks-that-suit.jpg?s=612x612&w=0&k=20&c=t59KmOWOLPFalbydgpMUheTRCKWJxeW9-XHWU54-pFQ=",
  "https://media.istockphoto.com/id/2055022877/photo/woman-with-laptop-and-ai-robot.jpg?s=612x612&w=0&k=20&c=1tjtiJRLw99aanehLVenY0Y8_aTNjIHWAWCcVTaa0Vk=",
];

const QUICK_TAGS = [
  "Artificial Intelligence & ML",
  "Data Engineering",
  "Robotics",
  "Sahayak AI",
  "AI Interviewer",
];

const LOGOS = [
  "https://www.time4education.com/theme/times/time/images/logov2.png",
  "https://beamwelly.com/wp-content/uploads/2023/11/beam_welly_logo-removebg-preview.png",
  "https://almashines.s3.dualstack.ap-southeast-1.amazonaws.com/assets/images/institutes/logo/170x170/1519.jpg?v=1702015468",
  "https://e7.pngegg.com/pngimages/921/740/png-clipart-black-text-with-logo-illustration-mumbai-government-of-india-government-of-maharashtra-logo-government-miscellaneous-emblem.png",
];

const findMatches = (value) => {
  const normalizedValue = value.trim().toLowerCase();
  if (!normalizedValue) return [];
  return SEARCH_INDEX.filter(({ keywords }) =>
    keywords.some((keyword) => keyword.includes(normalizedValue))
  );
};

const PremiumHero = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const matches = useMemo(() => findMatches(query), [query]);
  const suggestions = matches.slice(0, 8);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((previous) => (previous + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(intervalId);
  }, []);

  const goToBestMatch = (value) => {
    const bestMatch = findMatches(value)[0];
    if (!bestMatch) {
      alert("No matching product/service found");
      return;
    }
    navigate(bestMatch.to);
  };

  return (
    <section className="w-full pt-28 pb-20 relative overflow-hidden font-serif bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-14 items-center">
        <div className="animate-fadeInUp">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Master Tomorrow&apos;s Skills Today.
          </h1>
          <p className="mt-5 text-gray-700 text-lg">
            Transform your career with AI, Robotics, Enterprise Software &amp;
            Digital Innovation.
          </p>
          <div className="mt-10 relative">
            <div className="flex items-center bg-white/70 backdrop-blur-xl border border-gray-200 shadow-2xl rounded-2xl overflow-hidden hover:scale-[1.02] transition duration-300">
              <input
                type="text"
                placeholder="Search Products or Services..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    goToBestMatch(query);
                  }
                }}
                className="w-full px-6 py-4 outline-none text-gray-800 bg-transparent"
              />
              <button
                onClick={() => goToBestMatch(query)}
                className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white px-8 py-4 flex items-center gap-2 hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
              >
                <FaSearch />
                Search
              </button>
            </div>
            {query.trim() && suggestions.length > 0 && (
              <div className="absolute w-full bg-white shadow-xl rounded-xl mt-2 border z-20">
                {suggestions.map((item) => (
                  <button
                    key={`${item.category}-${item.to}`}
                    onClick={() => {
                      setQuery(item.label);
                      navigate(item.to);
                    }}
                    className="w-full text-left px-5 py-3 hover:bg-indigo-50 transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-wrap gap-3 mt-8">
            {QUICK_TAGS.map((label) => (
              <button
                key={label}
                onClick={() => goToBestMatch(label)}
                className="px-5 py-2 bg-white shadow-md rounded-full text-sm hover:scale-105 hover:shadow-xl transition duration-300"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="relative h-[420px] w-full">
          {IMAGES.map((imageUrl, index) => (
            <img
              key={imageUrl}
              src={imageUrl}
              alt="slide"
              className={`absolute top-0 left-0 w-full h-full object-cover rounded-3xl shadow-xl transition-opacity duration-1000 ${
                index === currentImage ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
      </div>
      <div className="mt-24 overflow-hidden px-6">
        <h3 className="text-center text-2xl font-semibold text-gray-800 mb-12">
          Trusted By Leading Enterprises
        </h3>
        <div className="relative overflow-hidden">
          <div className="flex whitespace-nowrap animate-scroll">
            {LOGOS.map((logo, index) => (
              <div
                key={`logo-first-${index}`}
                className="flex-shrink-0 w-36 sm:w-48 md:w-56 h-20 mx-6 sm:mx-10 flex justify-center items-center"
              >
                <img
                  src={logo}
                  alt="company"
                  className="h-14 sm:h-16 object-contain hover:scale-110 transition duration-300"
                />
              </div>
            ))}
            {LOGOS.map((logo, index) => (
              <div
                key={`logo-second-${index}`}
                className="flex-shrink-0 w-36 sm:w-48 md:w-56 h-20 mx-6 sm:mx-10 flex justify-center items-center"
              >
                <img
                  src={logo}
                  alt="company"
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

export default PremiumHero;