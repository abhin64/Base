import { Pressable, Text, StyleSheet } from 'react-native';
import { C } from '@/constants/colors';

type Props = { label: string; active?: boolean; onPress?: () => void };

export function Chip({ label, active, onPress }: Props) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, active && styles.active]}>
      <Text style={[styles.label, active && styles.activeLabel]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    height: 32, paddingHorizontal: 13, borderRadius: 999,
    borderWidth: 1.5, borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center',
  },
  active: { backgroundColor: C.brand, borderColor: C.brand },
  label: { fontSize: 13, fontWeight: '500', color: C.fg2 },
  activeLabel: { color: '#fff' },
});
