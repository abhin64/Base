import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { C } from '@/constants/colors';

type Props = {
  value: number; max?: number; size?: number; stroke?: number;
  color?: string; bg?: string; children?: React.ReactNode;
};

export function Ring({ value, max = 100, size = 96, stroke = 7, color = C.brand, bg = C.brandSoft, children }: Props) {
  const r = (size - stroke) / 2;
  const circ = r * 2 * Math.PI;
  const off = circ - (value / max) * circ;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} style={{ position: 'absolute', transform: [{ rotate: '-90deg' }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={bg} strokeWidth={stroke} />
        <Circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
          strokeDasharray={circ} strokeDashoffset={off} strokeLinecap="round" />
      </Svg>
      <View style={{ position: 'absolute', inset: 0, alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </View>
    </View>
  );
}
