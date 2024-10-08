import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ArrowRight, Dumbbell } from 'lucide-react';
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion';

// Import local images
import image1 from '../../public/img2.jpg';
import image2 from '../../public/img3.jpg';
import image3 from '../../public/img4.jpg';
import image4 from '../../public/img5.jpg';
import image5 from '../../public/img6.jpg';
import image6 from '../../public/img7.jpg';
import image7 from '../../public/img8.jpg';
import image8 from '../../public/img7.jpg';
import image9 from '../../public/img1.webp';

const Hero = () => {
  const [images, setImages] = useState([])
  const [positions, setPositions] = useState([])
  const [isScrolled, setIsScrolled] = useState(false)
  const imageContainerRef = useRef(null)

  useEffect(() => {
    const localImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9];
    setImages(localImages)
    setPositions(generatePositions(localImages.length))

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const generatePositions = (count) => {
    return Array.from({ length: count }, () => ({
      top: Math.random() * 80 + 10, // 10-90%
      left: Math.random() * 80 + 10, // 10-90%
      rotate: Math.random() * 30 - 15, // -15 to 15 degrees
    }))
  }

  const shuffleImages = useCallback(() => {
    setPositions(generatePositions(images.length))
  }, [images.length])

  useEffect(() => {
    const handleClick = () => {
      if (!isScrolled) {
        shuffleImages();
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [shuffleImages, isScrolled]);

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
    <motion.section
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 md:pt-32"
    >
      {/* Animated background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 overflow-hidden"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="absolute w-72 h-72 bg-purple-500 rounded-full blur-3xl opacity-20 -top-10 -left-10 animate-pulse"
        ></motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20 top-1/2 -right-20 animate-pulse delay-1000"
        ></motion.div>
      </motion.div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto h-full flex flex-col justify-center items-start px-6 lg:px-8">
        <motion.div variants={containerVariants} className="space-y-8 overflow-hidden">
          {/* Title */}
          <motion.div variants={itemVariants} className="space-y-2 overflow-hidden">
            {['LET\'S', 'GET', 'MOVING'].map((word, index) => (
              <motion.h1 
                key={index}
                variants={itemVariants}
                className="text-6xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500 overflow-hidden"
              >
                {word}
              </motion.h1>
            ))}
          </motion.div>
          
          {/* Subtitle */}
          <motion.div variants={itemVariants} className="space-y-2 overflow-hidden">
            {[
              'Your Journey to Fitness Starts Here',
              'Unleash Your Potential'
            ].map((text, index) => (
              <motion.p 
                key={index}
                variants={itemVariants}
                className="text-xl lg:text-2xl text-gray-400"
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
          
          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 overflow-hidden p-2">
            <motion.button
              
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 pointer py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-semibold text-lg transition-transform flex items-center group"
            > 
              <Link to="/login">
              Start Your Journey
              </Link>
              
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </motion.button>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="./pricing" className="px-8 py-4 border-2 border-gray-500 text-white rounded-full font-semibold text-lg transition-all hover:border-purple-500 hover:text-purple-500 flex items-center group">
                Discover Your Plan
                <Dumbbell className="ml-2 transition-transform group-hover:animate-spin" />
              </Link>
            </motion.div>
          </motion.div>

          {/* Image container */}
          <motion.div 
            ref={imageContainerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: isScrolled ? 1 : 0 }}
            transition={{ duration: 1 }}
            className="w-full mt-8 overflow-hidden"
          >
            <div className="flex flex-wrap justify-center items-center gap-2 md:m-10">
              {images.map((src, index) => (
                <motion.img
                  key={index}
                  src={src}
                  alt={`Collage image ${index + 1}`}
                  initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                  animate={{ 
                    opacity: isScrolled ? 1 : 0, 
                    scale: isScrolled ? 1 : 0.8,
                    rotate: isScrolled ? 0 : positions[index]?.rotate ?? 0
                  }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="w-[150px] h-[112.5px] rounded-md shadow-md"
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Optional decorative elements */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"
      ></motion.div>
      
      {/* Image collage */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {images.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Collage image ${index + 1}`}
            className="absolute transition-all duration-1000 ease-in-out"
            style={{
              width: '150px',
              height: '112.5px',
              borderRadius: '4px',
              boxShadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
              top: isScrolled ? '-100%' : `${positions[index]?.top ?? 0}%`,
              left: `${positions[index]?.left ?? 0}%`,
              transform: `translate(-50%, -50%) rotate(${positions[index]?.rotate ?? 0}deg)`,
              opacity: isScrolled ? 0 : 1,
              transitionDelay: `${index * 100}ms`,
            }}
          />
        ))}
      </div>
    </motion.section>
  );
};

export default Hero;