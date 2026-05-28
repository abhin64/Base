import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { C } from '@/constants/colors';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>S</Text>
        </View>
        <Text style={styles.name}>Sam</Text>
        <Text style={styles.sub}>Base Camp · Day 3 of 14</Text>
        <Text style={styles.note}>Account settings coming soon.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#fff' },
  header: { height: 52, justifyContent: 'center', paddingHorizontal: 20 },
  title: { fontSize: 17, fontWeight: '600', letterSpacing: -0.4 },
  body: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: C.brandSoft, alignItems: 'center', justifyContent: 'center' },
  avatarText: { fontSize: 32, fontWeight: '700', color: C.brand },
  name: { fontSize: 24, fontWeight: '700', letterSpacing: -0.6 },
  sub: { fontSize: 14, color: C.fg2 },
  note: { fontSize: 13, color: C.fg3, marginTop: 8 },
});
