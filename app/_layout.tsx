import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="(tabs)" options={{ animation: 'fade' }} />
        <Stack.Screen name="weights" options={{ presentation: 'card' }} />
        <Stack.Screen name="activity" options={{ presentation: 'card' }} />
        <Stack.Screen name="recap" options={{ presentation: 'card' }} />
      </Stack>
    </>
  );
}
