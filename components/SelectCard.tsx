import { Pressable, View, Text, StyleSheet } from 'react-native';
import { C } from '@/constants/colors';

type Props = { label: string; sub: string; selected: boolean; onPress: () => void };

export function SelectCard({ label, sub, selected, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.card, selected && styles.selected]}>
      <View style={styles.text}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.sub}>{sub}</Text>
      </View>
      <View style={[styles.radio, selected && styles.radioSelected]}>
        {selected && (
          <View style={styles.radioDot} />
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%', padding: 14, borderRadius: 16,
    borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.08)',
    backgroundColor: '#fff', flexDirection: 'row',
    alignItems: 'center', justifyContent: 'space-between', gap: 12, marginBottom: 10,
  },
  selected: { borderColor: C.brand, backgroundColor: C.brandSoft },
  text: { flex: 1 },
  label: { fontSize: 15, fontWeight: '600', color: C.fg, marginBottom: 3, letterSpacing: -0.15 },
  sub: { fontSize: 13, fontWeight: '400', color: C.fg2 },
  radio: {
    width: 20, height: 20, borderRadius: 10,
    borderWidth: 2, borderColor: 'rgba(0,0,0,0.15)',
    alignItems: 'center', justifyContent: 'center',
  },
  radioSelected: { borderColor: C.brand, backgroundColor: C.brand },
  radioDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#fff' },
});
