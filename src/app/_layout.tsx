import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { ApolloProvider } from '@apollo/client';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router/stack';
import * as SplashScreen from 'expo-splash-screen';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';

import apolloClient, { apolloPersistor } from '@/utils/apollo-client';

import { GluestackUIProvider } from '@/ui/gluestack-ui-provider';

import '../../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  // initialRouteName: '(tabs)',
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GluestackUIProvider mode={(colorScheme ?? 'light') as 'light' | 'dark'}>
        <ThemeProvider
          value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen
              name="onboarding"
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </ThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    // ...FontAwesome.font,
  });
  const [client, setClient] = useState(undefined);

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // Load apollo client
  useEffect(() => {
    async function loadClient() {
      try {
        await apolloPersistor.restore();
        setClient(apolloClient);
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      }
    }

    loadClient();
  }, []);

  if (!loaded || !client) {
    return null;
  }

  return (
    <ApolloProvider client={client}>
      <RootLayoutNav />
    </ApolloProvider>
  );
}
