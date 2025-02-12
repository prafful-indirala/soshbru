import React from 'react';

import useAuth from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { ThemeToggle } from '@/components/ThemeToggle';
import AnimatedButton from '@/components/ui/animated-button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <Layout>
      <VStack className="content-center items-center justify-center gap-[8px]">
        <Text>Home Screen</Text>
        <ThemeToggle />
        <AnimatedButton
          text="Logout"
          onPress={logout}
          className="mt-8 w-1/2 self-center rounded-full bg-blue-500 py-4"
        />
      </VStack>
    </Layout>
  );
}
