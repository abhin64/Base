import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { C } from '@/constants/colors';

type Props = { children: React.ReactNode; onPress?: () => void; disabled?: boolean; style?: ViewStyle };

export function BtnP({ children, onPress, disabled, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [styles.primary, disabled && styles.disabled, pressed && styles.pressed, style]}
    >
      <Text style={styles.primaryText}>{children}</Text>
    </Pressable>
  );
}

export function BtnS({ children, onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.secondary, pressed && styles.pressed, style]}>
      <Text style={styles.secondaryText}>{children}</Text>
    </Pressable>
  );
}

export function BtnG({ children, onPress, style }: Props) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.ghost, pressed && styles.pressed, style]}>
      <Text style={styles.ghostText}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: C.brand, height: 52, borderRadius: 14,
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8,
  },
  primaryText: { color: '#fff', fontSize: 16, fontWeight: '600', letterSpacing: -0.2 },
  secondary: {
    backgroundColor: 'transparent', height: 48, borderRadius: 14,
    borderWidth: 1.5, borderColor: C.brand,
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 8,
  },
  secondaryText: { color: C.brand, fontSize: 15, fontWeight: '600' },
  ghost: {
    backgroundColor: 'transparent', height: 40,
    alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6,
  },
  ghostText: { color: C.fg2, fontSize: 14, fontWeight: '500' },
  disabled: { opacity: 0.4 },
  pressed: { opacity: 0.82, transform: [{ scale: 0.98 }] },
});
