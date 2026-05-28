import { View, Pressable, StyleSheet, useWindowDimensions } from 'react-native';
import Svg, { Path, Rect, Circle, Ellipse, Line, G, Text as SvgText } from 'react-native-svg';
import { C } from '@/constants/colors';
import { MUSCLE_F, MUSCLE_B, JOINTS, MuscleGroup, JointGroup } from '@/constants/bodymap';

const ACTIVE_FILL   = '#7ECFB0';
const ACTIVE_STROKE = C.brand;

// ── Silhouette ────────────────────────────────────────────────────────────────

function Silhouette({ view }: { view: 'front' | 'back' }) {
  const bp = { fill: '#FFFFFF', stroke: 'rgba(0,0,0,0.13)', strokeWidth: 1.4 };
  return (
    <>
      <Ellipse cx="80" cy="21" rx="17" ry="19" {...bp} />
      <Path d="M74,37 C72,42 72,50 74,54 L86,54 C88,50 88,42 86,37 Q80,40 74,37Z" {...bp} />
      <Path d="M74,54 C70,54 60,53 50,58 C42,62 33,68 29,77 C26,86 31,95 38,99 C45,103 51,108 54,118 C57,128 57,138 59,149 C61,159 66,167 80,169 C94,167 99,159 101,149 C103,138 103,128 106,118 C109,108 115,103 122,99 C129,95 134,86 131,77 C127,68 118,62 110,58 C100,53 90,54 86,54Z" {...bp} />
      <Path d="M29,77 C23,77 17,87 17,99 C17,113 20,126 24,137 C27,144 30,149 33,153 C37,156 42,154 44,149 C46,142 43,129 43,116 C43,103 43,91 45,83 C46,76 38,74 29,77Z" {...bp} />
      <Path d="M24,137 C19,141 15,154 16,167 C17,178 22,185 28,184 C34,183 37,175 36,163 C35,151 30,140 24,137Z" {...bp} />
      <Ellipse cx="22" cy="185" rx="8" ry="5" {...bp} />
      <Path d="M131,77 C137,77 143,87 143,99 C143,113 140,126 136,137 C133,144 130,149 127,153 C123,156 118,154 116,149 C114,142 117,129 117,116 C117,103 117,91 115,83 C114,76 122,74 131,77Z" {...bp} />
      <Path d="M136,137 C141,141 145,154 144,167 C143,178 138,185 132,184 C126,183 123,175 124,163 C125,151 130,140 136,137Z" {...bp} />
      <Ellipse cx="138" cy="185" rx="8" ry="5" {...bp} />
      <Path d="M59,169 C53,174 48,189 47,206 C46,221 49,234 54,243 C57,249 59,255 59,263 C59,272 58,280 58,286 L72,288 C74,286 74,280 73,272 C72,263 71,255 73,247 C75,239 80,234 80,220 C80,206 80,192 80,180 L59,169Z" {...bp} />
      <Path d="M101,169 C107,174 112,189 113,206 C114,221 111,234 106,243 C103,249 101,255 101,263 C101,272 102,280 102,286 L88,288 C86,286 86,280 87,272 C88,263 89,255 87,247 C85,239 80,234 80,220 C80,206 80,192 80,180 L101,169Z" {...bp} />
      <Ellipse cx="66" cy="286" rx="15" ry="6" {...bp} />
      <Ellipse cx="94" cy="286" rx="15" ry="6" {...bp} />
      {view === 'front' && <>
        <Line x1="80" y1="57" x2="50" y2="69" stroke="rgba(0,0,0,.07)" strokeWidth="1.5" strokeLinecap="round" />
        <Line x1="80" y1="57" x2="110" y2="69" stroke="rgba(0,0,0,.07)" strokeWidth="1.5" strokeLinecap="round" />
        <Line x1="80" y1="58" x2="80" y2="164" stroke="rgba(0,0,0,.04)" strokeWidth="1" strokeLinecap="round" />
      </>}
      {view === 'back' && <>
        <Line x1="80" y1="57" x2="80" y2="150" stroke="rgba(0,0,0,.09)" strokeWidth="2" strokeLinecap="round" />
        <Path d="M57,70 C53,78 53,88 57,94" stroke="rgba(0,0,0,.07)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <Path d="M103,70 C107,78 107,88 103,94" stroke="rgba(0,0,0,.07)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      </>}
    </>
  );
}

// ── Muscle region ─────────────────────────────────────────────────────────────

function MuscleRegion({ muscle, isActive, isSore, onPress }: {
  muscle: MuscleGroup; isActive: boolean; isSore: boolean; onPress: () => void;
}) {
  const fill   = isSore ? C.brand : isActive ? ACTIVE_FILL : 'rgba(29,158,117,0.04)';
  const stroke = (isActive || isSore) ? ACTIVE_STROKE : 'rgba(29,158,117,0.22)';
  const sw     = (isActive || isSore) ? 1.4 : 0.9;

  return (
    <G onPress={onPress}>
      {(muscle.paths ?? []).map((d, i) => (
        <Path key={i} d={d} fill={fill} stroke={stroke} strokeWidth={sw} />
      ))}
      {(muscle.rects ?? []).map(([x, y, w, h, rx], i) => (
        <Rect key={i} x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke={stroke} strokeWidth={sw} />
      ))}
    </G>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────

type Props = {
  activated?: string[];
  sore?: string[];
  onToggle?: (id: string) => void;
  view?: 'front' | 'back';
  mode?: 'muscles' | 'joints';
};

export function BodyMap({ activated = [], sore = [], onToggle, view = 'front', mode = 'muscles' }: Props) {
  const { width } = useWindowDimensions();
  const mapWidth  = Math.min(width - 80, 200);
  const muscles   = view === 'front' ? MUSCLE_F : MUSCLE_B;

  return (
    <View style={styles.container}>
      <Svg viewBox="0 0 160 294" width={mapWidth} height={mapWidth * (294 / 160)} style={styles.svg}>
        <Silhouette view={view} />

        {mode === 'muscles' && muscles.map(m => (
          <MuscleRegion key={m.id} muscle={m}
            isActive={activated.includes(m.id)}
            isSore={sore.includes(m.id)}
            onPress={() => onToggle?.(m.id)} />
        ))}

        {mode === 'joints' && JOINTS.map(j => (
          <G key={j.id} onPress={() => onToggle?.(j.id)}>
            {j.pts.map(([x, y], i) => (
              <G key={i}>
                <Circle cx={x} cy={y} r={10}
                  fill={sore.includes(j.id) ? C.brand : activated.includes(j.id) ? ACTIVE_FILL : 'rgba(0,0,0,0.06)'}
                  stroke={(activated.includes(j.id) || sore.includes(j.id)) ? C.brand : 'rgba(0,0,0,0.18)'}
                  strokeWidth={1.5} />
                <Circle cx={x} cy={y} r={3.5}
                  fill={(activated.includes(j.id) || sore.includes(j.id)) ? '#fff' : 'rgba(0,0,0,0.25)'} />
              </G>
            ))}
          </G>
        ))}

        <SvgText x="80" y="292" textAnchor="middle" fontSize="8" fill="#B8B8B2" letterSpacing="1.5">
          {view.toUpperCase()} VIEW
        </SvgText>
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#F2F2EF', borderRadius: 14, padding: 12, alignItems: 'center' },
  svg: { alignSelf: 'center' },
});
