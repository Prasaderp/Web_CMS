import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../Navbar";
import SEO from "../SEO";

const HumanoidSystems = () => {
  const [active, setActive] = useState(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const features = [
    {
      title: "Humanoid Robot Development",
      desc: "Advanced human-like robotic systems for enterprises.",
      },
    {
      title: "Bipedal Locomotion & Motion Control",
      desc: "Realistic walking, balance, and mobility systems.",
      },
    {
      title: "Human-Robot Interaction (HRI)",
      desc: "Natural communication between humans and robots.",
      },
    {
      title: "Computer Vision & Perception",
      desc: "Robots that see, understand, and respond intelligently.",
      },
    {
      title: "AI Brain for Humanoids",
      desc: "Cognitive intelligence powered by generative AI.",
      detail:
        "We integrate LLM-based reasoning and autonomous decision-making into humanoid robots, enabling smart behavior, learning, and task execution.",
    },
    {
      title: "Humanoids for Industry & Healthcare",
      desc: "Next-gen assistants for real-world sectors.",
      },
  ];

 return (
    <>
        <SEO
            title="Humanoid Systems & Robotics Services"
            description="Experience the next generation of robotics with intelligent humanoid systems. From human-like motion to AI-powered interaction, we build the future of humanoid technology."
            url="/services/humanoid-systems"
            image="/humanoid-systems-og.jpg"
        />
    <div className="font-inter bg-gradient-to-b from-white to-[#f8faff] text-gray-800">
      <Navbar />

      {/* HERO */}
      <section className="relative py-20 lg:py-32 about-hero">
        <div className="hero-overlay" />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl lg:text-7xl font-black mb-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Humanoid Systems Shaping the Future
          </motion.h1>

          <motion.p
            className="text-xl lg:text-2xl italic max-w-4xl mx-auto leading-relaxed"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Experience the next generation of robotics with intelligent humanoid
            systems. From human-like motion to AI-powered interaction, we build
            the future of humanoid technology.
          </motion.p>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 bg-white text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-900 mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          Our Humanoid Systems Expertise
        </motion.h2>

        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-12"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          We develop intelligent humanoid robots that combine advanced AI,
          robotics engineering, and real-world adaptability.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
          {features.map((f, i) => (
            <motion.div
              layout
              key={i}
              onClick={() => setActive(active === i ? null : i)}
              className="cursor-pointer bg-[#f8f9ff] p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>

              <AnimatePresence>
                {active === i && (
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      damping: 20,
                    }}
                    className="mt-4 text-sm text-gray-700 leading-relaxed"
                  >
                    {f.detail}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* STRATEGY */}
      <section className="flex flex-wrap items-center justify-between max-w-6xl mx-auto py-20 px-10 gap-10">
        <motion.div
          className="flex-1 min-w-[320px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          <img
            src="https://images.unsplash.com/photo-1603398938378-e54eab446dde"
            alt="Humanoid Robotics"
            className="w-full h-[350px] object-cover rounded-xl shadow-lg"
          />
        </motion.div>

        <motion.div
          className="flex-1"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          <h3 className="text-2xl font-bold mb-4">
            End-to-End Humanoid System Development
          </h3>
          <p className="text-gray-600 mb-6">
            We cover the complete humanoid robotics lifecycle — from mechanical
            design and AI brain development to deployment and real-time control.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "Humanoid Motion Control",
              "AI Cognitive Systems",
              "Robotic Perception",
              "Human Interaction",
            ].map((t, i) => (
              <span
                key={i}
                className="bg-[#e9edff] text-[#2D4DE8] px-4 py-2 rounded-full text-sm font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* BUSINESS */}
      <section className="flex flex-wrap items-center justify-between max-w-6xl mx-auto py-20 px-10 gap-10">
        <motion.div
          className="flex-1"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          <h3 className="text-2xl font-bold mb-4">
            Humanoids Across Industries
          </h3>
          <p className="text-gray-600 mb-6">
            Humanoid robots are transforming industries like healthcare,
            hospitality, manufacturing, and smart cities with intelligent
            assistance.
          </p>

          <div className="flex flex-wrap gap-3">
            {[
              "Healthcare Assistants",
              "Retail & Hospitality",
              "Smart Manufacturing",
              "Future Smart Cities",
            ].map((t, i) => (
              <span
                key={i}
                className="bg-[#e9edff] text-[#2D4DE8] px-4 py-2 rounded-full text-sm font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="flex-1 min-w-[320px]"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          <img
            src="https://images.unsplash.com/photo-1593378026483-2a1fd46a35bd"
            alt="Humanoid AI Growth"
            className="w-full h-[350px] object-cover rounded-xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-[#2D4DE8] text-white text-center py-16 px-6">
        <motion.h2
          className="text-3xl font-bold mb-4"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          Ready to Build the Future with Humanoids?
        </motion.h2>

        <motion.p
          className="max-w-2xl mx-auto mb-8 text-gray-200"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
        >
          Let our humanoid robotics experts help you design intelligent systems
          that revolutionize automation and interaction.
        </motion.p>

        <motion.div variants={fadeUp} initial="hidden" whileInView="visible">
          <Link
            to="/contact"
            className="bg-white text-[#2D4DE8] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Speak to Our Experts
          </Link>
        </motion.div>
      </section>
    </div>
    </>
  );
};

export default HumanoidSystems;
