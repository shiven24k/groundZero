import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../../public/img4.jpg';
import { FcGoogle } from 'react-icons/fc';
import { motion } from 'framer-motion';
import api from '../utils/api';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
      const response = await api.post(endpoint, formData);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Authentication error:', error.response?.data || error.message);
      
      // Improved error handling
      if (error.response) {
        // Server responded with a status other than 2xx
        setError(error.response.data?.msg || error.response.data?.error || 'An error occurred');
      } else if (error.request) {
        // Request was made but no response was received
        setError('No response received from server');
      } else {
        // Something happened in setting up the request
        setError('Error in setting up request: ' + error.message);
      }
    }
  };
  const handleGoogleSignIn = () => {
    // Implement Google Sign-In logic here
    console.log('Google Sign-In');
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring',
        stiffness: 100,
        damping: 15,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gray-900"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <motion.div 
        className="bg-gray-800 bg-opacity-90 p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-lg"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-6 text-center text-white">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </motion.h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <motion.div variants={itemVariants}>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                value={formData.name}
                onChange={handleChange}
                required={!isLogin}
              />
            </motion.div>
          )}
          <motion.div variants={itemVariants}>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </motion.div>
          <motion.button
            variants={itemVariants}
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </motion.button>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
        </form>
        <motion.div variants={itemVariants} className="mt-6 flex items-center justify-between">
          <hr className="w-full border-gray-600" />
          <span className="px-2 text-gray-400 text-sm">OR</span>
          <hr className="w-full border-gray-600" />
        </motion.div>
        <motion.button
          variants={itemVariants}
          onClick={handleGoogleSignIn}
          className="w-full mt-6 bg-white text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center justify-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
        >
          <FcGoogle className="mr-2" size={24} />
          Continue with Google
        </motion.button>
        <motion.div variants={itemVariants} className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-blue-400 hover:text-blue-500 transition duration-300 ease-in-out"
          >
            {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default AuthPage;