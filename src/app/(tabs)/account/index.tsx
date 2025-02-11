import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from 'expo-router';

import Layout from '@/components/Layout';

import { Button, ButtonText } from '@/ui/button';
import { VStack } from '@/ui/vstack';

export default function AccountScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ title: 'Account' });
  }, [navigation]);

  return (
    <Layout>
      <VStack className="gap-16">
        <Button
          size="md"
          variant="solid"
          action="primary"
          isDisabled={false}
          isFocusVisible={false}
          onPress={() => {
            Alert.alert('Button clicked!');
          }}
          className="mx-[4px]"
        >
          <ButtonText>Account Screen</ButtonText>
        </Button>
      </VStack>
    </Layout>
  );
}
