import React, { Fragment, useEffect } from 'react';
import { Link, useNavigation } from 'expo-router';

import useAuth from '@/hooks/useAuth';
import config from '@/utils/config';
import Layout from '@/components/Layout';

import { Box } from '@/ui/box';
import { Button, ButtonGroup, ButtonText } from '@/ui/button';
import { Text } from '@/ui/text';

export default function LandingScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();

  useEffect(() => {
    navigation.setOptions({ title: '', headerShown: false });
  }, [navigation]);

  const handleSkipLogin = async () => {
    console.log('handleSkipLogin');
    await login({ user: { email: 'abc@abc.com' }, token: '1234567890' });
  };

  return (
    <Layout hasSafeArea={false}>
      <Box className="h-full w-full bg-primary-500 py-24">
        <Box className="justify-center">
          <Text size="6xl" className="text-center text-white">
            {config?.appName}
          </Text>
        </Box>
        <Box>
          <ButtonGroup className="flex-col px-20">
            <>
              <Link push asChild href="/auth/login">
                <Button action="primary" className="w-[100%]">
                  <ButtonText>Login</ButtonText>
                </Button>
              </Link>
              <Link push asChild href="/auth/register">
                <Button action="secondary" className="w-[100%] bg-white">
                  <ButtonText className="text-primary-800">
                    Create an account
                  </ButtonText>
                </Button>
              </Link>
              {config?.isDev && (
                <Button
                  variant="outline"
                  onPress={handleSkipLogin}
                  className="w-[100%] bg-rose-100"
                >
                  <ButtonText className="text-primary-800">Skip</ButtonText>
                </Button>
              )}
            </>
          </ButtonGroup>
        </Box>
      </Box>
    </Layout>
  );
}
