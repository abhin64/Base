export const EXP_OPTIONS = [
  { id: 'beginner',     label: 'Just starting out',   sub: 'Little or no gym experience' },
  { id: 'novice',       label: 'A little experience', sub: 'Been a few times, but not consistent' },
  { id: 'intermediate', label: 'Some experience',     sub: 'Trained on and off for a while' },
  { id: 'advanced',     label: 'Pretty experienced',  sub: '2+ years of consistent training' },
];

export const GOAL_OPTIONS = [
  { id: 'muscle',  label: 'Build muscle',    sub: 'Get stronger and add size' },
  { id: 'lean',    label: 'Get lean',        sub: 'Lose weight while keeping muscle' },
  { id: 'fitness', label: 'Overall fitness', sub: 'Feel good and move well' },
  { id: 'habit',   label: 'Build a habit',   sub: 'Just start moving consistently' },
];

export type Exercise = {
  id: string;
  name: string;
  sets: number;
  reps: string;
  wt: number;
  unit: 'lbs' | 'BW';
  muscles: string[];
  tip: string;
};

export type Workout = {
  name: string;
  focus: string;
  exercises: Exercise[];
};

export const DAY1_WORKOUTS: Record<string, Workout> = {
  beginner: {
    name: 'Foundation Push', focus: 'Chest · Shoulders · Arms',
    exercises: [
      { id: 'pushup',  name: 'Push-up',          sets: 3, reps: '8–10', wt: 0,  unit: 'BW',  muscles: ['chest','shoulders','arms'],
        tip: "Lower slow. Push through the whole palm. It's ok to go to your knees." },
      { id: 'goblet',  name: 'Goblet Squat',      sets: 3, reps: '10',  wt: 15, unit: 'lbs', muscles: ['quads','glutes','core'],
        tip: 'Hold a light dumbbell at chest height. Squat deep, keep chest up.' },
      { id: 'dbpress', name: 'DB Shoulder Press', sets: 3, reps: '10',  wt: 10, unit: 'lbs', muscles: ['shoulders','arms'],
        tip: "Sit with back supported. Push straight overhead, don't flare elbows too wide." },
    ],
  },
  novice: {
    name: 'Upper Push', focus: 'Chest · Shoulders · Triceps',
    exercises: [
      { id: 'bench',   name: 'Bench Press',    sets: 3, reps: '10', wt: 65, unit: 'lbs', muscles: ['chest','shoulders','arms'],
        tip: 'Control the bar down to your chest. Drive it back up smoothly.' },
      { id: 'ohpress', name: 'Overhead Press', sets: 3, reps: '10', wt: 45, unit: 'lbs', muscles: ['shoulders','arms'],
        tip: 'Brace your core. Press bar directly overhead, not in front.' },
      { id: 'dips',    name: 'Assisted Dips',  sets: 3, reps: '8',  wt: 0,  unit: 'BW',  muscles: ['chest','arms'],
        tip: 'Use an assist machine or bands. Lean slightly forward for more chest.' },
    ],
  },
  intermediate: {
    name: 'Push A', focus: 'Chest · Shoulders · Triceps',
    exercises: [
      { id: 'bench',   name: 'Bench Press',      sets: 4, reps: '8',  wt: 115, unit: 'lbs', muscles: ['chest','shoulders','arms'],
        tip: "Full range of motion. Control the eccentric — don't bounce it off your chest." },
      { id: 'incline', name: 'Incline DB Press', sets: 3, reps: '10', wt: 40,  unit: 'lbs', muscles: ['chest','shoulders'],
        tip: '45° incline. Full stretch at the bottom, squeeze at the top.' },
      { id: 'ohpress', name: 'Overhead Press',   sets: 3, reps: '8',  wt: 75,  unit: 'lbs', muscles: ['shoulders','arms'],
        tip: 'Tight core, slight forward lean. Flare elbows slightly on the press.' },
    ],
  },
  advanced: {
    name: 'Hypertrophy Push', focus: 'Chest · Shoulders · Triceps',
    exercises: [
      { id: 'bench',   name: 'Bench Press',         sets: 4, reps: '6–8', wt: 155, unit: 'lbs', muscles: ['chest','shoulders','arms'],
        tip: 'RPE 8. Leave 1–2 reps in the tank on your working sets.' },
      { id: 'incline', name: 'Incline DB Press',     sets: 3, reps: '10',  wt: 60,  unit: 'lbs', muscles: ['chest','shoulders'],
        tip: 'Pause 1s at the bottom. Maximize chest stretch each rep.' },
      { id: 'lateral', name: 'Cable Lateral Raise',  sets: 3, reps: '15',  wt: 10,  unit: 'lbs', muscles: ['shoulders'],
        tip: 'Keep elbow slightly bent. Control the eccentric — 2 seconds down.' },
    ],
  },
};
