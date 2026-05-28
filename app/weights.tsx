import { useState } from 'react';
import { View, Text, ScrollView, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { C } from '@/constants/colors';
import { BtnP } from '@/components/Button';

const INIT = [
  { name: 'Bench Press',    rec: 155, unit: 'lbs', tag: 'Progressing', reason: 'Up 5 lbs from last session. Form was strong.' },
  { name: 'Overhead Press', rec: 95,  unit: 'lbs', tag: 'Hold steady', reason: 'Recovery is moderate — stay here to lock in the pattern.' },
  { name: 'Dips',           rec: 0,   unit: 'BW',  tag: 'Stay light',  reason: 'Body is still adapting. Bodyweight keeps the quality high.' },
];

const TAG_STYLES: Record<string, { bg: string; color: string }> = {
  'Progressing': { bg: '#E6F7F1', color: C.brand },
  'Hold steady': { bg: '#FEF9EC', color: '#D97706' },
  'Stay light':  { bg: C.surface, color: C.fg3 },
};

export default function WeightsScreen() {
  const [items, setItems] = useState(INIT.map(x => ({ ...x, accepted: false })));
  const accept    = (i: number) => setItems(p => p.map((x, j) => j === i ? { ...x, accepted: true } : x));
  const acceptAll = ()          => setItems(p => p.map(x => ({ ...x, accepted: true })));
  const allDone   = items.every(x => x.accepted);

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Today's weights</Text>
        <View style={{ width: 64 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.intro}>Based on your recovery, last session, and current goal.</Text>

        {items.map((ex, i) => {
          const ts = TAG_STYLES[ex.tag] ?? TAG_STYLES['Stay light'];
          return (
            <View key={ex.name} style={[styles.card, ex.accepted && styles.cardAccepted]}>
              <View style={styles.cardTop}>
                <View>
                  <Text style={styles.exName}>{ex.name}</Text>
                  <View style={[styles.tag, { backgroundColor: ts.bg }]}>
                    <Text style={[styles.tagText, { color: ts.color }]}>{ex.tag}</Text>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={[styles.weight, ex.accepted && { color: C.brand }]}>
                    {ex.rec > 0 ? ex.rec : 'BW'}
                  </Text>
                  <Text style={styles.unit}>{ex.unit}</Text>
                </View>
              </View>

              <Text style={styles.reason}>{ex.reason}</Text>

              {!ex.accepted ? (
                <View style={styles.actions}>
                  <Pressable onPress={() => accept(i)} style={styles.acceptBtn}>
                    <Text style={styles.acceptText}>Accept</Text>
                  </Pressable>
                  <Pressable style={styles.adjustBtn}>
                    <Text style={styles.adjustText}>Adjust</Text>
                  </Pressable>
                </View>
              ) : (
                <View style={styles.accepted}>
                  <View style={styles.acceptedDot}>
                    <Text style={{ color: '#fff', fontSize: 10, fontWeight: '700' }}>✓</Text>
                  </View>
                  <Text style={styles.acceptedText}>Accepted</Text>
                </View>
              )}
            </View>
          );
        })}

        <View style={{ marginTop: 8 }}>
          <BtnP onPress={acceptAll} disabled={allDone}>
            {allDone ? 'All set — start your workout' : 'Accept all recommendations'}
          </BtnP>
        </View>
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
  intro: { fontSize: 14, color: C.fg2, lineHeight: 21, marginBottom: 20 },

  card: { backgroundColor: '#fff', borderRadius: 20, padding: 16, marginBottom: 10, borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.07)' },
  cardAccepted: { backgroundColor: C.brandSoft, borderColor: C.brand },
  cardTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 },
  exName: { fontSize: 16, fontWeight: '600', letterSpacing: -0.3, marginBottom: 7 },
  tag: { borderRadius: 99, paddingHorizontal: 10, paddingVertical: 4, alignSelf: 'flex-start' },
  tagText: { fontSize: 11, fontWeight: '600', letterSpacing: 0.3 },
  weight: { fontSize: 30, fontWeight: '800', letterSpacing: -1.3, color: C.fg },
  unit: { fontSize: 12, fontWeight: '500', color: C.fg3, marginTop: 2 },
  reason: { fontSize: 13, color: C.fg2, lineHeight: 19, marginBottom: 12 },

  actions: { flexDirection: 'row', gap: 8 },
  acceptBtn: { flex: 1, height: 38, borderRadius: 10, backgroundColor: C.brand, alignItems: 'center', justifyContent: 'center' },
  acceptText: { fontSize: 13, fontWeight: '600', color: '#fff' },
  adjustBtn: { flex: 1, height: 38, borderRadius: 10, backgroundColor: C.surface, alignItems: 'center', justifyContent: 'center' },
  adjustText: { fontSize: 13, fontWeight: '600', color: C.fg2 },

  accepted: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  acceptedDot: { width: 20, height: 20, borderRadius: 99, backgroundColor: C.brand, alignItems: 'center', justifyContent: 'center' },
  acceptedText: { fontSize: 13, fontWeight: '500', color: C.brand },
});
