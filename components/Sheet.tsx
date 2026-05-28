import { useEffect, useRef } from 'react';
import { Modal, View, Text, Pressable, Animated, ScrollView, StyleSheet } from 'react-native';

type Props = { open: boolean; onClose: () => void; title?: string; children: React.ReactNode };

export function Sheet({ open, onClose, title, children }: Props) {
  const slide = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.spring(slide, {
      toValue: open ? 0 : 300,
      useNativeDriver: true,
      damping: 20,
      stiffness: 200,
    }).start();
  }, [open]);

  return (
    <Modal visible={open} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.scrim} onPress={onClose}>
        <Animated.View style={[styles.sheet, { transform: [{ translateY: slide }] }]}>
          <Pressable>
            <View style={styles.handle} />
            {title && <Text style={styles.title}>{title}</Text>}
            <ScrollView showsVerticalScrollIndicator={false}>
              {children}
            </ScrollView>
          </Pressable>
        </Animated.View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  scrim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.32)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24,
    maxHeight: '90%', overflow: 'hidden',
    shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.12, shadowRadius: 16,
  },
  handle: { width: 36, height: 4, backgroundColor: '#E0E0DE', borderRadius: 999, alignSelf: 'center', marginTop: 14 },
  title: { fontSize: 19, fontWeight: '700', letterSpacing: -0.4, paddingHorizontal: 20, paddingTop: 14 },
});
