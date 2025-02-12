import React, { useEffect, useState } from 'react';
import { LogBox, useColorScheme } from 'react-native';
import { ApolloProvider } from '@apollo/client';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router/stack';
import * as SplashScreen from 'expo-splash-screen';
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from 'react-native-safe-area-context';
import { useStore } from '@/store';

import apolloClient, { apolloPersistor } from '@/utils/apollo-client';

import { GluestackUIProvider } from '@/ui/gluestack-ui-provider';

import '../../global.css';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Ignore all log notifications on the simulator
LogBox.ignoreAllLogs();

function RootLayoutNav() {
  const theme = useStore(state => state.theme);
  const setTheme = useStore(state => state.setTheme);
  const systemColorScheme = useColorScheme();

  // Set initial theme based on system preference if no theme is set
  useEffect(() => {
    if (systemColorScheme) {
      setTheme(systemColorScheme);
    }
  }, [systemColorScheme, setTheme]);

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GluestackUIProvider mode={theme}>
        <NavigationThemeProvider
          value={theme === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack>
            <Stack.Screen
              name="onboarding"
              options={{ headerShown: false, gestureEnabled: false }}
            />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
        </NavigationThemeProvider>
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default function RootLayout() {
  const [loaded, error] = useFonts({});
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
