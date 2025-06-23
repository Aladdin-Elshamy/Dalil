import React, { useState, useRef, useEffect } from "react";
import { Bell, User, ShoppingCart, X, ArrowUp } from "lucide-react";
import logo from "../assets/logo.png";
import vector from "../assets/vector.png";
import { NavLink, useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";
const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shopDropdown, setShopDropdown] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const shopRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  // Debug menuOpen state changes
  useEffect(() => {
    console.log("menuOpen state changed to:", menuOpen);
  }, [menuOpen]);

  const openMenu = () => {
    console.log("Attempting to open menu, current state:", menuOpen);
    setMenuOpen(true);
    console.log("Menu should now be open");
    setShopDropdown(false);
    setServicesDropdown(false);
  };
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    console.log("hi");

    if (token) {
      console.log("hy");

      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const closeMenu = () => {
    console.log("Attempting to close menu, current state:", menuOpen);
    setMenuOpen(false);
    console.log("Menu should now be closed");
    setShopDropdown(false);
    setServicesDropdown(false);
  };

  // Handle scroll to top button visibility and close mobile menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Only log if menuOpen is true and about to be changed by scroll
      if (menuOpen) {
        console.log(
          "%chandleScroll: setting menuOpen to false (was true).",
          "color: red;"
        );
      }
      setMenuOpen(false);
      setShopDropdown(false);
      setServicesDropdown(false);

      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen]);

  // Close menu or dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Don't close if clicking the menu button or its children
      const target = event.target as HTMLElement;
      if (target.closest("button")) return;

      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        if (menuOpen) {
          console.log(
            "%chandleClickOutside: setting menuOpen to false (was true).",
            "color: purple;"
          );
        }
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      <nav
        className="bg-gray-50 shadow-md py-4 pt-4 sticky top-0 z-50"
        dir="rtl"
      >
        <div className="container mx-auto px-4 flex justify-between items-center flex-row-reverse lg:flex-row-reverse">
          {/* Mobile/Tablet: Burger Menu & Logo (switch sides) */}
          <div className="flex w-full justify-between items-center lg:hidden flex-row">
            {/* Burger Icon on right */}
            <button
              className="block lg:hidden focus:outline-none relative w-6 h-6 transition-all duration-300"
              onClick={() => (menuOpen ? closeMenu() : openMenu())}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              <div className="absolute right-1/2 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-full pr-3">
                <div
                  className={`w-5 h-1 bg-blue-600 rounded-full transition-transform duration-300 ease-in-out `}
                />
                <div
                  className={`w-8 h-1 bg-blue-600 rounded-full transition-opacity duration-300 ease-in-out mt-1.5 `}
                />
                <div
                  className={`w-5 h-1 bg-blue-600 rounded-full transition-transform duration-300 ease-in-out mt-1.5 `}
                />
              </div>
            </button>
            {/* Logo on left */}
            <div className="flex items-center">
              <img src={logo} alt="DALIL Logo" className="h-14 w-auto" />
            </div>
          </div>

          {/* Desktop: Logo on right */}
          <div className="hidden lg:flex items-center order-1 lg:order-3">
            <img src={logo} alt="DALIL Logo" className="h-14 w-auto" />
          </div>

          {/* Desktop: Navigation */}
          <div className="hidden lg:flex items-center gap-8 text-xl font-medium whitespace-nowrap max-w-full order-2 relative">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                  : "text-gray-700 hover:text-blue-700 pb-1"
              }
            >
              الرئيسية
            </NavLink>
            {/* الخدمات Dropdown */}
            <div className="relative" ref={servicesRef}>
              <button
                className={
                  (servicesDropdown
                    ? "text-blue-700 "
                    : "text-gray-700 hover:text-blue-700 ") +
                  "pb-1 flex items-center gap-1 focus:outline-none"
                }
                onClick={() => {
                  setServicesDropdown(!servicesDropdown);
                  setShopDropdown(false); // Close shop dropdown when opening services
                }}
                type="button"
              >
                الخدمات
                <svg
                  className="w-4 h-4 mt-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {servicesDropdown && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white rounded shadow-lg z-[9999] border divide-y divide-gray-200"
                  style={{ minWidth: "200px" }}
                >
                  <NavLink
                    to="/Location"
                    className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                    onClick={() => setServicesDropdown(false)}
                  >
                    الخريطة
                  </NavLink>
                  <NavLink
                    to="/TTS"
                    className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                    onClick={() => setServicesDropdown(false)}
                  >
                    تحويل نص الى صوت
                  </NavLink>
                  <NavLink
                    to="/STT"
                    className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                    onClick={() => setServicesDropdown(false)}
                  >
                    تحويل صوت الى نص
                  </NavLink>
                  <NavLink
                    to="/ObjectRecognition"
                    className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                    onClick={() => setServicesDropdown(false)}
                  >
                    التعرف على الاشياء
                  </NavLink>
                  <NavLink
                    to="/TranslateSign"
                    className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                    onClick={() => setServicesDropdown(false)}
                  >
                    ترجمة لغة الاشاره
                  </NavLink>
                  <NavLink
                    to="/SignLanguage"
                    className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                    onClick={() => setServicesDropdown(false)}
                  >
                    تعلم لغة الاشاره
                  </NavLink>
                </div>
              )}
            </div>
            {/* Shop Dropdown */}
            <div className="relative" ref={shopRef}>
              <button
                className={
                  (shopDropdown
                    ? "text-blue-700 "
                    : "text-gray-700 hover:text-blue-700 ") +
                  "pb-1 flex items-center gap-1 focus:outline-none"
                }
                onClick={() => {
                  setShopDropdown(!shopDropdown);
                  setServicesDropdown(false); // Close services dropdown when opening shop
                }}
                type="button"
              >
                تسوق
                <svg
                  className="w-4 h-4 mt-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {shopDropdown && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-[9999] border divide-y divide-gray-200"
                  style={{ minWidth: "180px" }}
                >
                  <NavLink
                    to="/Shopping"
                    className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                    onClick={() => setShopDropdown(false)}
                  >
                    تسوق
                  </NavLink>
                  <NavLink
                    to="/Favourite"
                    className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                    onClick={() => setShopDropdown(false)}
                  >
                    مفضلات
                  </NavLink>
                  <NavLink
                    to="/Cart"
                    className="block px-6 py-3 hover:bg-blue-50 text-right text-base flex items-center gap-2"
                    onClick={() => setShopDropdown(false)}
                  >
                    <ShoppingCart size={18} /> عربة التسوق
                  </NavLink>
                </div>
              )}
            </div>
            {/* <NavLink
              to="/Contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-700 border-b-2 border-blue-700 pb-1"
                  : "text-gray-700 hover:text-blue-700 pb-1"
              }
            >
              تواصل معنا
            </NavLink> */}
          </div>

          {/* Desktop: Right Section - Icons and Login (on left in RTL) */}
          <div className="hidden lg:flex items-center gap-4 order-3 lg:order-1">
            <button
              onClick={() => {
                if (isLoggedIn) {
                  localStorage.removeItem("authToken");
                  window.location.reload();
                } else {
                  navigate("/Login");
                }
              }}
              className="bg-gradient-to-b from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md shadow hover:opacity-90 transition"
            >
              <p className="text-white font-medium">
                {isLoggedIn ? "تسجيل الخروج" : "تسجيل الدخول"}
              </p>
            </button>
            <NavLink to="/Alerts">
              <Bell
                size={28}
                className="text-blue-600 hover:text-blue-800 cursor-pointer border border-blue-600 rounded-full p-1"
              />
            </NavLink>
            <NavLink to="/Profile">
              <User
                size={28}
                className="text-blue-600 hover:text-blue-800 cursor-pointer border border-blue-600 rounded-full p-1"
              />
            </NavLink>
          </div>

          {/* Mobile/Tablet: Dropdown Menu */}
          {menuOpen && (
            <div
              ref={menuRef}
              className="absolute top-full right-0 left-0 z-40 bg-white shadow-lg rounded-b-xl py-6 px-6 flex flex-col gap-6 lg:hidden animate-fadeIn"
              style={{ maxHeight: "calc(100vh - 100%)" }}
            >
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 border-b-2 border-blue-700 pb-1 block"
                    : "text-gray-700 hover:text-blue-700 pb-1 block"
                }
                onClick={() => setMenuOpen(false)}
              >
                الرئيسية
              </NavLink>
              {/* الخدمات Dropdown for mobile */}
              <div className="relative" ref={servicesRef}>
                <button
                  className={
                    (servicesDropdown
                      ? "text-blue-700 "
                      : "text-gray-700 hover:text-blue-700 ") +
                    "pb-1 block w-full text-right flex items-center gap-1 focus:outline-none"
                  }
                  onClick={() => setServicesDropdown((open) => !open)}
                  type="button"
                >
                  الخدمات
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {servicesDropdown && (
                  <div className="mt-2 w-full bg-white rounded shadow-lg z-50 border divide-y divide-gray-200">
                    <NavLink
                      to="/Location"
                      className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                      onClick={() => {
                        setServicesDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      الخريطة
                    </NavLink>
                    <NavLink
                      to="/TTS"
                      className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                      onClick={() => {
                        setServicesDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      تحويل نص الى صوت
                    </NavLink>
                    <NavLink
                      to="/STT"
                      className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                      onClick={() => {
                        setServicesDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      تحويل صوت الى نص
                    </NavLink>
                    <NavLink
                      to="/ObjectRecognition"
                      className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                      onClick={() => {
                        setServicesDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      التعرف على الاشياء
                    </NavLink>
                    <NavLink
                      to="/TranslateSign"
                      className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                      onClick={() => {
                        setServicesDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      ترجمة لغة الاشاره
                    </NavLink>
                    <NavLink
                      to="/SignLanguage"
                      className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                      onClick={() => {
                        setServicesDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      تعلم لغة الاشاره
                    </NavLink>
                  </div>
                )}
              </div>
              {/* Shop Dropdown for mobile */}
              <div className="relative" ref={shopRef}>
                <button
                  className="text-gray-700 hover:text-blue-700 pb-1 block w-full text-right flex items-center gap-1 focus:outline-none"
                  onClick={() => setShopDropdown((open) => !open)}
                  type="button"
                >
                  تسوق
                  <svg
                    className="w-4 h-4 mt-1"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {shopDropdown && (
                  <div className="mt-2 w-full bg-white rounded shadow-lg z-50 border divide-y divide-gray-200">
                    <NavLink
                      to="/Shopping"
                      className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                      onClick={() => {
                        setShopDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      تسوق
                    </NavLink>
                    <NavLink
                      to="/Favourite"
                      className="block px-6 py-3 hover:bg-blue-50 text-right text-base"
                      onClick={() => {
                        setShopDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      مفضلات
                    </NavLink>
                    <NavLink
                      to="/Cart"
                      className="block px-6 py-3 hover:bg-blue-50 text-right text-base flex items-center gap-2"
                      onClick={() => {
                        setShopDropdown(false);
                        setMenuOpen(false);
                      }}
                    >
                      <ShoppingCart size={18} /> عربة التسوق
                    </NavLink>
                  </div>
                )}
              </div>
              {/* <NavLink
                to="/Contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-700 border-b-2 border-blue-700 pb-1 block"
                    : "text-gray-700 hover:text-blue-700 pb-1 block"
                }
                onClick={() => setMenuOpen(false)}
              >
                تواصل معنا
              </NavLink> */}
              <button
                onClick={() => {
                  if (isLoggedIn) {
                    localStorage.removeItem("authToken");
                    window.location.reload();
                  } else {
                    navigate("/Login");
                  }
                }}
                className="bg-gradient-to-b from-blue-600 to-blue-800 text-white px-4 py-2 rounded-md shadow hover:opacity-90 transition w-full"
              >
                <p className="text-white font-medium w-full block">
                  {isLoggedIn ? "تسجيل الخروج" : "تسجيل الدخول"}
                </p>
              </button>
              <div className="flex items-center gap-4 justify-center mt-2">
                <Bell
                  size={28}
                  className="text-blue-600 hover:text-blue-800 cursor-pointer border border-blue-600 rounded-full p-1"
                />
                <NavLink to="/Profile">
                  <User
                    size={28}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer border border-blue-600 rounded-full p-1"
                  />
                </NavLink>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
          aria-label="Scroll to top"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default Navbar;
