import { useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { C } from '@/constants/colors';
import { DAY1_WORKOUTS } from '@/constants/workouts';
import { MUSCLE_F, MUSCLE_B, JOINTS } from '@/constants/bodymap';
import { BtnP } from '@/components/Button';
import { Stepper } from '@/components/Stepper';
import { Sheet } from '@/components/Sheet';
import { BodyMap } from '@/components/BodyMap';
import { Chip } from '@/components/Chip';

const DAY = 1;
const EXPERIENCE = 'beginner';

export default function WorkoutScreen() {
  const workout = DAY1_WORKOUTS[EXPERIENCE];

  const [weights,  setWeights]  = useState<Record<string, number>>(
    Object.fromEntries(workout.exercises.map(e => [e.id, e.wt]))
  );
  const [setsDone, setSetsDone] = useState<Record<string, number>>(
    Object.fromEntries(workout.exercises.map(e => [e.id, 0]))
  );
  const [checkin,  setCheckin]  = useState(false);
  const [view,     setView]     = useState<'front' | 'back'>('front');
  const [mode,     setMode]     = useState<'muscles' | 'joints'>('muscles');
  const [sore,     setSore]     = useState<string[]>([]);

  const exDone  = (id: string) => setsDone[id] >= (workout.exercises.find(e => e.id === id)?.sets ?? 3);
  const allDone = workout.exercises.every(e => exDone(e.id));

  const logSet = (id: string) => {
    const max = workout.exercises.find(e => e.id === id)?.sets ?? 3;
    setSetsDone(p => ({ ...p, [id]: Math.min(p[id] + 1, max) }));
  };

  const allMuscles = [...new Set(workout.exercises.flatMap(e => e.muscles))];
  const curList    = mode === 'muscles' ? (view === 'front' ? MUSCLE_F : MUSCLE_B) : JOINTS;
  const toggleSore = (id: string) => setSore(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <SafeAreaView style={styles.screen}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Day {DAY} of 14</Text>
        <Text style={styles.headerSub}>Base Camp</Text>
      </View>

      {/* Progress bar */}
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${(DAY / 14) * 100}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.tag}>Today's workout</Text>
        <Text style={styles.workoutName}>{workout.name}</Text>
        <Text style={styles.workoutFocus}>{workout.focus}</Text>

        {workout.exercises.map(ex => {
          const done      = exDone(ex.id);
          const completed = setsDone[ex.id];
          const wt        = weights[ex.id];

          return (
            <View key={ex.id} style={[styles.card, done && styles.cardDone]}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.exName}>{ex.name}</Text>
                  <Text style={styles.exSets}>{ex.sets} sets × {ex.reps} reps</Text>
                </View>
                {done && (
                  <View style={styles.checkCircle}>
                    <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>✓</Text>
                  </View>
                )}
              </View>

              <View style={[styles.tip, done && styles.tipDone]}>
                <Text style={[styles.tipText, done && styles.tipTextDone]}>{ex.tip}</Text>
              </View>

              <View style={styles.cardFooter}>
                <View>
                  <Text style={styles.footerLabel}>Your weight</Text>
                  {wt === 0
                    ? <Text style={styles.bwText}>Bodyweight</Text>
                    : <Stepper val={wt} onChange={v => setWeights(p => ({ ...p, [ex.id]: v }))} unit="lbs" />
                  }
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={styles.footerLabel}>Sets done</Text>
                  <View style={styles.dotsRow}>
                    {Array.from({ length: ex.sets }, (_, j) => (
                      <View key={j} style={[styles.setDot, j < completed && styles.setDotFilled]} />
                    ))}
                  </View>
                </View>
              </View>

              {!done && (
                <Pressable onPress={() => logSet(ex.id)} style={styles.logBtn}>
                  <Text style={styles.logBtnText}>Log set {completed + 1} of {ex.sets}</Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={styles.footer}>
        <BtnP onPress={() => allDone && setCheckin(true)} disabled={!allDone}>
          {allDone ? 'Done — body check-in →' : 'Complete all exercises first'}
        </BtnP>
      </View>

      <Sheet open={checkin} onClose={() => setCheckin(false)} title="How's your body feeling?">
        <View style={styles.sheetBody}>
          <View style={styles.toggleRow}>
            {(['muscles', 'joints'] as const).map(m => (
              <Pressable key={m} onPress={() => setMode(m)} style={[styles.toggle, mode === m && styles.toggleActive]}>
                <Text style={[styles.toggleText, mode === m && styles.toggleTextActive]}>{m}</Text>
              </Pressable>
            ))}
          </View>
          <View style={styles.viewRow}>
            {(['front', 'back'] as const).map(v => (
              <Pressable key={v} onPress={() => setView(v)} style={[styles.viewBtn, view === v && styles.viewBtnActive]}>
                <Text style={styles.viewBtnText}>{v}</Text>
              </Pressable>
            ))}
          </View>
          <BodyMap activated={allMuscles} sore={sore} onToggle={toggleSore} view={view} mode={mode} />
          <Text style={styles.soreLabel}>Tap what's sore (or skip)</Text>
          <View style={styles.chips}>
            {curList.map(item => (
              <Chip key={item.id} label={item.label} active={sore.includes(item.id)} onPress={() => toggleSore(item.id)} />
            ))}
          </View>
          <BtnP onPress={() => { setCheckin(false); router.replace('/(tabs)'); }}>All done</BtnP>
          <View style={{ height: 16 }} />
        </View>
      </Sheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 52 },
  headerTitle: { fontSize: 17, fontWeight: '600', letterSpacing: -0.4 },
  headerSub: { fontSize: 12, fontWeight: '500', color: C.fg3 },
  progressWrap: { paddingHorizontal: 20, paddingBottom: 14 },
  progressTrack: { height: 4, backgroundColor: C.surface2, borderRadius: 99 },
  progressFill: { height: '100%', backgroundColor: C.brand, borderRadius: 99 },

  scroll: { paddingHorizontal: 20, paddingBottom: 28 },
  tag: { fontSize: 12, fontWeight: '500', color: C.brand, marginBottom: 6 },
  workoutName: { fontSize: 22, fontWeight: '700', letterSpacing: -0.8, marginBottom: 4 },
  workoutFocus: { fontSize: 14, color: C.fg2, marginBottom: 20 },

  card: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 12, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.07)' },
  cardDone: { backgroundColor: C.brandSoft, borderColor: C.brand },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  exName: { fontSize: 16, fontWeight: '600', letterSpacing: -0.3, marginBottom: 4 },
  exSets: { fontSize: 12, color: C.fg3 },
  checkCircle: { width: 28, height: 28, borderRadius: 99, backgroundColor: C.brand, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },

  tip: { backgroundColor: C.surface, borderRadius: 10, padding: 10, marginBottom: 12 },
  tipDone: { backgroundColor: 'rgba(29,158,117,0.08)' },
  tipText: { fontSize: 12, color: C.fg2, lineHeight: 17 },
  tipTextDone: { color: C.brandHover },

  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  footerLabel: { fontSize: 10, fontWeight: '500', color: C.fg3, textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 7 },
  bwText: { fontSize: 15, fontWeight: '600', color: C.fg2 },
  dotsRow: { flexDirection: 'row', gap: 5, alignItems: 'center' },
  setDot: { width: 22, height: 22, borderRadius: 99, backgroundColor: C.surface2, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.1)' },
  setDotFilled: { backgroundColor: C.brand, borderColor: C.brand },

  logBtn: { marginTop: 14, height: 40, borderRadius: 11, backgroundColor: C.brand, alignItems: 'center', justifyContent: 'center' },
  logBtnText: { fontSize: 14, fontWeight: '600', color: '#fff' },

  footer: { paddingHorizontal: 20, paddingBottom: 30, paddingTop: 12, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: 'rgba(0,0,0,0.06)' },

  sheetBody: { padding: 20 },
  toggleRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  toggle: { flex: 1, height: 34, borderRadius: 99, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.1)', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  toggleActive: { backgroundColor: C.brand, borderColor: C.brand },
  toggleText: { fontSize: 13, fontWeight: '600', color: C.fg2, textTransform: 'capitalize' },
  toggleTextActive: { color: '#fff' },
  viewRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  viewBtn: { flex: 1, height: 30, borderRadius: 99, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.07)', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  viewBtnActive: { backgroundColor: C.surface2, borderColor: 'rgba(0,0,0,0.2)' },
  viewBtnText: { fontSize: 12, fontWeight: '500', color: C.fg2, textTransform: 'capitalize' },
  soreLabel: { fontSize: 10, fontWeight: '500', color: C.fg3, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 12, marginBottom: 9 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 20 },
});
