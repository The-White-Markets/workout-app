'use client'

import { useState } from 'react'
import { workoutData } from '@/data/workoutData'
import ExerciseCard from './ExerciseCard'
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react'

const days = ['Monday (Push)', 'Tuesday (Pull)', 'Wednesday (Legs)', 'Thursday (Upper + Core)', 'Friday (Full-Body/Metabolic)']

export default function WorkoutTracker() {
  const [selectedDay, setSelectedDay] = useState(days[0])
  const [currentDate, setCurrentDate] = useState(new Date())

  const exercisesForDay = workoutData.filter(exercise => exercise.day === selectedDay)



  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  return (
    <div className="space-y-6">
      {/* Date Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Today&apos;s Workout</h2>
              <p className="text-gray-600">{formatDate(currentDate)}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Day Selection */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Workout Day</h3>
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
                selectedDay === day
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {day.split(' ')[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">{selectedDay} Exercises</h3>
        {exercisesForDay.map((exercise, index) => (
          <ExerciseCard 
            key={index} 
            exercise={exercise} 
            date={currentDate}
          />
        ))}
      </div>
    </div>
  )
}
