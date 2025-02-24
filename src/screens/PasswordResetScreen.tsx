import React from 'react';
import { useNavigation } from 'expo-router';

import useAuth from '@/hooks/useAuth';
import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import Layout from '@/components/Layout';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function PasswordResetScreen() {
  const navigation = useNavigation();
  const { resetPassword } = useAuth();

  React.useEffect(() => {
    navigation.setOptions({ title: 'Reset Password' });
  }, [navigation]);

  return (
    <Layout hasSafeArea>
      <VStack className="mt-6 h-[100%] items-center gap-[24px]">
        <Heading size="md">Reset your password</Heading>
        <Text className="text-center text-typography-600">
          Enter your email address and we&apos;ll send you instructions to reset
          your password.
        </Text>
        <ResetPasswordForm loading={false} onSubmit={resetPassword} />
      </VStack>
    </Layout>
  );
}
