import React, { useState, useCallback } from "react";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const BMICalculator = () => {
  const [formData, setFormData] = useState({
    height: "",
    weight: "",
    gender: "",
  });
  const [bmi, setBmi] = useState("");

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }, []);

  const calculateBMI = useCallback((e) => {
    e.preventDefault();
    const { height, weight, gender } = formData;

    if (!height || !weight || !gender) {
      toast.error("Please enter valid height, weight and gender.");
      return;
    }

    const heightInMeters = height / 100;
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);
    setBmi(bmiValue);

    const bmiMessages = {
      underweight: "You are underweight. Consider seeking advice from a healthcare provider.",
      normal: "You have normal weight. Keep maintaining a healthy lifestyle.",
      overweight: "You are overweight. Consider seeking advice from a healthcare provider.",
      obese: "You are in the obese range. It is recommended to seek advice from a healthcare specialist.",
    };

    if (bmiValue < 18.5) {
      toast.warning(bmiMessages.underweight);
    } else if (bmiValue < 24.9) {
      toast.success(bmiMessages.normal);
    } else if (bmiValue < 29.9) {
      toast.warning(bmiMessages.overweight);
    } else {
      toast.error(bmiMessages.obese);
    }
  }, [formData]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="  bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="  max-w-7xl mx-auto">
        <motion.h1 variants={itemVariants} className="  text-4xl font-extrabold text-center mb-8 overflow-hidden text-white">BMI CALCULATOR</motion.h1>
        <div className="  grid grid-cols-1 md:grid-cols-2 gap-8 p-5">
          <motion.div variants={itemVariants} className="  bg-gray-800 rounded-lg shadow-lg p-8 ">
            <form onSubmit={calculateBMI} className="   overflow-hidden space-y-6">
              {["height", "weight"].map((field) => (
                <motion.div key={field} variants={itemVariants} className="  p-3">
                  <label className="  block text-sm font-medium mb-2 text-white">
                    {field.charAt(0).toUpperCase() + field.slice(1)} ({field === "height" ? "cm" : "kg"})
                  </label>
                  <input
                    type="number"
                    name={field}
                    value={formData[field]}
                    onChange={handleInputChange}
                    required
                    className="  w-full p-2 m-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </motion.div>
              ))}
              <motion.div variants={itemVariants} className="  p-3">
                <label className="  block text-sm font-medium mb-2 text-white">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="  w-full p-2 m-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </motion.div>
              <motion.button 
                variants={itemVariants}
                type="submit"
                className="  w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-md transition duration-300 mt-6 shadow-lg transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Calculate BMI
              </motion.button>
            </form>
          </motion.div>
          <motion.div variants={itemVariants} className="  flex items-center justify-center">
            <img src="/bmi.jpg" alt="BMI Illustration" className="  rounded-lg shadow-lg max-w-full h-auto" />
          </motion.div>
        </div>
        {bmi && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="  mt-8 text-center"
          >
            <h2 className="  text-2xl font-bold mb-4 text-white">Your BMI Result</h2>
            <p className="  text-4xl font-extrabold text-blue-500">{bmi}</p>
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default BMICalculator;