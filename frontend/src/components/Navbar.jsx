import React, { useState, useEffect } from 'react';
import { Facebook, Instagram, Twitter, Menu, X, Phone, Mail } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('/');
  const location = useLocation();

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);

  const menuItems = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "./workouts", label: "Workouts" },
    { to: "/pricing", label: "Pricing" },
    { to: "/bmi-calculator", label: "BMI Calculator" },
    { to: "/contact", label: "Contact" },
    { to: "/auth", label: "Register" },
  ];

  return (
    <nav className="fixed left-0 right-0 bg-black bg-opacity-80 text-white z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <a href="/" className="text-2xl font-bold">GroundZero</a>
          <div className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`transition ${activeLink === item.to ? 'text-blue-400' : 'hover:text-blue-400'}`}
              >
                {item.label}
              </Link>
            ))}
          </div>
          <button 
            className="md:hidden focus:outline-none" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 flex flex-col items-center">
            {menuItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`transition ${activeLink === item.to ? 'text-blue-400' : 'hover:text-blue-400'}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;