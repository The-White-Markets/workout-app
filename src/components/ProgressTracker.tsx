'use client'

import { useState } from 'react'
import { TrendingUp, BarChart3, CalendarDays } from 'lucide-react'

export default function ProgressTracker() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')

  const periods = [
    { id: 'week', label: 'This Week', days: 7 },
    { id: 'month', label: 'This Month', days: 30 },
    { id: 'quarter', label: 'This Quarter', days: 90 }
  ]

  // Mock data - in real app this would come from Supabase
  const mockWorkoutData = [
    { date: '2024-01-15', completed: true, exercises: 5, totalVolume: 1250 },
    { date: '2024-01-16', completed: false, exercises: 0, totalVolume: 0 },
    { date: '2024-01-17', completed: true, exercises: 6, totalVolume: 1400 },
    { date: '2024-01-18', completed: true, exercises: 4, totalVolume: 1100 },
    { date: '2024-01-19', completed: false, exercises: 0, totalVolume: 0 },
    { date: '2024-01-20', completed: true, exercises: 5, totalVolume: 1300 },
    { date: '2024-01-21', completed: false, exercises: 0, totalVolume: 0 }
  ]

  const mockNutritionData = [
    { date: '2024-01-15', calories: 2100, protein: 180 },
    { date: '2024-01-16', calories: 1950, protein: 165 },
    { date: '2024-01-17', calories: 2200, protein: 190 },
    { date: '2024-01-18', calories: 2050, protein: 175 },
    { date: '2024-01-19', calories: 2300, protein: 200 },
    { date: '2024-01-20', calories: 2150, protein: 185 },
    { date: '2024-01-21', calories: 2000, protein: 170 }
  ]

  const getWorkoutStreak = () => {
    let streak = 0
    for (let i = mockWorkoutData.length - 1; i >= 0; i--) {
      if (mockWorkoutData[i].completed) {
        streak++
      } else {
        break
      }
    }
    return streak
  }

  const getAverageCalories = () => {
    const total = mockNutritionData.reduce((sum, day) => sum + day.calories, 0)
    return Math.round(total / mockNutritionData.length)
  }

  const getAverageProtein = () => {
    const total = mockNutritionData.reduce((sum, day) => sum + day.protein, 0)
    return Math.round(total / mockNutritionData.length)
  }

  const workoutStreak = getWorkoutStreak()
  const avgCalories = getAverageCalories()
  const avgProtein = getAverageProtein()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center space-x-3">
          <TrendingUp className="w-6 h-6 text-purple-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Progress Tracker</h2>
            <p className="text-gray-600">Monitor your workout consistency and nutrition habits</p>
          </div>
        </div>
      </div>

      {/* Period Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Time Period</h3>
        <div className="flex space-x-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setSelectedPeriod(period.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedPeriod === period.id
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CalendarDays className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Workout Streak</h4>
              <p className="text-2xl font-bold text-gray-900">{workoutStreak} days</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            {workoutStreak > 0 ? 'Keep up the great work!' : 'Time to start your streak!'}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Avg. Calories</h4>
              <p className="text-2xl font-bold text-gray-900">{avgCalories}</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">kcal per day</div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-orange-100 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-500">Avg. Protein</h4>
              <p className="text-2xl font-bold text-gray-900">{avgProtein}g</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">grams per day</div>
        </div>
      </div>

      {/* Workout Calendar */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Workout Calendar</h3>
        <div className="grid grid-cols-7 gap-2">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
          {mockWorkoutData.map((day, index) => (
            <div
              key={index}
              className={`aspect-square rounded-lg border-2 flex items-center justify-center text-xs font-medium transition-colors ${
                day.completed
                  ? 'bg-green-100 border-green-300 text-green-800'
                  : 'bg-gray-50 border-gray-200 text-gray-400'
              }`}
            >
              {day.completed ? '✓' : '—'}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center space-x-4 text-sm text-gray-600">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-100 border-2 border-green-300 rounded"></div>
            <span>Workout completed</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-50 border-2 border-gray-200 rounded"></div>
            <span>Rest day</span>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {mockWorkoutData.slice(-5).reverse().map((day, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  day.completed ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
                <div>
                  <div className="font-medium text-gray-900">
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'short', 
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </div>
                  <div className="text-sm text-gray-600">
                    {day.completed 
                      ? `${day.exercises} exercises • ${day.totalVolume} total volume`
                      : 'Rest day'
                    }
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
