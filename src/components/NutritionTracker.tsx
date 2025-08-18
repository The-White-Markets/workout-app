'use client'

import { useState } from 'react'
import { Calendar, Plus, ChevronLeft, ChevronRight, Utensils, Target } from 'lucide-react'

interface NutritionEntry {
  id: string
  date: string
  calories: number
  protein: number
  notes: string
}

export default function NutritionTracker() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [entries, setEntries] = useState<NutritionEntry[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newEntry, setNewEntry] = useState({
    calories: '',
    protein: '',
    notes: ''
  })

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const getEntriesForDate = (date: Date) => {
    const dateKey = formatDateKey(date)
    return entries.filter(entry => entry.date === dateKey)
  }

  const addEntry = () => {
    if (!newEntry.calories || !newEntry.protein) return

    const entry: NutritionEntry = {
      id: Date.now().toString(),
      date: formatDateKey(currentDate),
      calories: parseInt(newEntry.calories),
      protein: parseInt(newEntry.protein),
      notes: newEntry.notes
    }

    setEntries([...entries, entry])
    setNewEntry({ calories: '', protein: '', notes: '' })
    setShowAddForm(false)
  }

  const deleteEntry = (id: string) => {
    setEntries(entries.filter(entry => entry.id !== id))
  }

  const getDailyTotals = (date: Date) => {
    const dayEntries = getEntriesForDate(date)
    return {
      calories: dayEntries.reduce((sum, entry) => sum + entry.calories, 0),
      protein: dayEntries.reduce((sum, entry) => sum + entry.protein, 0)
    }
  }

  const dailyTotals = getDailyTotals(currentDate)

  return (
    <div className="space-y-6">
      {/* Date Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="w-6 h-6 text-green-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Nutrition Tracker</h2>
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
              className="px-3 py-2 text-sm font-medium text-green-600 hover:bg-green-50 rounded-lg transition-colors"
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

      {/* Daily Summary */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Daily Summary</h3>
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Utensils className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">Calories</span>
            </div>
            <div className="text-2xl font-bold text-blue-900">{dailyTotals.calories}</div>
            <div className="text-sm text-blue-600">kcal</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Target className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-green-700">Protein</span>
            </div>
            <div className="text-2xl font-bold text-green-900">{dailyTotals.protein}</div>
            <div className="text-sm text-green-600">g</div>
          </div>
        </div>
      </div>

      {/* Add Entry Button */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Food Entries</h3>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Entry</span>
          </button>
        </div>

        {/* Add Entry Form */}
        {showAddForm && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Calories</label>
                <input
                  type="number"
                  value={newEntry.calories}
                  onChange={(e) => setNewEntry({ ...newEntry, calories: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Protein (g)</label>
                <input
                  type="number"
                  value={newEntry.protein}
                  onChange={(e) => setNewEntry({ ...newEntry, protein: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <input
                  type="text"
                  value={newEntry.notes}
                  onChange={(e) => setNewEntry({ ...newEntry, notes: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Optional notes"
                />
              </div>
            </div>
            <div className="flex space-x-2 mt-4">
              <button
                onClick={addEntry}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Save Entry
              </button>
              <button
                onClick={() => {
                  setShowAddForm(false)
                  setNewEntry({ calories: '', protein: '', notes: '' })
                }}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Entries List */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Today&apos;s Entries</h3>
        {getEntriesForDate(currentDate).length === 0 ? (
          <p className="text-gray-500 text-center py-8">No entries for this date. Add your first meal!</p>
        ) : (
          <div className="space-y-3">
            {getEntriesForDate(currentDate).map((entry) => (
              <div key={entry.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center space-x-4">
                    <span className="font-medium text-gray-900">{entry.calories} kcal</span>
                    <span className="text-gray-500">•</span>
                    <span className="font-medium text-gray-900">{entry.protein}g protein</span>
                    {entry.notes && (
                      <>
                        <span className="text-gray-500">•</span>
                        <span className="text-gray-600">{entry.notes}</span>
                      </>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => deleteEntry(entry.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
