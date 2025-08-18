# Workout Tracker App

A mobile-first workout tracking application built with Next.js, TypeScript, and Tailwind CSS. Track your workouts, nutrition, and progress with an intuitive interface.

## Features

- **Workout Tracking**: Track sets, reps, weight, and RPE for each exercise
- **Nutrition Logging**: Log daily calories and protein intake
- **Progress Monitoring**: View workout streaks and nutrition trends
- **Mobile-First Design**: Optimized for mobile devices
- **Easy Navigation**: Simple tab-based interface

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
git clone <your-repo-url>
cd workout-app
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get your project URL and anon key from the API settings
3. Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

### 3. Database Setup

Run these SQL commands in your Supabase SQL editor:

```sql
-- Create exercises table
CREATE TABLE exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  day TEXT NOT NULL,
  exercise_name TEXT NOT NULL,
  current_weight TEXT NOT NULL,
  reps TEXT NOT NULL,
  sets INTEGER NOT NULL,
  rest_between_sets TEXT NOT NULL,
  rest_before_next TEXT NOT NULL,
  weight_increase_rule TEXT NOT NULL,
  tempo TEXT NOT NULL,
  rpe_target TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create workout_sessions table
CREATE TABLE workout_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  exercise_id UUID REFERENCES exercises(id),
  weight_used NUMERIC,
  reps_completed INTEGER,
  sets_completed INTEGER,
  rpe_actual INTEGER,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create nutrition_logs table
CREATE TABLE nutrition_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  calories INTEGER NOT NULL,
  protein INTEGER NOT NULL,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert workout data from CSV
INSERT INTO exercises (day, exercise_name, current_weight, reps, sets, rest_between_sets, rest_before_next, weight_increase_rule, tempo, rpe_target, notes) VALUES
('Monday (Push)', 'Dumbbell Bench Press', '20 lb each', '8-12', 4, '75-90s', '90s', 'When you hit 12 reps on all sets for 2 sessions at RPE ≤8, add 5 lb per dumbbell', '3-1-1', '7-8', 'Warm-up 2 light sets'),
('Monday (Push)', 'Seated Dumbbell Shoulder Press', '15 lb each', '8-12', 3, '75-90s', '60s', 'Top of range for 2 sessions → +2.5–5 lb each', '2-1-1', '7-8', ''),
('Monday (Push)', 'High-to-Low Cable Fly', '10 lb per side', '12-15', 3, '60s', '45-60s', 'Top of range twice → next cable increment', '2-1-2', '7', 'Superset with Pushdowns (A)'),
('Monday (Push)', 'Cable Triceps Rope Pushdown', '15 lb', '12-15', 3, '60s', '60-90s', 'Top of range twice → next increment', '2-0-1', '7', 'Superset with Cable Fly (A)'),
('Monday (Push)', 'Dumbbell Lateral Raise', '10 lb each', '12-15', 3, '45-60s', '90s', 'Top of range twice → +2.5 lb each', '2-0-1', '7', 'Keep slight bend in elbows'),
('Tuesday (Pull)', 'Kneeling Cable Lat Pulldown (use bar/rope)', '30 lb total', '8-12', 4, '75-90s', '90s', '12s for 2 sessions → next increment', '2-1-1', '7-8', 'Kneel facing tower; pull to chest'),
('Tuesday (Pull)', 'One-Arm Dumbbell Row', '25 lb', '10-12 each', 3, '75s', '60s', '12s for 2 sessions → +5 lb', '2-1-1', '7-8', 'Bench support'),
('Tuesday (Pull)', 'Seated/Low Cable Row (neutral)', '25 lb', '10-12', 3, '75s', '45-60s', 'Top range twice → next increment', '2-1-1', '7-8', 'Superset with Face Pulls (B)'),
('Tuesday (Pull)', 'Cable Face Pull', '15 lb', '12-15', 3, '45-60s', '60-90s', 'Top range twice → next increment', '2-1-1', '7', 'Superset with Low Row (B)'),
('Tuesday (Pull)', 'Dumbbell Hammer Curl', '15 lb each', '10-12', 3, '60s', '90s', '12s for 2 sessions → +2.5–5 lb each', '2-0-1', '7', 'Elbows pinned'),
('Wednesday (Legs)', 'Goblet Squat', '35 lb', '10-12', 4, '75-90s', '90s', '12s for 2 sessions → +5 lb', '3-1-1', '7-8', 'Chest up; full depth you control'),
('Wednesday (Legs)', 'Dumbbell Romanian Deadlift', '25 lb each', '8-12', 3, '90s', '60s', '12s twice → +5 lb each', '3-1-1', '7-8', 'Hinge; stretch hamstrings'),
('Wednesday (Legs)', 'Bulgarian Split Squat', '15 lb each', '8-10 per leg', 3, '75-90s', '45-60s', '10s twice → +5 lb each', '3-1-1', '8', 'Superset with Extensions (C)'),
('Wednesday (Legs)', 'Leg Extension (bench attachment)', '25 lb', '12-15', 3, '45-60s', '45-60s', '15s twice → +5–10 lb', '2-1-1', '7', 'Superset with Leg Curl (D)'),
('Wednesday (Legs)', 'Leg Curl (bench attachment)', '20 lb', '12-15', 3, '45-60s', '60-90s', '15s twice → +5–10 lb', '2-1-1', '7', 'Superset with Leg Extension (D)'),
('Wednesday (Legs)', 'Standing Calf Raise (DBs)', '20 lb each', '12-15', 3, '45-60s', '90s', '15s twice → +5 lb each', '2-1-2', '7', 'Pause 1s at top'),
('Thursday (Upper + Core)', 'Incline Dumbbell Bench', '20 lb each', '8-12', 3, '75s', '60s', '12s twice → +5 lb each', '3-1-1', '7-8', 'Bench at ~30°'),
('Thursday (Upper + Core)', 'Single-Arm Cable Row (contralateral)', '20 lb', '10-12 each', 3, '60-75s', '45-60s', 'Top range twice → next increment', '2-1-1', '7-8', 'Superset with Lateral Raise (E)'),
('Thursday (Upper + Core)', 'Dumbbell Lateral Raise', '10 lb each', '12-15', 3, '45-60s', '45-60s', 'Top range twice → +2.5 lb each', '2-0-1', '7', 'Superset with Cable Row (E)'),
('Thursday (Upper + Core)', 'Cable Woodchopper', '15 lb', '10-12 each side', 3, '45-60s', '45-60s', 'Top range twice → next increment', '2-1-1', '7', 'Rotate through hips'),
('Thursday (Upper + Core)', 'Plank', 'Bodyweight', '45-60s hold', 3, '45-60s', '90s', 'Add 10s each week up to 90s, then add 10 lb plate on back', '—', '7', 'Keep glutes/abs tight'),
('Friday (Full-Body/Metabolic)', 'Dumbbell Thruster (squat to press)', '20 lb each', '8-12', 4, '60s', '60s', '12s twice → +2.5–5 lb each', '2-0-1', '8', 'Full-body power'),
('Friday (Full-Body/Metabolic)', 'Renegade Row (push-up position)', '15 lb each', '6-8 per arm', 3, '60-75s', '60s', '8s twice → +2.5 lb each', '2-1-1', '8', 'Hips square'),
('Friday (Full-Body/Metabolic)', 'Kneeling Cable Lat Pulldown', '30 lb', '10-12', 3, '60-75s', '45-60s', 'Top range twice → next increment', '2-1-1', '7-8', ''),
('Friday (Full-Body/Metabolic)', 'Farmer''s Carry', '25 lb each', '40-60 meters', 5, '45-60s', '—', 'When 5 trips feel easy with solid posture, +5 lb each', '—', '8', 'Tall posture; tight core finisher');

-- Enable Row Level Security (RLS)
ALTER TABLE exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE workout_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE nutrition_logs ENABLE ROW LEVEL SECURITY;

-- Create policies (for single-user app, allow all operations)
CREATE POLICY "Allow all operations on exercises" ON exercises FOR ALL USING (true);
CREATE POLICY "Allow all operations on workout_sessions" ON workout_sessions FOR ALL USING (true);
CREATE POLICY "Allow all operations on nutrition_logs" ON nutrition_logs FOR ALL USING (true);
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### 5. Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) and create a new project
3. Import your GitHub repository
4. Add your environment variables in the Vercel dashboard
5. Deploy!

## App Structure

- **Workouts Tab**: View exercises by day, track sets/reps/weight/RPE
- **Nutrition Tab**: Log daily calories and protein intake
- **Progress Tab**: View workout streaks and nutrition trends

## Features

- **Exercise Tracking**: Track weight, reps, and RPE for each set
- **Weight Increase Suggestions**: Get recommendations based on performance
- **Date Navigation**: Easily navigate between different dates
- **Mobile Optimized**: Touch-friendly interface for mobile devices
- **Real-time Updates**: Instant feedback and calculations

## Customization

The workout data is stored in `src/data/workoutData.ts`. You can modify this file to:
- Change exercise parameters
- Add new exercises
- Modify weight increase rules
- Update rest periods

## Future Enhancements

- Supabase integration for data persistence
- Workout history and analytics
- Progress photos
- Body measurements tracking
- Export functionality
- Dark mode

## Support

This is a personal workout app. Feel free to modify and enhance it for your needs!
