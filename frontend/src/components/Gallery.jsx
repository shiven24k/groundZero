import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const gallery = [
    { src: "/img1.webp", description: "High-intensity cardio workout" },
    { src: "/img2.jpg", description: "Strength training with weights" },
    { src: "/img3.jpg", description: "Yoga and flexibility exercises" },
    { src: "/img4.jpg", description: "Group fitness class" },
    { src: "/img7.jpg", description: "Personal training session" },
    { src: "/img8.jpg", description: "CrossFit workout" },
    { src: "/img5.jpg", description: "Boxing and martial arts" },
    { src: "/img6.jpg", description: "Functional fitness training" },
  ];

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
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
    <section className=" bg-gradient-to-br from-gray-900 via-gray-800 to-black px-4 py-24">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-bold mb-8 text-center text-blue-700"
      >
        GYM WORKOUT
      </motion.h1>
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4 overflow-hidden"
        >
          {gallery.map((image, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl break-inside-avoid"
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image.src}
                alt={`galleryImage-${index}`}
                className="w-full object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <span className="text-white text-sm font-semibold">View</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-75 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={handleCloseImage}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="max-w-4xl max-h-full p-4"
          >
            <img
              src={selectedImage.src}
              alt="Selected Image"
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 text-lg">
              {selectedImage.description}
            </p>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Gallery;