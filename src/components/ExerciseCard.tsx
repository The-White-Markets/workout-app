'use client'

import { useState } from 'react'
import { Target, Info, Play, Activity, Save, TrendingUp, Timer, Dumbbell } from 'lucide-react'

interface Exercise {
  workout_day_id: string
  name: string
  sets: number
  reps: string
  rpe: string
  progression_rule: string
  video_url: string
  current_weight: string
  last_workout: string
  order: number
}

interface ExerciseCardProps {
  exercise: Exercise
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [currentRepsPerSet, setCurrentRepsPerSet] = useState<string>('')
  const [currentWeight, setCurrentWeight] = useState<string>(exercise.current_weight || '')
  const [isExpanded, setIsExpanded] = useState(false)
  const [isSavingWeight, setIsSavingWeight] = useState(false)
  const [isSavingReps, setIsSavingReps] = useState(false)

  const getWeightIncreaseSuggestion = () => {
    if (currentRepsPerSet && parseInt(currentRepsPerSet) >= 12) {
      return "Excellent performance! Consider increasing weight for next session."
    } else if (currentRepsPerSet && parseInt(currentRepsPerSet) < 8) {
      return "Focus on form. Consider reducing weight to maintain proper technique."
    }
    return null
  }

  const handleWeightSave = async () => {
    if (!currentWeight.trim()) return
    
    setIsSavingWeight(true)
    try {
      // For now, we'll just update the local state since we don't have exercise IDs in the data
      // In a real app, you'd call: await updateExerciseWeight(exercise.id, currentWeight)
      console.log('Saving weight:', currentWeight)
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error('Error saving weight:', error)
    } finally {
      setIsSavingWeight(false)
    }
  }

  const handleRepsSave = async () => {
    if (!currentRepsPerSet.trim()) return
    
    setIsSavingReps(true)
    try {
      // For now, we'll just update the local state since we don't have exercise IDs in the data
      // In a real app, you'd call: await updateExerciseReps(exercise.id, currentRepsPerSet)
      console.log('Saving reps per set:', currentRepsPerSet)
      // Simulate save delay
      await new Promise(resolve => setTimeout(resolve, 500))
    } catch (error) {
      console.error('Error saving reps:', error)
    } finally {
      setIsSavingReps(false)
    }
  }

  return (
    <div className="floating-card overflow-hidden group">
      {/* Exercise Header */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
                  <Dumbbell className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-xl font-bold text-gray-900">
                  {exercise.name}
                </h4>
              </div>
              {exercise.video_url && (
                <a
                  href={exercise.video_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full text-sm font-medium hover:scale-105 transition-transform duration-300 shadow-lg"
                >
                  <Play className="w-3 h-3" />
                  <span>Tutorial</span>
                </a>
              )}
            </div>
            
            {/* Exercise Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                <div className="text-2xl font-bold text-blue-600">{exercise.sets}</div>
                <div className="text-xs text-blue-600 font-medium">Sets</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl border border-green-100">
                <div className="text-2xl font-bold text-green-600">{exercise.reps}</div>
                <div className="text-xs text-green-600 font-medium">Target Reps</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-orange-50 to-red-50 rounded-xl border border-orange-100">
                <div className="text-2xl font-bold text-orange-600">{exercise.rpe}</div>
                <div className="text-xs text-orange-600 font-medium">RPE Target</div>
              </div>
              <div className="text-center p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                <div className="text-2xl font-bold text-purple-600">#{exercise.order}</div>
                <div className="text-xs text-purple-600 font-medium">Order</div>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 p-3 rounded-full bg-white/80 hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <Info className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      {/* Exercise Details (Expandable) */}
      {isExpanded && (
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-b border-white/20">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <div>
                <span className="text-sm font-medium text-gray-700">Progression Rule:</span>
                <div className="text-sm text-gray-600">{exercise.progression_rule}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Timer className="w-5 h-5 text-green-600" />
              <div>
                <span className="text-sm font-medium text-gray-700">Last Workout:</span>
                <div className="text-sm text-gray-600">{exercise.last_workout || "Not recorded"}</div>
              </div>
            </div>
            {exercise.video_url && (
              <div className="flex items-center space-x-3">
                <Play className="w-5 h-5 text-red-600" />
                <div>
                  <span className="text-sm font-medium text-gray-700">Video Tutorial:</span>
                  <div className="text-sm">
                    <a
                      href={exercise.video_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 underline font-medium"
                    >
                      Watch YouTube Tutorial
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick Tracking */}
      <div className="p-6">
        <h5 className="text-lg font-bold text-gray-900 mb-6 flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span>Track Your Progress</span>
        </h5>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Reps per Set Input */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-900">
              Current Reps per Set
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                value={currentRepsPerSet}
                onChange={(e) => setCurrentRepsPerSet(e.target.value)}
                className="modern-input flex-1"
                placeholder="Enter reps"
                min="1"
                max="50"
              />
              <button
                onClick={handleRepsSave}
                disabled={isSavingReps}
                className="btn-success px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span className="ml-2">{isSavingReps ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
            <div className="text-sm text-gray-600 bg-gradient-to-r from-green-50 to-blue-50 p-3 rounded-lg border border-green-100">
              <span className="font-medium">Target:</span> {exercise.reps} reps
            </div>
          </div>

          {/* Current Weight Input */}
          <div className="space-y-4">
            <label className="block text-lg font-semibold text-gray-900 flex items-center space-x-2">
              <Dumbbell className="w-5 h-5 text-blue-600" />
              <span>Current Weight</span>
            </label>
            <div className="flex items-center space-x-3">
              <input
                type="text"
                value={currentWeight}
                onChange={(e) => setCurrentWeight(e.target.value)}
                className="modern-input flex-1"
                placeholder="e.g., 20 lb, 45 kg"
              />
              <button
                onClick={handleWeightSave}
                disabled={isSavingWeight}
                className="btn-primary px-6 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span className="ml-2">{isSavingWeight ? 'Saving...' : 'Save'}</span>
              </button>
            </div>
            <div className="text-sm text-gray-600 bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border border-blue-100">
              <span className="font-medium">Update your current working weight for this exercise</span>
            </div>
          </div>
        </div>

        {/* Smart Suggestion */}
        {getWeightIncreaseSuggestion() && (
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-green-600 rounded-full">
                <Target className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm font-semibold text-blue-800">
                {getWeightIncreaseSuggestion()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
