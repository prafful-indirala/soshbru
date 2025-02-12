import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import { User2Icon } from 'lucide-react-native';

import Layout from '@/components/Layout';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

import { VStack } from '@/ui/vstack';

export default function AccountScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Account' });
  }, [navigation]);

  return (
    <Layout>
      <VStack className="gap-16">
        <HStack className="items-center gap-2 self-center p-10">
          <User2Icon size={30} color="orange" />
          <Text>Account Feature coming soon...</Text>
        </HStack>
      </VStack>
    </Layout>
  );
}
