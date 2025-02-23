import React, { useEffect } from 'react';
import { Link, useNavigation } from 'expo-router';

import useAuth from '@/hooks/useAuth';
import LoginForm from '@/components/auth/LoginForm';
import Layout from '@/components/Layout';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();

  useEffect(() => {
    navigation.setOptions({ title: 'Login' });
  }, [navigation]);

  return (
    <Layout hasSafeArea>
      <VStack className="mt-6 h-[100%] items-center gap-[24px]">
        <Heading size="md">Login to your account</Heading>
        <LoginForm loading={false} onSubmit={login} />
        <Text className="text-center font-medium">
          Don&apos;t have an account?{' '}
          <Link push asChild href="/auth/register">
            <Text underline className="font-medium">
              Sign up
            </Text>
          </Link>
        </Text>
      </VStack>
    </Layout>
  );
}
