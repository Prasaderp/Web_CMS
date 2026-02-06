import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "./IMAGES/aigenthix.webp";
import {
  NAV_PRODUCTS,
  NAV_SERVICES,
  NAV_INDUSTRIES,
  NAV_COMPANY_MORE,
  NAV_ACCOUNT,
} from "../lib/constants";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (menu) => {
    setActiveDropdown(activeDropdown === menu ? null : menu);
  };

  const linkClasses =
    "text-[#1a1a1a] hover:text-[#2D4DE8] py-3 text-base font-semibold uppercase transition duration-300";

  const dropdownAnimation =
    "absolute top-[70px] bg-white rounded-lg shadow-xl border border-gray-100 z-10 transition-all duration-300 transform";

  const dropdownVisible = "opacity-100 translate-y-0 scale-100 pointer-events-auto";
  const dropdownHidden = "opacity-0 -translate-y-2 scale-95 pointer-events-none";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex justify-between items-center h-[85px]">
          {/* ===== Logo ===== */}
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link
              to="/"
              className="flex items-center transform hover:translate-y-1 transition duration-300"
            >
              <img src={logoImg} alt="AiGENThix logo" className="h-12 sm:h-14 w-auto object-contain" />
            </Link>

            {/* ===== Mobile Toggle ===== */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-md text-[#1a1a1a] hover:text-[#2D4DE8] focus:outline-none"
            >
              {isOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* ===== Desktop Menu ===== */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              {/* PRODUCTS Dropdown */}
              <div
                className="relative h-[85px] flex items-center"
                onMouseEnter={() => toggleDropdown("products")}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <Link to="/products" className={`${linkClasses} flex items-center`}>
                  PRODUCTS
                  <svg
                    className={`ml-1 h-3 w-3 transition-transform duration-300 ${
                      activeDropdown === "products" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                <div
                  className={`${dropdownAnimation} left-0 w-64 ${
                    activeDropdown === "products" ? dropdownVisible : dropdownHidden
                  }`}
                >
                  {NAV_PRODUCTS.map((item) => (
                    <Link
                      key={item.title}
                      to={item.to}
                      className="block px-6 py-3 text-sm font-semibold text-[#1a1a1a] hover:bg-blue-50 hover:text-[#2D4DE8] uppercase flex items-center justify-between group"
                    >
                      {item.title}
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* SERVICES Dropdown */}
              <div
                className="relative h-[85px] flex items-center"
                onMouseEnter={() => toggleDropdown("services")}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <Link to="/services" className={`${linkClasses} flex items-center`}>
                  SERVICES
                  <svg
                    className={`ml-1 h-3 w-3 transition-transform duration-300 ${
                      activeDropdown === "services" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                <div
                  className={`${dropdownAnimation} left-0 w-80 ${
                    activeDropdown === "services" ? dropdownVisible : dropdownHidden
                  }`}
                >
                  {NAV_SERVICES.map((item) => (
                    <Link
                      key={item.title}
                      to={item.to}
                      className="block px-6 py-3 text-sm font-semibold text-[#1a1a1a] hover:bg-blue-50 hover:text-[#2D4DE8] uppercase flex items-center justify-between group"
                    >
                      {item.title}
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* INDUSTRIES Dropdown */}
              <div
                className="relative h-[85px] flex items-center"
                onMouseEnter={() => toggleDropdown("industries")}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <Link to="/industries" className={`${linkClasses} flex items-center`}>
                  INDUSTRIES
                  <svg
                    className={`ml-1 h-3 w-3 transition-transform duration-300 ${
                      activeDropdown === "industries" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </Link>

                <div
                  className={`${dropdownAnimation} left-0 w-72 ${
                    activeDropdown === "industries" ? dropdownVisible : dropdownHidden
                  }`}
                >
                  {NAV_INDUSTRIES.map((item) => (
                    <Link
                      key={item.title}
                      to={item.to}
                      className="block px-6 py-3 text-sm font-semibold text-[#1a1a1a] hover:bg-blue-50 hover:text-[#2D4DE8] uppercase flex items-center justify-between group"
                    >
                      {item.title}
                      <svg
                        className="w-4 h-4 opacity-0 group-hover:opacity-100 transition duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Static Links */}
              <Link to="/l&d" className={linkClasses}>
                L&D
              </Link>
              <Link to="/rd" className={linkClasses}>
                R&D
              </Link>
              <Link to="/about" className={linkClasses}>
                ABOUT
              </Link>

              {/* MORE Dropdown */}
              <div
                className="relative h-[85px] flex items-center"
                onMouseEnter={() => toggleDropdown("more")}
                onMouseLeave={() => toggleDropdown(null)}
              >
                <button className={`${linkClasses} flex items-center`}>
                  MORE
                  <svg
                    className={`ml-1 h-3 w-3 transition-transform duration-300 ${
                      activeDropdown === "more" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                <div
                  className={`${dropdownAnimation} left-1/2 -translate-x-1/2 w-60 ${
                    activeDropdown === "more" ? dropdownVisible : dropdownHidden
                  }`}
                >
                  {NAV_COMPANY_MORE.map((item, index) => (
                    <React.Fragment key={item.title}>
                      <Link
                        to={item.to}
                        className="block px-4 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-gray-50 uppercase"
                      >
                        {item.title}
                      </Link>
                      {index !== NAV_COMPANY_MORE.length - 1 && <hr className="my-0 border-gray-200" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* ACCOUNT Dropdown */}
              <div className="relative h-[85px] flex items-center ml-4">
                <button
                  onClick={() => toggleDropdown("account")}
                  className="text-[#1a1a1a] hover:text-[#2D4DE8] transition duration-200 p-2 rounded-full"
                  aria-label="Account Menu"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </button>

                <div
                  className={`${dropdownAnimation} right-0 w-60 ${
                    activeDropdown === "account" ? dropdownVisible : dropdownHidden
                  }`}
                >
                  {NAV_ACCOUNT.map((item, index) => (
                    <React.Fragment key={item.title}>
                      <Link
                        to={item.to}
                        className="block px-4 py-3 text-sm font-bold text-[#1a1a1a] hover:bg-gray-50 uppercase"
                      >
                        {item.title}
                      </Link>
                      {index !== NAV_ACCOUNT.length - 1 && <hr className="my-0 border-gray-200" />}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Mobile Menu ===== */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="flex flex-col space-y-2 p-4">
            <Link to="/products" className={linkClasses} onClick={() => setIsOpen(false)}>
              PRODUCTS
            </Link>
            <Link to="/services" className={linkClasses} onClick={() => setIsOpen(false)}>
              SERVICES
            </Link>
            <Link to="/industries" className={linkClasses} onClick={() => setIsOpen(false)}>
              INDUSTRIES
            </Link>
            <Link to="/l&d" className={linkClasses} onClick={() => setIsOpen(false)}>
              L&D
            </Link>
            <Link to="/rd" className={linkClasses} onClick={() => setIsOpen(false)}>
              R&D
            </Link>
            <Link to="/about" className={linkClasses} onClick={() => setIsOpen(false)}>
              ABOUT
            </Link>
            <Link to="/principles" className={linkClasses} onClick={() => setIsOpen(false)}>
              OUR CORE PRINCIPLES
            </Link>
            <Link to="/team" className={linkClasses} onClick={() => setIsOpen(false)}>
              OUR TEAM
            </Link>
            <Link to="/contact" className={linkClasses} onClick={() => setIsOpen(false)}>
              CONTACT US
            </Link>
            <Link to="/blog" className={linkClasses} onClick={() => setIsOpen(false)}>
              BLOG
            </Link>
            <hr className="border-gray-200" />
            <Link to="/sign-in" className={linkClasses} onClick={() => setIsOpen(false)}>
              SIGN IN
            </Link>
            <Link to="/create-account" className={linkClasses} onClick={() => setIsOpen(false)}>
              CREATE ACCOUNT
            </Link>
            <Link to="/my-account" className={linkClasses} onClick={() => setIsOpen(false)}>
              MY ACCOUNT
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
