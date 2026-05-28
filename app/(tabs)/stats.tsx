import { View, Text, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { C } from '@/constants/colors';
import { StatCard } from '@/components/StatCard';

const MILESTONES = ['Week 1', 'First PR', 'Week 2', '30-day', 'Top 25%'];
const PRS = [
  ['Bench Press',    '165 lbs', '+10'],
  ['Squat',          '205 lbs', '+15'],
  ['Overhead Press', '105 lbs', '+5'],
];

export default function StatsScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Stats</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* Bio age hero */}
        <View style={styles.bioCard}>
          <Text style={styles.bioTag}>Biological age</Text>
          <View style={styles.bioRow}>
            <Text style={styles.bioAge}>26</Text>
            <View style={styles.bioMeta}>
              <Text style={styles.bioReal}>chronological: 28</Text>
              <Text style={styles.bioDiff}>↓ 2 years younger</Text>
            </View>
          </View>
          <Text style={styles.bioSub}>
            Based on recovery speed, HRV trends, and strength progression over 14 days.
          </Text>
        </View>

        {/* Stats grid */}
        <View style={styles.grid}>
          <StatCard label="Recovery Speed" value="87" unit="%" sub="Improving ↑" color={C.brand} style={styles.gridCell} />
          <StatCard label="Consistency"    value="72" unit="%" sub="5 of 7 days"                 style={styles.gridCell} />
          <StatCard label="Strength %ile"  value="Top 34"      sub="All BASE users"              style={styles.gridCell} />
          <StatCard label="New PRs"        value="3"           sub="This month" color={C.brand}  style={styles.gridCell} />
        </View>

        {/* Progress track */}
        <View style={styles.progressCard}>
          <Text style={styles.progressTitle}>Base Camp progress</Text>
          <View style={styles.trackWrap}>
            <View style={styles.track}>
              <View style={styles.trackFill} />
              <View style={styles.trackDot} />
            </View>
          </View>
          <View style={styles.milestones}>
            {MILESTONES.map((m, i) => (
              <View key={i} style={styles.milestone}>
                <View style={[styles.milestoneDot, i === 0 && styles.milestoneDotActive]} />
                <Text style={[styles.milestoneLabel, i === 0 && styles.milestoneLabelActive]}>{m}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Personal records */}
        <View style={styles.prCard}>
          <Text style={styles.prTitle}>Personal records</Text>
          {PRS.map(([name, val, diff]) => (
            <View key={name} style={styles.prRow}>
              <Text style={styles.prName}>{name}</Text>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={styles.prVal}>{val}</Text>
                <Text style={styles.prDiff}>↑ +{diff} lbs</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  header: { height: 52, justifyContent: 'center', paddingHorizontal: 20 },
  headerTitle: { fontSize: 17, fontWeight: '600', letterSpacing: -0.4 },
  scroll: { paddingHorizontal: 20, paddingBottom: 32 },

  bioCard: { backgroundColor: C.brandSoft, borderRadius: 22, padding: 20, marginBottom: 12 },
  bioTag: { fontSize: 10, fontWeight: '500', color: C.brandHover, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },
  bioRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 12, marginBottom: 10 },
  bioAge: { fontSize: 56, fontWeight: '800', letterSpacing: -2, color: C.brand, lineHeight: 56 },
  bioMeta: { paddingBottom: 6 },
  bioReal: { fontSize: 14, color: C.fg2, lineHeight: 18 },
  bioDiff: { fontSize: 13, fontWeight: '700', color: C.brand, marginTop: 3 },
  bioSub: { fontSize: 13, color: C.fg2, lineHeight: 19.5 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 12 },
  gridCell: { minWidth: '47%', minHeight: 84 },

  progressCard: { backgroundColor: C.surface, borderRadius: 20, padding: 16, marginBottom: 12 },
  progressTitle: { fontSize: 15, fontWeight: '600', letterSpacing: -0.3, marginBottom: 18 },
  trackWrap: { marginBottom: 22 },
  track: { height: 5, backgroundColor: C.surface2, borderRadius: 99, position: 'relative' },
  trackFill: { position: 'absolute', left: 0, top: 0, bottom: 0, width: '21%', backgroundColor: C.brand, borderRadius: 99 },
  trackDot: { position: 'absolute', left: '21%', top: '50%', marginTop: -7, marginLeft: -7, width: 14, height: 14, borderRadius: 99, backgroundColor: C.brand, borderWidth: 2.5, borderColor: '#fff' },
  milestones: { flexDirection: 'row', justifyContent: 'space-between' },
  milestone: { flex: 1, alignItems: 'center', gap: 5 },
  milestoneDot: { width: 7, height: 7, borderRadius: 99, backgroundColor: 'rgba(0,0,0,0.12)', borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.15)' },
  milestoneDotActive: { backgroundColor: C.brand, borderColor: C.brand },
  milestoneLabel: { fontSize: 9, fontWeight: '500', color: C.fg3, textAlign: 'center', letterSpacing: 0.15 },
  milestoneLabelActive: { color: C.brand },

  prCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)' },
  prTitle: { fontSize: 15, fontWeight: '600', letterSpacing: -0.3, marginBottom: 12 },
  prRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 11, borderBottomWidth: 1, borderBottomColor: 'rgba(0,0,0,0.05)' },
  prName: { fontSize: 14, fontWeight: '500' },
  prVal: { fontSize: 14, fontWeight: '700', letterSpacing: -0.2 },
  prDiff: { fontSize: 11, fontWeight: '600', color: C.brand, marginTop: 2 },
});
