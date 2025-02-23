import React from 'react';
import { useNavigation } from 'expo-router';

import useAuth from '@/hooks/useAuth';
import UpdatePasswordForm from '@/components/auth/UpdatePasswordForm';
import Layout from '@/components/Layout';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

export default function UpdatePasswordScreen() {
  const navigation = useNavigation();
  const { updatePassword } = useAuth();

  React.useEffect(() => {
    navigation.setOptions({ title: 'Update Password' });
  }, [navigation]);

  return (
    <Layout hasSafeArea>
      <VStack className="mt-6 h-[100%] items-center gap-[24px]">
        <Heading size="md">Create new password</Heading>
        <Text className="text-center text-typography-600">
          Your password must be at least 8 characters and include an uppercase
          letter, lowercase letter, and a number.
        </Text>
        <UpdatePasswordForm loading={false} onSubmit={updatePassword} />
      </VStack>
    </Layout>
  );
}
