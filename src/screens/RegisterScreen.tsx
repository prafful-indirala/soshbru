import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';

import useAuth from '@/hooks/useAuth';
import RegistrationForm from '@/components/auth/RegistrationForm';
import Layout from '@/components/Layout';
import { Box } from '@/components/ui/box';

import { Heading } from '@/ui/heading';
import { VStack } from '@/ui/vstack';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const { signup } = useAuth();

  useEffect(() => {
    navigation.setOptions({ title: 'Register' });
  }, [navigation]);

  return (
    <Layout hasSafeArea>
      <VStack className="mt-6 h-[100%] items-center gap-[24px]">
        <Heading size="md">Create an account</Heading>
        <Box className="flex-1">
          <RegistrationForm loading={false} onSubmit={signup} />
        </Box>
      </VStack>
    </Layout>
  );
}
