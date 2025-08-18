import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Exercise {
  id: string
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
