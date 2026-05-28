import { useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { C } from '@/constants/colors';
import { MUSCLE_F, MUSCLE_B, JOINTS } from '@/constants/bodymap';
import { BtnP, BtnG } from '@/components/Button';
import { BodyMap } from '@/components/BodyMap';
import { Chip } from '@/components/Chip';

const RUN_MUSCLES = ['quads', 'hamstrings', 'calves', 'glutes'];
const STATS = [['Peak HR', '168 bpm'], ['Avg pace', '6:12 /km'], ['Calories', '~280 kcal']];

export default function ActivityScreen() {
  const [view, setView] = useState<'front' | 'back'>('front');
  const [mode, setMode] = useState<'muscles' | 'joints'>('muscles');
  const [sore, setSore] = useState<string[]>([]);

  const curList    = mode === 'muscles' ? (view === 'front' ? MUSCLE_F : MUSCLE_B) : JOINTS;
  const toggleSore = (id: string) => setSore(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Activity detected</Text>
        <View style={{ width: 64 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Detection card */}
        <View style={styles.detectionCard}>
          <View style={styles.detectionTop}>
            <View style={styles.detectionIcon}>
              <Text style={{ fontSize: 22 }}>🏃</Text>
            </View>
            <View>
              <Text style={styles.detectionName}>Outdoor run</Text>
              <Text style={styles.detectionMeta}>32 min · 3.2 km detected via watch</Text>
            </View>
          </View>
          <View style={styles.statsRow}>
            {STATS.map(([l, v]) => (
              <View key={l} style={styles.statCell}>
                <Text style={styles.statLabel}>{l}</Text>
                <Text style={styles.statVal}>{v}</Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>How does your body feel?</Text>

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

        <BodyMap activated={RUN_MUSCLES} sore={sore} onToggle={toggleSore} view={view} mode={mode} />

        <Text style={styles.soreLabel}>Tap what's sore</Text>
        <View style={styles.chips}>
          {curList.map(item => (
            <Chip key={item.id} label={item.label} active={sore.includes(item.id)} onPress={() => toggleSore(item.id)} />
          ))}
        </View>

        <BtnP onPress={() => router.back()}>Log it — looks right</BtnP>
        <View style={{ height: 8 }} />
        <BtnG onPress={() => router.back()}>Skip this time</BtnG>
        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  header: { height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  back: { paddingVertical: 8 },
  backText: { fontSize: 15, fontWeight: '500', color: C.brand },
  headerTitle: { fontSize: 17, fontWeight: '600', letterSpacing: -0.4 },
  scroll: { paddingHorizontal: 20, paddingBottom: 36 },

  detectionCard: { backgroundColor: C.surface, borderRadius: 20, padding: 18, marginBottom: 20, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)' },
  detectionTop: { flexDirection: 'row', gap: 14, alignItems: 'center', marginBottom: 16 },
  detectionIcon: { width: 50, height: 50, borderRadius: 14, backgroundColor: C.brandSoft, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  detectionName: { fontSize: 18, fontWeight: '700', letterSpacing: -0.5, marginBottom: 4 },
  detectionMeta: { fontSize: 13, color: C.fg2 },
  statsRow: { flexDirection: 'row', gap: 8 },
  statCell: { flex: 1, backgroundColor: '#fff', borderRadius: 10, padding: 10, borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' },
  statLabel: { fontSize: 10, fontWeight: '500', color: C.fg3, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 4 },
  statVal: { fontSize: 13, fontWeight: '700', letterSpacing: -0.2 },

  sectionTitle: { fontSize: 16, fontWeight: '600', letterSpacing: -0.3, marginBottom: 14 },
  toggleRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  toggle: { flex: 1, height: 34, borderRadius: 99, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.1)', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  toggleActive: { backgroundColor: C.brand, borderColor: C.brand },
  toggleText: { fontSize: 13, fontWeight: '600', color: C.fg2, textTransform: 'capitalize' },
  toggleTextActive: { color: '#fff' },
  viewRow: { flexDirection: 'row', gap: 8, marginBottom: 14 },
  viewBtn: { flex: 1, height: 30, borderRadius: 99, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.07)', backgroundColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  viewBtnActive: { backgroundColor: C.surface2, borderColor: 'rgba(0,0,0,0.2)' },
  viewBtnText: { fontSize: 12, fontWeight: '500', color: C.fg2, textTransform: 'capitalize' },
  soreLabel: { fontSize: 10, fontWeight: '500', color: C.fg3, textTransform: 'uppercase', letterSpacing: 0.8, marginTop: 14, marginBottom: 10 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 7, marginBottom: 24 },
});
