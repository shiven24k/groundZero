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
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white py-6 px-4 sm:px-6 lg:px-8 pt-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold">Welcome, Fitness Enthusiast!</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
              />
            </div>
            <Bell className="text-gray-400 hover:text-purple-400 cursor-pointer" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white">
                A
              </div>
              <span>Admin</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-8">
            <div className="bg-gray-800 rounded-lg shadow-lg mb-6">
              <div className="px-6 py-4">
                <div className="text-sm text-gray-400">Total Active Cost</div>
                <div className="text-3xl font-bold mt-1 text-purple-400">Rs 22,729</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-6">
              <div className="bg-gray-800 rounded-lg shadow-lg">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Active Subscriptions</div>
                      <div className="text-2xl font-bold mt-1 text-purple-400">11</div>
                    </div>
                    <CreditCard className="text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-lg">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Upcoming Renewals</div>
                      <div className="text-2xl font-bold mt-1 text-purple-400">Rs 5,580</div>
                    </div>
                    <CalendarDays className="text-purple-400" />
                  </div>
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg shadow-lg">
                <div className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-400">Recently Concluded</div>
                      <div className="text-2xl font-bold mt-1 text-purple-400">5</div>
                    </div>
                    <Dumbbell className="text-purple-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg shadow-lg">
              <div className="px-6 py-4 border-b border-gray-700">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Budget vs Actual Report</h2>
                  <select className="bg-gray-700 text-white border border-gray-600 rounded p-1">
                    <option>Monthly</option>
                  </select>
                </div>
              </div>
              <div className="px-6 py-4">
                <div className="h-64">
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

          <div className="col-span-4">
            <div className="mb-6 bg-gray-800 rounded-lg shadow-lg">
              <div className="px-6 py-4 border-b border-gray-700">
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

            <div className="bg-gray-800 rounded-lg shadow-lg">
              <div className="px-6 py-4 border-b border-gray-700">
                <h2 className="text-lg font-semibold flex items-center">
                  <TrendingUp className="mr-2 text-purple-400" />
                  Weekly Spend Trend
                </h2>
              </div>
              <div className="px-6 py-4">
                <div className="h-64">
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
      </div>
    </div>
  )
}