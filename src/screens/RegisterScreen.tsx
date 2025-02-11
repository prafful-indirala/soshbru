import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import { useNavigation } from 'expo-router';
import { capitalize } from 'lodash';

import useAuth from '@/hooks/useAuth';
import LoginForm, { FormData } from '@/components/auth/LoginForm';
import Layout from '@/components/Layout';

import { Heading } from '@/ui/heading';
import { VStack } from '@/ui/vstack';

const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    Login(email: $email, password: $password) {
      error {
        message
      }
      record {
        _id
        email
        token
      }
    }
  }
`;

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [mutateLogin, { loading, error }] = useMutation(LOGIN);
  const { login } = useAuth();

  useEffect(() => {
    navigation.setOptions({ title: 'Register' });
  }, [navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert('Register Failed', capitalize(error.message));
    }
  }, [error]);

  const handleSubmit = async (data: FormData) => {
    console.log('on submit', data);

    // // make api call to register user
    // const result: any = await mutateLogin({
    //   variables: {
    //     email: data.email,
    //     password: data.password,
    //   },
    // });

    // if (result.error) {
    //   return Alert.alert('Login Failed', result.error.message);
    // }
    // const resultData = result?.data?.record;

    await login({ user: { email: data.email }, token: '1234567890' });
    return true;
  };

  return (
    <Layout hasSafeArea>
      <VStack className="mt-6 h-[100%] items-center gap-[24px]">
        <Heading size="md">Create an account</Heading>
        <LoginForm loading={loading} onSubmit={handleSubmit} />
      </VStack>
    </Layout>
  );
}
