'use client'

import { useState } from 'react'
import { Utensils, TrendingUp, Dumbbell } from 'lucide-react'
import WorkoutTracker from '@/components/WorkoutTracker'
import NutritionTracker from '@/components/NutritionTracker'
import ProgressTracker from '@/components/ProgressTracker'

export default function Home() {
  const [activeTab, setActiveTab] = useState('workouts')

  const tabs = [
    { id: 'workouts', label: 'Workouts', icon: Dumbbell },
    { id: 'nutrition', label: 'Nutrition', icon: Utensils },
    { id: 'progress', label: 'Progress', icon: TrendingUp },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Workout Tracker</h1>
          <p className="text-gray-600">Track your workouts, nutrition, and progress</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-6">
        {activeTab === 'workouts' && <WorkoutTracker />}
        {activeTab === 'nutrition' && <NutritionTracker />}
        {activeTab === 'progress' && <ProgressTracker />}
      </main>
    </div>
  )
}
