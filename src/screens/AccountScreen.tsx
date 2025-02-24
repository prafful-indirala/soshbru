import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { User2Icon } from 'lucide-react-native';

import useAuth from '@/hooks/useAuth';
import Layout from '@/components/Layout';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

import { VStack } from '@/ui/vstack';

export default function AccountScreen() {
  const navigation = useNavigation();
  const { logout } = useAuth();

  useEffect(() => {
    navigation.setOptions({ title: 'Account' });
  }, [navigation]);

  return (
    <Layout>
      <VStack className="gap-16">
        <HStack className="items-center gap-2 self-center p-10">
          <User2Icon size={30} color="#4A2A85" />
          <Text>Account Feature coming soon...</Text>
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
        </HStack>
      </VStack>
    </Layout>
  );
}
