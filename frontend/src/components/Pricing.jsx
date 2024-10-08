import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Card from "./Card";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      index: 0,
      imgUrl: "/pricing.jpg",
      title: "QUARTERLY",
      price: 5000,
      length: 3,
      membershipType: "Quarterly",
      features: [
        "Access to all gym equipment",
        "3 personal training sessions",
        "Nutrition consultation",
        "Locker access",
        "Towel service",
        "1 guest pass per month",
        "Access to online workout videos",
      ],
    },
    {
      index: 2,
      imgUrl: "/pricing.jpg",
      title: "HALF-YEARLY",
      price: 10000,
      length: 6,
      membershipType: "Half-Yearly",
      features: [
        "Access to all gym equipment",
        "6 personal training sessions",
        "Nutrition consultation",
        "Access to group classes",
        "Locker access",
        "Towel service",
        "2 guest passes per month",
        "Access to online workout videos",
        "Sauna and steam room access",
        "25% discount on supplements",
      ],
    },
    {
      index: 3,
      imgUrl: "/pricing.jpg",
      title: "YEARLY",
      price: 20000,
      length: 12,
      membershipType: "Yearly",
      features: [
        "Access to all gym equipment",
        "12 personal training sessions",
        "Nutrition consultation",
        "Access to group classes",
        "Locker access",
        "Towel service",
        "Unlimited guest passes",
        "Access to online workout videos",
        "Sauna and steam room access",
        "50% discount on supplements",
        "Quarterly body composition analysis",
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const titleVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: 0.2,
      },
    },
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const onPayment = async (price, plan, membershipType) => {
    try {
      const options = {
        memberId: 1,
        paymentAmount: price,
        membershipType: membershipType,
      };

      const res = await axios.post('/api/payment', options);
      const data = res.data;

      console.log(data);

      const paymentObject = new window.Razorpay({
        key: process.env.RAZORPAY_KEY_ID,
        order_id: data.id,
        ...data, // spread the data 
        handler: function (response) {
          console.log(response);
          const option2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          };
          axios.post('/api/verify-payment', option2).then((res) => {
            console.log(res.data);
            if ((res.data).status === 200) {
              alert('Payment Successful');
            } else {
              alert('Payment Failed');
            }
          }).catch((error) => {
            console.log(error);
          });
        }
      });
      paymentObject.open();

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadScript('https://checkout.razorpay.com/v1/checkout.js');
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div variants={titleVariants} className="text-center">
          <h2 className="text-base font-semibold text-blue-700 uppercase tracking-wide">Pricing Model</h2>
          <p className="mt-1 text-4xl font-extrabold sm:text-5xl sm:tracking-tight lg:text-6xl overflow-hidden">
            Find Your <span className="text-blue-700">Perfect</span> Plan
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          className="mt-16 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-8 overflow-hidden"
        >
          {plans.map((plan) => (
            <Card 
              key={plan.index} 
              index={plan.index} 
              title={plan.title} 
              price={plan.price} 
              plan={plan.plan} 
              plans={plan}  
              membershipType={plan.membershipType}
              selectedPlan={selectedPlan} 
              setSelectedPlan={setSelectedPlan} 
              onPayment={onPayment} 
            />
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pricing;