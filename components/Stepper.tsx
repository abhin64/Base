import { View, Text, Pressable, StyleSheet } from 'react-native';
import { C } from '@/constants/colors';

type Props = { val: number; onChange: (v: number) => void; min?: number; unit?: string };

export function Stepper({ val, onChange, min = 0, unit }: Props) {
  const step = unit === 'lbs' ? 5 : 1;
  return (
    <View style={styles.row}>
      <Pressable onPress={() => onChange(Math.max(min, val - step))} style={[styles.btn, styles.left]}>
        <Text style={styles.btnText}>−</Text>
      </Pressable>
      <View style={styles.display}>
        <Text style={styles.val}>{val > 0 ? val : 'BW'}</Text>
        {unit && val > 0 && <Text style={styles.unit}>{unit}</Text>}
      </View>
      <Pressable onPress={() => onChange(val + step)} style={[styles.btn, styles.right]}>
        <Text style={[styles.btnText, { color: C.brand }]}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
  btn: {
    width: 34, height: 34, backgroundColor: C.surface,
    borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.09)',
    alignItems: 'center', justifyContent: 'center',
  },
  left: { borderRadius: 9, borderTopRightRadius: 0, borderBottomRightRadius: 0 },
  right: { borderRadius: 9, borderTopLeftRadius: 0, borderBottomLeftRadius: 0 },
  btnText: { fontSize: 18, fontWeight: '600', color: C.fg2 },
  display: {
    minWidth: 52, height: 34, backgroundColor: C.surface,
    borderTopWidth: 1.5, borderBottomWidth: 1.5, borderColor: 'rgba(0,0,0,0.09)',
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3,
  },
  val: { fontSize: 14, fontWeight: '600', letterSpacing: -0.2 },
  unit: { fontSize: 11, fontWeight: '400', color: C.fg3 },
});
