import React, { useEffect, useState } from 'react';
import { CalendarDays, Clock, CreditCard, Dumbbell } from 'lucide-react';
import { Loader2 } from 'lucide-react';

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user data first
        const userResponse = await fetch('/api/user');
        if (!userResponse.ok) {
          throw new Error('Failed to fetch user data');
        }
        const user = await userResponse.json();
        setUserData(user);

        // Then fetch subscription data using the user ID
        const subscriptionResponse = await fetch(`/api/subscriptions/${user.id}`);
        if (!subscriptionResponse.ok) {
          throw new Error('Failed to fetch subscription data');
        }
        const subscription = await subscriptionResponse.json();
        setSubscriptionData(subscription);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load user or subscription data. Please try again later.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!userData || !subscriptionData) {
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <Loader2 className="w-16 h-16 text-blue-500 animate-spin mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Loading your dashboard</h2>
        <p className="text-gray-500">Please wait while we fetch your data...</p>
      </div>
    </div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {userData.name}</h1>
      <h2 className="text-xl font-semibold mb-4">Subscription Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <CreditCard className="mr-2" />
            <h2 className="text-lg font-semibold">Plan</h2>
          </div>
          <p>{subscriptionData.plan}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <CalendarDays className="mr-2" />
            <h2 className="text-lg font-semibold">Next Billing Date</h2>
          </div>
          <p>{new Date(subscriptionData.nextBillingDate).toLocaleDateString()}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <Clock className="mr-2" />
            <h2 className="text-lg font-semibold">Remaining Days</h2>
          </div>
          <p>{subscriptionData.remainingDays} days</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <Dumbbell className="mr-2" />
            <h2 className="text-lg font-semibold">Gym Visits This Month</h2>
          </div>
          <p>{subscriptionData.gymVisitsThisMonth}</p>
        </div>
      </div>
    </div>
  );
}