import React from 'react';

import useAuth from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button, ButtonText } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function HomeScreen() {
  const { logout } = useAuth();

  return (
    <Layout hasSafeArea={false}>
      <VStack className="h-full content-center items-center justify-center gap-[8px]">
        <Text>Home Screen</Text>
        <ThemeToggle />

        <Button
          onPress={logout}
          action="primary"
          variant="solid"
          size="lg"
          className="mt-6"
        >
          <ButtonText>Logout</ButtonText>
        </Button>
      </VStack>
    </Layout>
  );
}
