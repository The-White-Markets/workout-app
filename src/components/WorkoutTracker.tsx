'use client'

import { useState, useEffect } from 'react'
import { workoutData } from '@/data/workoutData'
import ExerciseCard from './ExerciseCard'
import { Calendar, ChevronLeft, ChevronRight, Activity, Target, Zap } from 'lucide-react'

// Define workout day names and their corresponding IDs
const workoutDays = [
  { id: "fcb6c14b-3b2b-44ef-a38a-0d7fa92262c5", name: "Push Day", icon: "💪", color: "from-blue-500 to-purple-600" },
  { id: "f94a79c0-63e7-4e4f-9b4d-69b94379249d", name: "Pull Day", icon: "🏋️", color: "from-green-500 to-teal-600" },
  { id: "9f606d0b-b72b-40b6-b09e-2725c1a12fa9", name: "Core Day", icon: "🔥", color: "from-orange-500 to-red-600" },
  { id: "8a19f4dc-1b8c-4b84-86b6-107f7b8b31ec", name: "Upper Body", icon: "⚡", color: "from-purple-500 to-pink-600" },
  { id: "67ef2d59-2f56-4f8a-87d6-2b1e3ed2a9f1", name: "Lower Body", icon: "🦵", color: "from-indigo-500 to-blue-600" }
]

export default function WorkoutTracker() {
  const [selectedDay, setSelectedDay] = useState(workoutDays[0])
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isVisible, setIsVisible] = useState(false)

  const exercisesForDay = workoutData
    .filter(exercise => exercise.workout_day_id === selectedDay.id)
    .sort((a, b) => a.order - b.order)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  useEffect(() => {
    // Small delay to ensure smooth animation
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 100)
    
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 p-6 space-y-8">
      {/* Hero Section */}
      <div className={`text-center space-y-6 fade-in-up ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="glass-card p-8 max-w-4xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Workout Tracker
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transform your fitness journey with our premium, intuitive workout tracking experience
          </p>
        </div>
      </div>

      {/* Date Header */}
      <div className={`glass-card p-6 max-w-4xl mx-auto slide-in-left ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Today's Workout</h2>
              <p className="text-gray-600 text-lg">{formatDate(currentDate)}</p>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getTime() - 24 * 60 * 60 * 1000))}
              className="p-3 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              onClick={() => setCurrentDate(new Date())}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getTime() + 24 * 60 * 60 * 1000))}
              className="p-3 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>

      {/* Day Selection */}
      <div className={`glass-card p-6 max-w-6xl mx-auto slide-in-left ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Workout</h3>
          <p className="text-gray-600">Select the perfect workout for today's goals</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {workoutDays.map((day, index) => (
            <button
              key={day.id}
              onClick={() => setSelectedDay(day)}
              className={`group relative overflow-hidden rounded-2xl p-6 text-left transition-all duration-500 hover:scale-105 ${
                selectedDay.id === day.id
                  ? 'ring-4 ring-blue-500/30 shadow-2xl'
                  : 'hover:shadow-xl'
              }`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${day.color} opacity-90 group-hover:opacity-100 transition-opacity duration-300`} />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="text-4xl mb-3">{day.icon}</div>
                <h4 className="text-xl font-bold text-white mb-2">{day.name}</h4>
                <p className="text-white/90 text-sm">
                  {day.name === 'Push Day' && 'Chest, shoulders, triceps'}
                  {day.name === 'Pull Day' && 'Back and biceps'}
                  {day.name === 'Core Day' && 'Abdominal and core'}
                  {day.name === 'Upper Body' && 'Mixed upper body'}
                  {day.name === 'Lower Body' && 'Legs and glutes'}
                </p>
              </div>
              
              {/* Selection Indicator */}
              {selectedDay.id === day.id && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Exercises Section */}
      <div className={`max-w-6xl mx-auto space-y-6 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-green-500 to-blue-600 rounded-full">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{selectedDay.name} Exercises</h3>
          </div>
          <p className="text-gray-600 text-lg">
            {exercisesForDay.length} exercises • {exercisesForDay.reduce((acc, ex) => acc + ex.sets, 0)} total sets
          </p>
        </div>
        
        <div className="space-y-6">
          {exercisesForDay.map((exercise, index) => (
            <div
              key={index}
              className="fade-in-up"
              style={{
                animationDelay: `${index * 150}ms`
              }}
            >
              <ExerciseCard exercise={exercise} />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className={`text-center py-12 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <div className="glass-card p-8 max-w-2xl mx-auto">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-green-500 to-blue-600 rounded-full">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Ready to Crush It?</h3>
          </div>
          <p className="text-gray-600 mb-6">
            Track your progress, stay consistent, and achieve your fitness goals with our premium workout tracker.
          </p>
          <button className="btn-primary text-lg px-8 py-4">
            Start Your Workout
          </button>
        </div>
      </div>
    </div>
  )
}
