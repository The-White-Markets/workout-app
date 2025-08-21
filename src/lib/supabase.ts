import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Exercise {
  id: string
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
  created_at: string
  updated_at: string
}

export interface WorkoutSession {
  id: string
  date: string
  exercise_id: string
  weight_used: number
  reps_completed: number
  sets_completed: number
  rpe_actual: number
  notes: string
  created_at: string
}

export interface NutritionLog {
  id: string
  date: string
  calories: number
  protein: number
  notes: string
  created_at: string
}

// Function to update exercise current weight
export async function updateExerciseWeight(exerciseId: string, newWeight: string) {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .update({ current_weight: newWeight, updated_at: new Date().toISOString() })
      .eq('id', exerciseId)
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating exercise weight:', error)
    return { data: null, error }
  }
}

// Function to update exercise current reps per set
export async function updateExerciseReps(exerciseId: string, newReps: string) {
  try {
    const { data, error } = await supabase
      .from('exercises')
      .update({ current_reps: newReps, updated_at: new Date().toISOString() })
      .eq('id', exerciseId)
    
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating exercise reps:', error)
    return { data: null, error }
  }
}
