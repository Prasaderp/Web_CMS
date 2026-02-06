import React from "react";
import logoImg from "./IMAGES/aigenthix.webp";
import {
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { BRAND, SOCIAL_LINKS } from "../lib/constants";

const Footer = () => {
  return (
    <>
      {/* Gradient Divider */}
      <div className="w-full h-[2px] bg-gradient-to-r from-[#2D4DE8] to-transparent"></div>

      <footer className="bg-[#000A1A] text-white font-poppins relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-20 py-12">
          {/* Top Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 gap-6">
            <div className="flex items-center justify-center">
              <img
                src={logoImg}
                alt="AiGenthix Logo"
                className="w-44 h-22 object-contain filter brightness-0 invert contrast-100"
              />
            </div>
            <p className="text-gray-400 text-sm text-center sm:text-right max-w-lg leading-relaxed">
              Envisioning the future with ethical AI — building intelligent,
              secure, and scalable solutions for the world’s most innovative
              companies.
            </p>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            {/* COMPANY Column */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wide">
                Company
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Privacy Policy</a></li>
              </ul>
            </div>

            {/* SERVICES Column */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wide">
                Services
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Generative AI</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Artificial Intelligence & ML</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Data Engineering</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Web3</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Blockchain Development</a></li>
              </ul>
            </div>

            {/* PRODUCTS Column */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wide">
                Products
              </h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Sahyak AI</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Video Translation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">AI Interviewer</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">Project Management Tool</a></li>
                <li><a href="#" className="text-gray-400 hover:text-[#2D4DE8] text-sm">AI Receptionist</a></li>
              </ul>
            </div>

            {/* CONTACT Column */}
            <div>
              <h3 className="text-white font-bold text-sm uppercase mb-4 tracking-wide">
                Contact Us
              </h3>
              <div className="space-y-2">
                <p className="text-sm font-semibold text-white">{BRAND.NAME}</p>
                <p className="text-gray-400 text-sm">
                  {BRAND.ADDRESS_LINE}
                </p>
                <a
                  href={`mailto:${BRAND.PRIMARY_EMAIL}`}
                  className="text-[#2D4DE8] hover:text-[#1a39d1] text-sm block"
                >
                  {BRAND.PRIMARY_EMAIL}
                </a>
                <a
                  href={`mailto:${BRAND.SECONDARY_EMAIL}`}
                  className="text-[#2D4DE8] hover:text-[#1a39d1] text-sm block"
                >
                  {BRAND.SECONDARY_EMAIL}
                </a>
                <p className="text-gray-400 text-sm">{BRAND.PHONE}</p>
              </div>

              {/* Social Media Icons */}
              <div className="flex gap-4 mt-6">
                <a
                  href={SOCIAL_LINKS.TWITTER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-[#2D4DE8] p-2 rounded-full transition-all duration-300"
                >
                  <FaTwitter className="text-white text-lg" />
                </a>
                <a
                  href={SOCIAL_LINKS.LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-[#2D4DE8] p-2 rounded-full transition-all duration-300"
                >
                  <FaLinkedin className="text-white text-lg" />
                </a>
                <a
                  href={SOCIAL_LINKS.INSTAGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gray-800 hover:bg-[#2D4DE8] p-2 rounded-full transition-all duration-300"
                >
                  <FaInstagram className="text-white text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-700 pt-6 text-center">
            <p className="text-gray-400 text-sm">
              © 2025 AiGenthix. All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-8 bg-[#2D4DE8] hover:bg-[#1a39d1] text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 z-40"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 15l7-7 7 7"
            ></path>
          </svg>
        </button>
      </footer>
    </>
  );
};

export default Footer;
