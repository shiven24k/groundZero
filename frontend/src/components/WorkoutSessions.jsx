import React from "react";
import { motion } from "framer-motion";
import { FaDumbbell, FaBolt, FaBalanceScale } from "react-icons/fa";

const WorkoutSessions = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const bootcamps = [
    {
      title: "Total Body Transformation",
      description: "Comprehensive fitness journey combining cardio, strength, and flexibility training.",
      icon: <FaDumbbell />
    },
    {
      title: "Elite Performance Camp",
      description: "Advanced training program focusing on explosive power, endurance, and mental toughness.",
      icon: <FaBolt />
    },
    {
      title: "Mindful Strength & Conditioning",
      description: "Perfect balance of physical and mental wellness, integrating strength training with mindfulness.",
      icon: <FaBalanceScale />
    }
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-20">
      <div className="max-w-7xl mx-auto min-h-screen">
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-blue-500 overflow-hidden">Ultimate Workout Sessions</h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the pinnacle of fitness with our top-tier workout sessions and exclusive bootcamps.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl shadow-2xl"
          >
            <img src="/img5.jpg" alt="Intense workout session" className="object-cover w-full h-full" />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent flex items-end p-8">
              <p className="text-lg text-white">
                Experience the pinnacle of fitness with our top-tier workout sessions. Combining expert-designed warm-ups, 
                intense strength training, and exhilarating high-intensity interval training (HIIT), these sessions are 
                crafted to transform your body and elevate your performance.
              </p>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.h2 
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-3xl lg:text-4xl font-bold mb-6 text-blue-500"
            >
              Exclusive Bootcamps
            </motion.h2>
            
            {bootcamps.map((camp, index) => (
              <motion.div
                key={camp.title}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.2 }}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className="text-blue-500 text-3xl mr-4">{camp.icon}</div>
                  <h3 className="text-2xl font-semibold text-white">{camp.title}</h3>
                </div>
                <p className="text-gray-300">{camp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkoutSessions;