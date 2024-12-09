import React from 'react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import { Search, Bell, CalendarDays, CreditCard, Dumbbell, TrendingUp } from 'lucide-react'

const monthlyData = [
  { month: 'Jan', budget: 1800, actual: 2000 },
  { month: 'Feb', budget: 2000, actual: 1900 },
  { month: 'Mar', budget: 2200, actual: 1800 },
  { month: 'Apr', budget: 5000, actual: 2000 },
  { month: 'May', budget: 4000, actual: 1700 },
  { month: 'Jun', budget: 1800, actual: 1800 },
  { month: 'Jul', budget: 1500, actual: 1300 },
  { month: 'Aug', budget: 1500, actual: 2500 },
  { month: 'Sep', budget: 1500, actual: 2300 },
  { month: 'Oct', budget: 2000, actual: 2000 },
  { month: 'Nov', budget: 2000, actual: 1900 },
  { month: 'Dec', budget: 1500, actual: 2000 },
]

const weeklyData = [
  { day: 'Mon', spend: 1500 },
  { day: 'Tue', spend: 2000 },
  { day: 'Wed', spend: 2200 },
  { day: 'Thu', spend: 1800 },
  { day: 'Fri', spend: 2356 },
  { day: 'Sat', spend: 1900 },
  { day: 'Sun', spend: 1700 },
]

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b pt-20 from-gray-900 to-gray-800 text-white py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Responsive Layout */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-2xl sm:text-3xl font-semibold text-center sm:text-left w-full sm:w-auto">
            Welcome, Fitness Enthusiast!
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="w-full sm:w-auto pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto">
              <Bell className="text-gray-400 hover:text-purple-400 cursor-pointer mr-4 sm:mr-0" />
              <div className="flex items-center gap-2">
                <div className="w-8 ml-5 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                  U
                </div>
                <span className="hidden sm:inline">User</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grid Layout - Responsive Columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column - Full width on mobile, 8 columns on larger screens */}
          <div className="md:col-span-8 space-y-6">
            {/* Total Active Cost Card - Responsive */}
            <div className="bg-gray-800 rounded-lg shadow-lg">
              <div className="px-4 sm:px-6 py-4">
                <div className="text-sm text-gray-400">Total Active Cost</div>
                <div className="text-2xl sm:text-3xl font-bold mt-1 text-purple-400">Rs 22,729</div>
                <div className="text-sm text-gray-400 mt-1">**** 1234</div>
              </div>
            </div>

            {/* Quick Stats - Responsive Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-gray-800 rounded-lg shadow-lg">
                <div className="px-4 sm:px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Active Subscriptions</div>
                      <div className="text-xl sm:text-2xl font-bold mt-1 text-purple-400">11</div>
                    </div>
                    <CreditCard className="text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-lg">
                <div className="px-4 sm:px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Upcoming Renewals</div>
                      <div className="text-xl sm:text-2xl font-bold mt-1 text-purple-400">Rs 5,580</div>
                    </div>
                    <CalendarDays className="text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-lg">
                <div className="px-4 sm:px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Recently Concluded</div>
                      <div className="text-xl sm:text-2xl font-bold mt-1 text-purple-400">5</div>
                    </div>
                    <Dumbbell className="text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Budget vs Actual Report - Responsive */}
            <div className="bg-gray-800 rounded-lg shadow-lg">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0">
                  <h2 className="text-base sm:text-lg font-semibold text-center sm:text-left w-full sm:w-auto">
                    Budget vs Actual Report
                  </h2>
                  <select className="w-full sm:w-auto bg-gray-700 text-white border border-gray-600 rounded p-1 text-sm">
                    <option>Monthly</option>
                  </select>
                </div>
              </div>
              <div className="px-4 sm:px-6 py-4">
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={monthlyData}>
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Line type="monotone" dataKey="budget" stroke="#AED75C" />
                      <Line type="monotone" dataKey="actual" stroke="#8B5CF6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Full width on mobile, 4 columns on larger screens */}
          <div className="md:col-span-4 space-y-6">
            {/* Usage Analysis - Responsive */}
            <div className="bg-gray-800 rounded-lg shadow-lg">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
                <div className="relative pt-1">
                  <div className="flex mb-2 items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-purple-600 bg-purple-200">
                        Usage Analysis
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-semibold inline-block text-purple-600">
                        75%
                      </span>
                    </div>
                  </div>
                  <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-200">
                    <div style={{ width: "75%" }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-500"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weekly Spend Trend - Responsive */}
            <div className="bg-gray-800 rounded-lg shadow-lg">
              <div className="px-4 sm:px-6 py-4 border-b border-gray-700">
                <h2 className="text-base sm:text-lg font-semibold flex items-center">
                  <TrendingUp className="mr-2 text-purple-400 w-4 h-4 sm:w-5 sm:h-5" />
                  Weekly Spend Trend
                </h2>
              </div>
              <div className="px-4 sm:px-6 py-4">
                <div className="h-48 sm:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={weeklyData}>
                      <XAxis dataKey="day" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Line type="monotone" dataKey="spend" stroke="#8B5CF6" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Responsive */}
        <footer className="mt-6 sm:mt-12 text-center text-xs sm:text-sm text-gray-400">
          © 2024 GroundZero. All rights reserved.
        </footer>
      </div>
    </div>
  )
}