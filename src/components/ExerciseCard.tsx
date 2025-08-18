'use client'

import { useState } from 'react'
import { Target, Info } from 'lucide-react'

interface Exercise {
  day: string
  exercise_name: string
  current_weight: string
  reps: string
  sets: number
  rest_between_sets: string
  rest_before_next: string
  weight_increase_rule: string
  tempo: string
  rpe_target: string
  notes: string
}

interface ExerciseCardProps {
  exercise: Exercise
  date: Date
}

export default function ExerciseCard({ exercise }: ExerciseCardProps) {
  const [sets, setSets] = useState<Array<{ weight: string; reps: number; rpe: number }>>(
    Array(exercise.sets).fill({ weight: exercise.current_weight, reps: 0, rpe: 0 })
  )
  const [isExpanded, setIsExpanded] = useState(false)

  const updateSet = (index: number, field: 'weight' | 'reps' | 'rpe', value: string | number) => {
    const newSets = [...sets]
    newSets[index] = { ...newSets[index], [field]: value }
    setSets(newSets)
  }

  const getWeightIncreaseSuggestion = () => {
    const allSetsCompleted = sets.every(set => set.reps > 0 && set.rpe > 0)
    const maxReps = Math.max(...sets.map(set => set.reps))
    const maxRpe = Math.max(...sets.map(set => set.rpe))
    
    if (allSetsCompleted && maxReps >= 12 && maxRpe <= 8) {
      return "Consider increasing weight based on your performance!"
    }
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Exercise Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              {exercise.exercise_name}
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Target:</span>
                <div className="font-medium">{exercise.reps} reps × {exercise.sets} sets</div>
              </div>
              <div>
                <span className="text-gray-500">Weight:</span>
                <div className="font-medium">{exercise.current_weight}</div>
              </div>
              <div>
                <span className="text-gray-500">Rest:</span>
                <div className="font-medium">{exercise.rest_between_sets}</div>
              </div>
              <div>
                <span className="text-gray-500">RPE Target:</span>
                <div className="font-medium">{exercise.rpe_target}</div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-4 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <Info className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Exercise Details (Expandable) */}
      {isExpanded && (
        <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-500">Tempo:</span>
              <div className="font-medium">{exercise.tempo}</div>
            </div>
            <div>
              <span className="text-gray-500">Rest Before Next:</span>
              <div className="font-medium">{exercise.rest_before_next}</div>
            </div>
            <div className="md:col-span-2">
              <span className="text-gray-500">Weight Increase Rule:</span>
              <div className="font-medium text-sm">{exercise.weight_increase_rule}</div>
            </div>
            {exercise.notes && (
              <div className="md:col-span-2">
                <span className="text-gray-500">Notes:</span>
                <div className="font-medium text-sm">{exercise.notes}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sets Tracking */}
      <div className="p-4">
        <h5 className="text-sm font-medium text-gray-700 mb-3">Track Your Sets</h5>
        <div className="space-y-3">
          {sets.map((set, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm font-medium text-gray-500 w-8">Set {index + 1}</span>
              
              <div className="flex-1 grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Weight</label>
                  <input
                    type="text"
                    value={set.weight}
                    onChange={(e) => updateSet(index, 'weight', e.target.value)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Weight"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500 mb-1">Reps</label>
                  <input
                    type="number"
                    value={set.reps || ''}
                    onChange={(e) => updateSet(index, 'reps', parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="0"
                  />
                </div>
                
                <div>
                  <label className="block text-xs text-gray-500 mb-1">RPE</label>
                  <input
                    type="number"
                    value={set.rpe || ''}
                    onChange={(e) => updateSet(index, 'rpe', parseInt(e.target.value) || 0)}
                    className="w-full px-2 py-1 text-sm border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0"
                    min="1"
                    max="10"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Weight Increase Suggestion */}
        {getWeightIncreaseSuggestion() && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">
                {getWeightIncreaseSuggestion()}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
