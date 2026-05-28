import { useState } from 'react';
import {
  View, Text, ScrollView, Pressable, StyleSheet, SafeAreaView, Animated,
} from 'react-native';
import { router } from 'expo-router';
import { C } from '@/constants/colors';
import { EXP_OPTIONS, GOAL_OPTIONS, DAY1_WORKOUTS } from '@/constants/workouts';
import { BtnP } from '@/components/Button';
import { SelectCard } from '@/components/SelectCard';
import { Ring } from '@/components/Ring';
import { useEffect, useRef } from 'react';

// ── Step dots ─────────────────────────────────────────────────────────────────

function StepDots({ total, current }: { total: number; current: number }) {
  return (
    <View style={styles.dots}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} style={[styles.dot, i === current && styles.dotActive]} />
      ))}
    </View>
  );
}

// ── Step 0: Intro ─────────────────────────────────────────────────────────────

function IntroStep({ onNext }: { onNext: () => void }) {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollPad} showsVerticalScrollIndicator={false}>
        <Text style={styles.wordmark}>BASE</Text>
        <Text style={styles.heroTitle}>Base Camp.</Text>
        <Text style={styles.heroBody}>
          Before we build your training plan, we need 2 weeks to learn how your body works.
          BASE takes care of the programming — you just show up and lift.
        </Text>

        <View style={styles.howCard}>
          <Text style={styles.howLabel}>How it works</Text>
          {[
            ['Tell us your level', 'We ask 2 quick questions about your experience and goals.'],
            ['BASE builds your plan', 'We generate a 14-day calibration workout program for you.'],
            ['You train, we learn', "Log your weights and how your body feels. That's it."],
            ['Your real plan drops', 'After 14 days, your permanent program is built around you.'],
          ].map(([title, desc], i) => (
            <View key={i} style={[styles.howRow, i < 3 && styles.howRowBorder]}>
              <View style={styles.howNum}>
                <Text style={styles.howNumText}>{i + 1}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.howTitle}>{title}</Text>
                <Text style={styles.howDesc}>{desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <BtnP onPress={onNext}>Let's do this  →</BtnP>
        <Text style={styles.footerNote}>Takes 2 minutes to set up</Text>
      </View>
    </SafeAreaView>
  );
}

// ── Step 1: Experience ────────────────────────────────────────────────────────

function ExpStep({ value, onChange, onNext }: { value: string | null; onChange: (v: string) => void; onNext: () => void }) {
  return (
    <SafeAreaView style={styles.screen}>
      <StepDots total={2} current={0} />
      <ScrollView contentContainerStyle={styles.scrollPad} showsVerticalScrollIndicator={false}>
        <Text style={styles.stepTitle}>How much time have you spent in the gym?</Text>
        <Text style={styles.stepSub}>No wrong answer. BASE starts exactly where you are.</Text>
        {EXP_OPTIONS.map(opt => (
          <SelectCard key={opt.id} label={opt.label} sub={opt.sub}
            selected={value === opt.id} onPress={() => onChange(opt.id)} />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <BtnP onPress={onNext} disabled={!value}>Continue</BtnP>
      </View>
    </SafeAreaView>
  );
}

// ── Step 2: Goal ──────────────────────────────────────────────────────────────

function GoalStep({ value, onChange, onNext }: { value: string | null; onChange: (v: string) => void; onNext: () => void }) {
  return (
    <SafeAreaView style={styles.screen}>
      <StepDots total={2} current={1} />
      <ScrollView contentContainerStyle={styles.scrollPad} showsVerticalScrollIndicator={false}>
        <Text style={styles.stepTitle}>What's your main goal right now?</Text>
        <Text style={styles.stepSub}>This shapes how BASE programs your 14-day plan.</Text>
        {GOAL_OPTIONS.map(opt => (
          <SelectCard key={opt.id} label={opt.label} sub={opt.sub}
            selected={value === opt.id} onPress={() => onChange(opt.id)} />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <BtnP onPress={onNext} disabled={!value}>Build my plan</BtnP>
      </View>
    </SafeAreaView>
  );
}

// ── Step 3: Generating ────────────────────────────────────────────────────────

function GeneratingStep({ progress }: { progress: number }) {
  const msgs = [
    'Analysing your experience level…',
    'Selecting the right exercises…',
    'Calibrating starting weights…',
    'Setting your 14-day schedule…',
    'Almost there…',
  ];
  const idx = Math.min(Math.floor(progress / 22), msgs.length - 1);

  return (
    <View style={styles.genScreen}>
      <Text style={styles.wordmark}>BASE</Text>
      <Ring value={Math.round(progress)} size={110} stroke={8}>
        <Text style={styles.genPct}>{Math.round(progress)}%</Text>
      </Ring>
      <Text style={styles.genTitle}>Building your plan.</Text>
      <Text style={styles.genMsg}>{msgs[idx]}</Text>
    </View>
  );
}

// ── Step 4: Plan reveal ───────────────────────────────────────────────────────

function PlanRevealStep({ experience, goal, onStart }: {
  experience: string; goal: string; onStart: () => void;
}) {
  const exp     = EXP_OPTIONS.find(e => e.id === experience) ?? EXP_OPTIONS[0];
  const g       = GOAL_OPTIONS.find(g => g.id === goal) ?? GOAL_OPTIONS[0];
  const workout = DAY1_WORKOUTS[experience] ?? DAY1_WORKOUTS.beginner;
  const week1   = ['Foundation Push','Foundation Pull','Active Recovery','Foundation Lower','Rest','Full Body','Rest'];

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.scrollPad} showsVerticalScrollIndicator={false}>
        <Text style={styles.readyLabel}>Your plan is ready.</Text>
        <Text style={styles.revealTitle}>Base Camp: 14 days.</Text>
        <Text style={styles.revealSub}>
          Calibrated for your level. Each workout teaches BASE how your body responds.
        </Text>

        <View style={styles.profileRow}>
          <View style={styles.profileCell}>
            <Text style={styles.cellLabel}>Level</Text>
            <Text style={styles.cellValue}>{exp.label}</Text>
          </View>
          <View style={[styles.profileCell, styles.profileCellRight]}>
            <Text style={styles.cellLabel}>Goal</Text>
            <Text style={styles.cellValue}>{g.label}</Text>
          </View>
        </View>

        <View style={styles.scheduleCard}>
          <Text style={styles.scheduleTitle}>Week 1 schedule</Text>
          {week1.map((w, i) => (
            <View key={i} style={[styles.scheduleRow, i < 6 && styles.scheduleRowBorder]}>
              <View style={[styles.scheduleNum, i === 0 && styles.scheduleNumActive]}>
                <Text style={[styles.scheduleNumText, i === 0 && { color: '#fff' }]}>{i + 1}</Text>
              </View>
              <Text style={[styles.scheduleDay, i === 0 && styles.scheduleDayActive]}>
                {i === 0 ? workout.name : w}
              </Text>
              {i === 0 && (
                <View style={styles.todayBadge}>
                  <Text style={styles.todayText}>Today</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.day1Card}>
          <Text style={styles.day1Label}>Day 1 · Right now</Text>
          <Text style={styles.day1Name}>{workout.name}</Text>
          <Text style={styles.day1Focus}>{workout.focus} · {workout.exercises.length} exercises</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <BtnP onPress={onStart}>Start Day 1  →</BtnP>
      </View>
    </SafeAreaView>
  );
}

// ── Orchestrator ──────────────────────────────────────────────────────────────

export default function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [exp,  setExp]  = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);
  const [prog, setProg] = useState(0);

  const runGeneration = () => {
    setStep(3);
    let p = 0;
    const iv = setInterval(() => {
      p += Math.random() * 14 + 4;
      if (p >= 100) {
        clearInterval(iv);
        setProg(100);
        setTimeout(() => setStep(4), 500);
      } else {
        setProg(p);
      }
    }, 100);
  };

  const finish = () => {
    // Later: save exp + goal to Supabase / AsyncStorage
    router.replace('/(tabs)');
  };

  if (step === 0) return <IntroStep onNext={() => setStep(1)} />;
  if (step === 1) return <ExpStep value={exp} onChange={setExp} onNext={() => setStep(2)} />;
  if (step === 2) return <GoalStep value={goal} onChange={setGoal} onNext={runGeneration} />;
  if (step === 3) return <GeneratingStep progress={prog} />;
  if (step === 4) return <PlanRevealStep experience={exp!} goal={goal!} onStart={finish} />;
  return null;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  scrollPad: { paddingHorizontal: 24, paddingBottom: 40, paddingTop: 8 },
  footer: { paddingHorizontal: 24, paddingBottom: 36, paddingTop: 14, backgroundColor: '#fff',
    borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.06)' },
  footerNote: { textAlign: 'center', fontSize: 12, color: C.fg3, marginTop: 10 },

  dots: { flexDirection: 'row', gap: 6, justifyContent: 'center', paddingVertical: 14 },
  dot: { width: 6, height: 6, borderRadius: 99, backgroundColor: C.surface2 },
  dotActive: { width: 20, backgroundColor: C.brand },

  wordmark: { fontSize: 26, fontWeight: '800', color: C.brand, letterSpacing: -1.4, marginTop: 24, marginBottom: 44 },
  heroTitle: { fontSize: 42, fontWeight: '800', letterSpacing: -1.8, marginBottom: 14 },
  heroBody: { fontSize: 16, color: C.fg2, lineHeight: 25.6, marginBottom: 32 },

  howCard: { backgroundColor: C.surface, borderRadius: 20, padding: 18, marginBottom: 32 },
  howLabel: { fontSize: 10, fontWeight: '500', color: C.fg3, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 14 },
  howRow: { flexDirection: 'row', gap: 14, paddingVertical: 10, alignItems: 'flex-start' },
  howRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  howNum: { width: 28, height: 28, borderRadius: 99, backgroundColor: C.brandSoft, alignItems: 'center', justifyContent: 'center', marginTop: 2, flexShrink: 0 },
  howNumText: { fontSize: 12, fontWeight: '700', color: C.brand },
  howTitle: { fontSize: 14, fontWeight: '600', letterSpacing: -0.15, marginBottom: 3 },
  howDesc: { fontSize: 13, color: C.fg2, lineHeight: 19 },

  stepTitle: { fontSize: 28, fontWeight: '800', letterSpacing: -1, marginBottom: 10, marginTop: 8 },
  stepSub: { fontSize: 15, color: C.fg2, lineHeight: 22.5, marginBottom: 24 },

  genScreen: { flex: 1, backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center', padding: 40 },
  genPct: { fontSize: 26, fontWeight: '800', letterSpacing: -1, color: C.fg },
  genTitle: { fontSize: 20, fontWeight: '700', letterSpacing: -0.5, marginTop: 28, marginBottom: 12 },
  genMsg: { fontSize: 14, color: C.fg3 },

  readyLabel: { fontSize: 13, fontWeight: '500', color: C.brand, letterSpacing: -0.15, marginBottom: 8, marginTop: 28 },
  revealTitle: { fontSize: 32, fontWeight: '800', letterSpacing: -1.3, marginBottom: 14 },
  revealSub: { fontSize: 15, color: C.fg2, lineHeight: 22.5, marginBottom: 20 },

  profileRow: { flexDirection: 'row', backgroundColor: C.surface, borderRadius: 18, padding: 14, marginBottom: 20, gap: 10 },
  profileCell: { flex: 1 },
  profileCellRight: { borderLeftWidth: 1, borderLeftColor: 'rgba(0,0,0,0.07)', paddingLeft: 12 },
  cellLabel: { fontSize: 10, fontWeight: '500', color: C.fg3, textTransform: 'uppercase', letterSpacing: 0.7, marginBottom: 5 },
  cellValue: { fontSize: 14, fontWeight: '600' },

  scheduleCard: { backgroundColor: '#fff', borderRadius: 18, padding: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)', marginBottom: 16 },
  scheduleTitle: { fontSize: 14, fontWeight: '600', letterSpacing: -0.15, marginBottom: 14 },
  scheduleRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 9 },
  scheduleRowBorder: { borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  scheduleNum: { width: 24, height: 24, borderRadius: 99, backgroundColor: C.surface2, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  scheduleNumActive: { backgroundColor: C.brand },
  scheduleNumText: { fontSize: 11, fontWeight: '500', color: C.fg3 },
  scheduleDay: { flex: 1, fontSize: 14, fontWeight: '400', color: C.fg2, letterSpacing: -0.15 },
  scheduleDayActive: { fontWeight: '600', color: C.fg },
  todayBadge: { backgroundColor: C.brandSoft, borderRadius: 99, paddingHorizontal: 9, paddingVertical: 3 },
  todayText: { fontSize: 11, fontWeight: '500', color: C.brand },

  day1Card: { backgroundColor: C.brand, borderRadius: 20, padding: 18, marginBottom: 4 },
  day1Label: { fontSize: 10, fontWeight: '500', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  day1Name: { fontSize: 20, fontWeight: '700', color: '#fff', letterSpacing: -0.5, marginBottom: 4 },
  day1Focus: { fontSize: 13, color: 'rgba(255,255,255,0.65)' },
});
