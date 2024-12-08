import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WorkoutSessions from "./components/WorkoutSessions";
import Gallery from "./components/Gallery";
import Pricing from "./components/Pricing";
import Contact from "./components/Contact";
import BMICalculator from "./components/BMICalculator";
import Footer from "./components/Footer";
import Login from './components/Login';
import UserPage from './components/UserPage';
import AuthPage from './components/AuthPage';

//added for the protected route
// const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem('token');
//   if (!token) {
//     return <Navigate to="/auth" replace />;
//   }
//   return children;
// };

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Hero />} />
      
        <Route path="/workouts" element={<WorkoutSessions />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bmi-calculator" element={<BMICalculator />} />
        <Route path="/dashboard" 
        element={
          // <ProtectedRoute>
             <UserPage />
          // </ProtectedRoute>
        } 
   />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
      <Footer />
      <ToastContainer theme="dark" position="top-center" />
    </Router>
  );
};

export default App;
