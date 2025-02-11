import React from 'react';
import { Redirect } from 'expo-router';

import { useStore } from '../store';

export default function Index() {
  const isLoggedIn = useStore(state => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Redirect href="/auth" />;
  }

  return <Redirect href="/(tabs)/home" />;
}
