import { Redirect } from 'expo-router';

// Later: check if user has completed onboarding (AsyncStorage / Supabase session)
// For now always start at onboarding
export default function Index() {
  return <Redirect href="/onboarding" />;
}
