import { View, Text, ScrollView, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { C } from '@/constants/colors';
import { StatCard } from '@/components/StatCard';
import { BtnS } from '@/components/Button';

export default function RecapScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Week 1 recap</Text>
        <View style={{ width: 64 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.heroTag}>Week 1 complete</Text>
          <Text style={styles.heroNum}>5</Text>
          <Text style={styles.heroSub}>workouts logged.</Text>
          <Text style={styles.heroBody}>You showed up when it counted. That's the whole thing.</Text>
          <View style={[styles.orb, { right: -32, bottom: -32, width: 150, height: 150, opacity: 0.07 }]} />
          <View style={[styles.orb, { right: 60, top: -20, width: 80, height: 80, opacity: 0.05 }]} />
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StatCard label="Consistency" value="71%" sub="5 of 7 days" color={C.brand} />
          <StatCard label="Recovery"    value="↑ up" sub="Trending better" />
          <StatCard label="Avg Ready"   value="78"   sub="Strong week" />
        </View>

        {/* Biggest improvement */}
        <View style={styles.improvCard}>
          <Text style={styles.improvLabel}>Biggest improvement</Text>
          <View style={styles.improvRow}>
            <View>
              <Text style={styles.improvName}>Bench Press</Text>
              <Text style={styles.improvRange}>145 → 165 lbs</Text>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <Text style={styles.improvNum}>+20</Text>
              <Text style={styles.improvUnit}>lbs</Text>
            </View>
          </View>
        </View>

        {/* Quote */}
        <View style={styles.quoteCard}>
          <Text style={styles.quoteText}>
            "Your body learns faster than you think. Keep showing it what you can do."
          </Text>
          <Text style={styles.quoteMeta}>BASE · Week 1 analysis</Text>
        </View>

        <BtnS onPress={() => {}}>Share this recap</BtnS>
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

  hero: { backgroundColor: C.brand, borderRadius: 24, padding: 22, marginBottom: 12, overflow: 'hidden', position: 'relative' },
  heroTag: { fontSize: 10, fontWeight: '500', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },
  heroNum: { fontSize: 60, fontWeight: '800', letterSpacing: -2, color: '#fff', lineHeight: 60, marginBottom: 4 },
  heroSub: { fontSize: 18, fontWeight: '600', color: '#fff', letterSpacing: -0.5, marginBottom: 12 },
  heroBody: { fontSize: 14, color: 'rgba(255,255,255,0.72)', lineHeight: 21 },
  orb: { position: 'absolute', borderRadius: 99, backgroundColor: '#fff' },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },

  improvCard: { backgroundColor: C.surface, borderRadius: 20, padding: 16, marginBottom: 12 },
  improvLabel: { fontSize: 10, fontWeight: '500', color: C.fg3, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 },
  improvRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  improvName: { fontSize: 18, fontWeight: '700', letterSpacing: -0.5, marginBottom: 3 },
  improvRange: { fontSize: 13, color: C.fg2 },
  improvNum: { fontSize: 30, fontWeight: '800', letterSpacing: -1.3, color: C.brand },
  improvUnit: { fontSize: 12, fontWeight: '500', color: C.fg3 },

  quoteCard: { backgroundColor: C.dark, borderRadius: 20, padding: 18, marginBottom: 20 },
  quoteText: { fontSize: 15, fontWeight: '600', color: '#fff', lineHeight: 22.5, letterSpacing: -0.2, marginBottom: 10 },
  quoteMeta: { fontSize: 11, fontWeight: '500', color: 'rgba(255,255,255,0.3)' },
});
