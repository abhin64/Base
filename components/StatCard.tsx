import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { C } from '@/constants/colors';

type Props = {
  label: string; value: string | number; unit?: string;
  sub?: string; color?: string; style?: ViewStyle;
};

export function StatCard({ label, value, unit, sub, color = C.fg, style }: Props) {
  const valStr = String(value);
  return (
    <View style={[styles.card, style]}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Text style={[styles.value, { color, fontSize: valStr.length > 4 ? 18 : 22 }]}>{value}</Text>
        {unit && <Text style={styles.unit}>{unit}</Text>}
      </View>
      {sub && <Text style={styles.sub}>{sub}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: C.surface, borderRadius: 14, padding: 12, flex: 1,
    borderWidth: 1, borderColor: 'rgba(0,0,0,0.06)', gap: 3,
  },
  label: { fontSize: 10, fontWeight: '500', color: C.fg3, textTransform: 'uppercase', letterSpacing: 0.6 },
  row: { flexDirection: 'row', alignItems: 'baseline', gap: 3 },
  value: { fontWeight: '800', letterSpacing: -0.5 },
  unit: { fontSize: 11, fontWeight: '500', color: C.fg3 },
  sub: { fontSize: 11, fontWeight: '500', color: C.fg3, lineHeight: 15 },
});
