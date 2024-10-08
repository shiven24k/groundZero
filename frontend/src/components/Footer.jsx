import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className='text-left'>
            <h3 className="text-2xl font-bold mb-4">FitnessPro</h3>
            <p className="mb-4 text-lg text-left w-1/2">Empowering you to reach your fitness goals and live a healthier life.</p>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-blue-400 transition"><Facebook /></a>
              <a href="#" aria-label="Instagram" className="hover:text-blue-400 transition"><Instagram /></a>
              <a href="#" aria-label="Twitter" className="hover:text-blue-400 transition"><Twitter /></a>
            </div>
          </div>
          <div className='text-left'>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 flex flex-col text-lg ">
            <Link to="/gallery" className="hover:text-blue-400 transition">Gallery</Link>
            <Link to="./workouts" className="hover:text-blue-400 transition">Workouts</Link>
            <Link to="/pricing" className="hover:text-blue-400 transition">Pricing</Link>
            <Link to="/bmi-calculator" className="hover:text-blue-400 transition">BMI Calculator</Link>
            <Link to="/contact" className="hover:text-blue-400 transition">Contact</Link>
            </ul>
          </div>
          <div>
            <h4 className="text-xl font-semibold mb-4">Location</h4>
            <div className="w-full h-48 rounded-lg overflow-hidden shadow-lg border-4 border-blue-400 hover:border-blue-500 transition">
              <iframe
                title="FitnessPro Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109744.05905905749!2d76.68831178554085!3d30.732401983460996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed0be66ec96b%3A0xa5ff67f9527319fe!2sChandigarh%2C%20India!5e0!3m2!1sen!2sus!4v1728031791099!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
          {/* <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition">Personal Training</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Group Classes</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Nutrition Planning</a></li>
              <li><a href="#" className="hover:text-blue-400 transition">Online Coaching</a></li>
            </ul>
          </div> */}
          <div className='text-left'>
            <h4 className="text-xl font-semibold mb-4">Contact Us</h4>
            <p className="mb-2 text-lg">123 Fitness Street</p>
            <p className="mb-2 text-lg">Healthy City, HC 12345</p>
            <p className="mb-2 text-lg">Phone: (123) 456-7890</p>
            <p className="text-lg">Email: info@fitnesspro.com</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 FitnessPro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;