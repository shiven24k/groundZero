import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Card = ({ index, title, price, plan, plans, membershipType, onPayment }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={`relative p-8 rounded-2xl shadow-lg cursor-pointer transition-all duration-300 flex flex-col overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        height: '750px', 
        backgroundColor: isHovered ? '#1d4ed8' : '#1f2937',
        position: 'relative',
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="absolute inset-x-0 h-3 -top-3 transform-gpu -skew-y-6"></div>
      <div className="text-center mb-4 relative z-10">
        <h3 className="text-3xl font-bold">{title}</h3>
        <p className="mt-2 text-5xl font-extrabold overflow-hidden">
          Rs {price}
          <span className="text-xl font-medium">/ {plan && plan.length} months</span>
        </p>
        <p className="mt-2 text-xl font-medium">
          Membership Type: {membershipType}
        </p>
      </div>
      <ul className="mt-4 space-y-4 text-left relative z-10 flex-grow">
        {plans.features.map((feature, featureIndex) => (
          <li key={featureIndex} className="flex items-start">
            <div className="flex-shrink-0">
              <Check className="h-6 w-6 text-blue-400" />
            </div>
            <p className="ml-3 text-base">{feature}</p>
          </li>
        ))}
      </ul>
      
      <motion.button 
        className="absolute bottom-0 left-0 right-0 flex items-center justify-center transition-colors duration-300" 
        style={{
          height: '15%',
          clipPath: 'polygon(0 60%, 100% 0, 100% 100%, 0% 100%)',
          backgroundColor: isHovered ? 'white' : '#1d4ed8',
          color: isHovered ? '#1d4ed8' : 'white',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={(e) => {
          e.stopPropagation(); // Prevent triggering the parent onClick
          onPayment(plans.price, title, membershipType);
        }}
      >
        <span className="text-xl font-bold z-10 rotate-[-10deg]">Add to Cart</span>
      </motion.button>
    </motion.div>
  );
};

export default Card;