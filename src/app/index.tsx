import React from 'react';
import { Href, Redirect } from 'expo-router';

import { useFirstTimeUser } from '@/hooks/useFirstTimeUser';

import { useStore } from '../store';

export default function Index() {
  const isLoggedIn = useStore(state => state.isLoggedIn);
  const { isFirstTime } = useFirstTimeUser();

  // Show loading state while checking first-time status
  if (isFirstTime === null) {
    return null;
  }

  // First time users see onboarding
  if (isFirstTime) {
    return <Redirect href={'onboarding' as Href<string>} />;
  }

  // Not logged in users go to auth
  if (!isLoggedIn) {
    return <Redirect href={'auth' as Href<string>} />;
  }

  // Logged in users go to home
  return <Redirect href={'(tabs)/home' as Href<string>} />;
}
