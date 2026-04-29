-- Karigai Database Schema
-- Run this in your Supabase SQL editor

create extension if not exists "pgcrypto";

-- profiles
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  name text,
  age integer,
  height_cm numeric,
  weight_kg numeric,
  unit_system text default 'metric',
  country text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
alter table profiles enable row level security;
create policy "users own their profile" on profiles
  for all using (auth.uid() = user_id);

-- body_metrics
create table if not exists body_metrics (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  date date default current_date,
  weight_kg numeric,
  waist_cm numeric,
  hip_cm numeric,
  body_fat_percent numeric,
  created_at timestamptz default now()
);
alter table body_metrics enable row level security;
create policy "users own their body metrics" on body_metrics
  for all using (auth.uid() = user_id);

-- health_context
create table if not exists health_context (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  has_pcos boolean default false,
  has_pcod boolean default false,
  has_prediabetes boolean default false,
  has_diabetes boolean default false,
  has_thyroid_condition boolean default false,
  has_irregular_periods boolean default false,
  has_hormonal_concerns boolean default false,
  has_iron_deficiency boolean default false,
  has_vitamin_d_deficiency boolean default false,
  has_b12_deficiency boolean default false,
  has_high_cholesterol boolean default false,
  has_high_blood_pressure boolean default false,
  has_digestive_issues boolean default false,
  has_eating_disorder_history boolean default false,
  is_pregnant boolean default false,
  is_breastfeeding boolean default false,
  injuries text,
  allergies text,
  other_deficiencies text,
  other_conditions text,
  notes text,
  updated_at timestamptz default now()
);
alter table health_context enable row level security;
create policy "users own their health context" on health_context
  for all using (auth.uid() = user_id);

-- cycle_profile
create table if not exists cycle_profile (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  last_period_start date,
  average_cycle_length integer default 28,
  average_period_length integer default 5,
  cycle_regular text default 'unsure',
  flow_level text,
  common_symptoms text[],
  birth_control_use text,
  updated_at timestamptz default now()
);
alter table cycle_profile enable row level security;
create policy "users own their cycle profile" on cycle_profile
  for all using (auth.uid() = user_id);

-- cycle_logs
create table if not exists cycle_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  date date default current_date,
  is_period_day boolean default false,
  flow_level text,
  pain_score integer check (pain_score between 0 and 10),
  symptoms text[],
  mood text,
  energy_score integer check (energy_score between 1 and 10),
  notes text,
  created_at timestamptz default now(),
  unique(user_id, date)
);
alter table cycle_logs enable row level security;
create policy "users own their cycle logs" on cycle_logs
  for all using (auth.uid() = user_id);

-- diet_preferences
create table if not exists diet_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  diet_type text,
  is_vegetarian boolean default false,
  is_vegan boolean default false,
  is_pescatarian boolean default false,
  is_eggetarian boolean default false,
  is_non_veg boolean default false,
  is_kosher boolean default false,
  is_halal boolean default false,
  is_jain boolean default false,
  is_gluten_free boolean default false,
  is_lactose_free boolean default false,
  is_dairy_free boolean default false,
  is_nut_free boolean default false,
  is_soy_free boolean default false,
  cuisine_preference text,
  meal_frequency integer default 3,
  foods_to_avoid text,
  updated_at timestamptz default now()
);
alter table diet_preferences enable row level security;
create policy "users own their diet preferences" on diet_preferences
  for all using (auth.uid() = user_id);

-- fasting_preferences
create table if not exists fasting_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  interested_in_fasting boolean default false,
  fasting_type text default 'none',
  eating_window_start time,
  eating_window_end time,
  feels_dizzy_when_fasting boolean default false,
  fasting_caution_flags text[],
  updated_at timestamptz default now()
);
alter table fasting_preferences enable row level security;
create policy "users own their fasting preferences" on fasting_preferences
  for all using (auth.uid() = user_id);

-- fitness_preferences
create table if not exists fitness_preferences (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  fitness_level text,
  gym_available boolean default false,
  weights_available boolean default false,
  swimming_available boolean default false,
  running_available boolean default false,
  home_workouts_available boolean default true,
  walking_preferred boolean default true,
  cycling_available boolean default false,
  yoga_pilates_preferred boolean default false,
  workout_days_per_week integer,
  workout_duration_minutes integer default 45,
  preferred_activities text[],
  injuries text,
  exercise_dislikes text,
  updated_at timestamptz default now()
);
alter table fitness_preferences enable row level security;
create policy "users own their fitness preferences" on fitness_preferences
  for all using (auth.uid() = user_id);

-- goals
create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade unique,
  primary_goal text,
  target_weight_kg numeric,
  timeline_weeks integer,
  wants_weight_loss boolean default false,
  wants_maintenance boolean default false,
  wants_muscle_gain boolean default false,
  wants_toning boolean default false,
  wants_energy_improvement boolean default false,
  wants_stamina boolean default false,
  wants_cycle_awareness boolean default false,
  wants_nutrition_improvement boolean default false,
  goal_notes text,
  updated_at timestamptz default now()
);
alter table goals enable row level security;
create policy "users own their goals" on goals
  for all using (auth.uid() = user_id);

-- daily_logs
create table if not exists daily_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  date date default current_date,
  water_ml integer default 0,
  energy_score integer check (energy_score between 1 and 10),
  mood text,
  sleep_hours numeric,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  unique(user_id, date)
);
alter table daily_logs enable row level security;
create policy "users own their daily logs" on daily_logs
  for all using (auth.uid() = user_id);

-- meal_logs
create table if not exists meal_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  date date default current_date,
  meal_type text,
  meal_name text not null,
  calories integer,
  protein_g numeric,
  carbs_g numeric,
  fat_g numeric,
  fiber_g numeric,
  notes text,
  created_at timestamptz default now()
);
alter table meal_logs enable row level security;
create policy "users own their meal logs" on meal_logs
  for all using (auth.uid() = user_id);

-- workout_logs
create table if not exists workout_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  date date default current_date,
  workout_name text,
  duration_minutes integer,
  intensity text,
  completed boolean default false,
  skipped_reason text,
  exercises jsonb,
  feedback text,
  created_at timestamptz default now()
);
alter table workout_logs enable row level security;
create policy "users own their workout logs" on workout_logs
  for all using (auth.uid() = user_id);

-- chat_messages
create table if not exists chat_messages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  role text check (role in ('user', 'assistant')),
  message text not null,
  context_snapshot jsonb,
  created_at timestamptz default now()
);
alter table chat_messages enable row level security;
create policy "users own their chat messages" on chat_messages
  for all using (auth.uid() = user_id);


-- Demo seed (run after creating demo@karigai.app user in Supabase Auth)
-- Replace 'DEMO_USER_UUID' with the actual user UUID from auth.users

/*
insert into profiles (user_id, name, age, height_cm, weight_kg) values ('DEMO_USER_UUID', 'Priya', 28, 162, 65);
insert into health_context (user_id, has_pcos, has_iron_deficiency, has_irregular_periods) values ('DEMO_USER_UUID', true, true, true);
insert into cycle_profile (user_id, last_period_start, average_cycle_length, cycle_regular) values ('DEMO_USER_UUID', current_date - interval '19 days', 28, 'irregular');
insert into diet_preferences (user_id, diet_type, is_vegetarian) values ('DEMO_USER_UUID', 'Vegetarian', true);
insert into fasting_preferences (user_id, interested_in_fasting, fasting_type, eating_window_start, eating_window_end) values ('DEMO_USER_UUID', true, '14:10', '10:00', '20:00');
insert into fitness_preferences (user_id, fitness_level, gym_available, walking_preferred, workout_days_per_week, workout_duration_minutes) values ('DEMO_USER_UUID', 'intermediate', true, true, 4, 45);
insert into goals (user_id, primary_goal) values ('DEMO_USER_UUID', 'lose_weight');
*/
