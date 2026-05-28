import { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, StyleSheet, Animated } from 'react-native';
import { router } from 'expo-router';
import { C } from '@/constants/colors';
import { Ring } from '@/components/Ring';
import { StatCard } from '@/components/StatCard';

function greet() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning,' : h < 17 ? 'Good afternoon,' : 'Good evening,';
}

export default function HomeScreen() {
  const [notif, setNotif] = useState(false);
  const dropAnim = useState(new Animated.Value(-80))[0];

  useEffect(() => {
    const t = setTimeout(() => {
      setNotif(true);
      Animated.spring(dropAnim, { toValue: 0, useNativeDriver: true, damping: 18, stiffness: 180 }).start();
    }, 2800);
    return () => clearTimeout(t);
  }, []);

  const dismissNotif = () => {
    Animated.timing(dropAnim, { toValue: -80, useNativeDriver: true, duration: 200 }).start(() => setNotif(false));
  };

  return (
    <SafeAreaView style={styles.screen}>
      {notif && (
        <Animated.View style={[styles.notifWrap, { transform: [{ translateY: dropAnim }] }]}>
          <Pressable onPress={() => { dismissNotif(); router.push('/activity'); }} style={styles.notif}>
            <View style={styles.notifIcon}>
              <Text style={{ fontSize: 18 }}>⌚</Text>
            </View>
            <View style={styles.notifText}>
              <Text style={styles.notifTitle}>Activity detected</Text>
              <Text style={styles.notifSub}>Looks like a run. Tap to log it.</Text>
            </View>
            <Pressable onPress={dismissNotif} style={styles.notifClose}>
              <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 16, fontWeight: '600' }}>×</Text>
            </Pressable>
          </Pressable>
        </Animated.View>
      )}

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.greeting}>
          <Text style={styles.greetSub}>{greet()}</Text>
          <Text style={styles.greetName}>Sam.</Text>
        </View>

        {/* Readiness card */}
        <View style={styles.readinessCard}>
          <Ring value={82} size={86} stroke={7}>
            <Text style={styles.readinessScore}>82</Text>
          </Ring>
          <View style={{ flex: 1 }}>
            <Text style={styles.readinessTitle}>Ready to train.</Text>
            <Text style={styles.readinessSub}>Recovery is strong. Good day to push.</Text>
            <View style={styles.readinessDot}>
              <View style={styles.dot} />
              <Text style={styles.dotLabel}>Readiness score</Text>
            </View>
          </View>
        </View>

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatCard label="Bio Age" value="26" sub="↓ 2 from real" color={C.brand} />
          <StatCard label="Body Battery" value="78%" sub="High energy" />
          <StatCard label="Streak" value="5" unit="d" sub="Best: 12" />
        </View>

        {/* Today's workout */}
        <Pressable onPress={() => router.push('/weights')} style={styles.workoutCard}>
          <Text style={styles.workoutTag}>Today · Strength</Text>
          <Text style={styles.workoutName}>Upper Body Push</Text>
          <Text style={styles.workoutExs}>Bench Press · Overhead Press · Dips</Text>
          <View style={styles.workoutCta}>
            <Text style={styles.workoutCtaText}>See weights  →</Text>
          </View>
          <View style={[styles.orb, { right: -28, top: -28, width: 120, height: 120, opacity: 0.07 }]} />
          <View style={[styles.orb, { right: 40, bottom: -40, width: 80, height: 80, opacity: 0.05 }]} />
        </Pressable>

        {/* Base Camp progress */}
        <View style={styles.progressCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.progressTitle}>Base Camp — Day 3 of 14</Text>
            <View style={styles.progressTrack}>
              <View style={[styles.progressFill, { width: '21%' }]} />
            </View>
          </View>
          <Text style={styles.progressNum}>3</Text>
        </View>

        {/* Quick links */}
        <View style={styles.quickLinks}>
          <Pressable onPress={() => router.push('/recap')} style={styles.quickBtn}>
            <Text style={styles.quickBtnText}>Weekly recap →</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/stats')} style={styles.quickBtn}>
            <Text style={styles.quickBtnText}>Stats →</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  scroll: { paddingHorizontal: 20, paddingBottom: 24 },

  notifWrap: { paddingHorizontal: 16, paddingBottom: 8 },
  notif: { backgroundColor: C.dark, borderRadius: 16, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 12,
    shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.25, shadowRadius: 12 },
  notifIcon: { width: 38, height: 38, borderRadius: 11, backgroundColor: C.brandSoft, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },
  notifText: { flex: 1 },
  notifTitle: { fontSize: 14, fontWeight: '600', color: '#fff', marginBottom: 3 },
  notifSub: { fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 16 },
  notifClose: { width: 22, height: 22, borderRadius: 99, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center', flexShrink: 0 },

  greeting: { paddingTop: 6, marginBottom: 22 },
  greetSub: { fontSize: 15, color: C.fg3, marginBottom: 4 },
  greetName: { fontSize: 30, fontWeight: '800', letterSpacing: -1.1 },

  readinessCard: { backgroundColor: C.brandSoft, borderRadius: 22, padding: 18, marginBottom: 12, flexDirection: 'row', alignItems: 'center', gap: 18 },
  readinessScore: { fontSize: 24, fontWeight: '800', letterSpacing: -1.1, color: C.fg },
  readinessTitle: { fontSize: 19, fontWeight: '700', letterSpacing: -0.6, marginBottom: 5 },
  readinessSub: { fontSize: 13, color: C.fg2, lineHeight: 19, marginBottom: 9 },
  readinessDot: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 7, height: 7, borderRadius: 99, backgroundColor: C.brand },
  dotLabel: { fontSize: 11, fontWeight: '500', color: C.brand },

  statsRow: { flexDirection: 'row', gap: 8, marginBottom: 12 },

  workoutCard: { backgroundColor: C.dark, borderRadius: 22, padding: 18, marginBottom: 12, overflow: 'hidden', position: 'relative' },
  workoutTag: { fontSize: 10, fontWeight: '500', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 },
  workoutName: { fontSize: 20, fontWeight: '700', color: '#fff', letterSpacing: -0.6, marginBottom: 5 },
  workoutExs: { fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 18, marginBottom: 18 },
  workoutCta: { backgroundColor: C.brand, borderRadius: 99, height: 33, paddingHorizontal: 15, alignSelf: 'flex-start', justifyContent: 'center' },
  workoutCtaText: { fontSize: 13, fontWeight: '600', color: '#fff' },
  orb: { position: 'absolute', borderRadius: 99, backgroundColor: C.brand },

  progressCard: { backgroundColor: C.surface, borderRadius: 18, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(0,0,0,0.05)', flexDirection: 'row', alignItems: 'center', gap: 14 },
  progressTitle: { fontSize: 14, fontWeight: '600', letterSpacing: -0.15, marginBottom: 7 },
  progressTrack: { height: 5, backgroundColor: C.surface2, borderRadius: 99 },
  progressFill: { height: '100%', backgroundColor: C.brand, borderRadius: 99 },
  progressNum: { fontSize: 24, fontWeight: '700', color: C.brand, letterSpacing: -0.8, flexShrink: 0 },

  quickLinks: { flexDirection: 'row', gap: 8 },
  quickBtn: { flex: 1, height: 46, borderRadius: 14, backgroundColor: C.surface, borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)', alignItems: 'center', justifyContent: 'center' },
  quickBtnText: { fontSize: 13, fontWeight: '600', color: C.fg },
});
