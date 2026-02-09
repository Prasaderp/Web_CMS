import React from "react";
import SEO from "../SEO";


const MAIN_FONT = "'Playfair Display', Georgia, serif";

const RND = () => {

return (
    <>
        <SEO
            title="Research & Development - AiGENThix"
            description="Building intelligent, production-ready AI systems engineered for real-world deployment and enterprise environments."
        />
        <div className="min-h-screen bg-white font-['Poppins',_sans-serif]">

            {/* Hero Section (Unchanged for scope) */}
            <section className="relative py-16 about-hero">
                {/* ... Hero Content ... (omitted for brevity) */}
                <div className="absolute inset-0 hero-overlay" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 pt-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 animate-fadeInDown">
                        <span className="text-blue-300 italic">Research & Development</span>
                    </h1>
                    <p className="text-xl text-gray-100 max-w-4xl mx-auto leading-relaxed mt-4">
                        Building intelligent, production-ready AI systems engineered for real-world deployment and enterprise environments.
                    </p>
                </div>
            </section>

      {/* ================= PRODUCT SECTION ================= */}
      <section
        style={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "90px 20px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "70px",
          alignItems: "center",
        }}
      >
        {/* -------- LEFT CONTENT -------- */}
        <div>
          <h2
            style={{
              fontFamily: MAIN_FONT,
              fontSize: "38px",
              marginBottom: "18px",
              color: "#1a202c",
            }}
          >
            AI Receptionist v1.0
          </h2>

          <p
            style={{
              fontSize: "18px",
              color: "#4a5568",
              marginBottom: "26px",
              lineHeight: "1.75",
            }}
          >
            <strong>Next-Generation AI Receptionist for Events</strong>
            <br />
            A smart, interactive humanoid assistant designed to engage visitors,
            answer queries instantly, and elevate the professional experience at
            conferences, expos, and corporate venues.
          </p>

          <ul
            style={{
              paddingLeft: "22px",
              color: "#2d3748",
              fontSize: "16px",
              lineHeight: "2",
            }}
          >
            <li>Instant attendee query handling using AI</li>
            <li>Navigation support for halls, sessions & schedules</li>
            <li>Professional front-desk presence with humanoid design</li>
            <li>Maintain consistent brand identity across all event touchpoints</li>
          </ul>

          <button
            style={{
              marginTop: "34px",
              padding: "15px 34px",
              background: "linear-gradient(135deg, #2D4DE8, #1E3ED8)",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              fontSize: "16px",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 10px 25px rgba(45,77,232,0.35)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "translateY(-2px)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "translateY(0)")
            }
          >
            Request Demo
          </button>
        </div>

        {/* -------- RIGHT 3D MODEL -------- */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: "22px",
            boxShadow: "0 30px 70px rgba(0,0,0,0.12)",
            padding: "24px",
          }}
        >
          <model-viewer
  src="https://modelviewer.dev/shared-assets/models/Astronaut.glb"
  camera-controls
  auto-rotate
  rotation-per-second="6deg"
  style={{ width: "100%", height: "550px" }}
  exposure="1.15"
  shadow-intensity="1"
  camera-orbit="9deg 70deg 20m"
  field-of-view="45deg"
  environment-image="neutral"
></model-viewer>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <section
        style={{
          background: "#ffffff",
          padding: "42px 20px",
          textAlign: "center",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <p style={{ color: "#718096", fontSize: "14px" }}>
          © 2026 — AI Receptionist v1.0 | Research & Development Division
        </p>
      </section>
        </div>
    </>
);
};

export default RND;
