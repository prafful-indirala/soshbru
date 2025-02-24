import React, { useState } from 'react';
import { Alert, Keyboard } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  signInWithApple,
  signInWithGoogle,
  signInWithLinkedIn,
} from '@/services/supabase';

import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { AtSignIcon, CircleIcon, LinkIcon } from '@/components/ui/icon';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import FormControl from '@/elements/FormControl';

import { KeyboardAvoidingView } from '@/ui/keyboard-avoiding-view';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  loading: boolean;
  onSubmit: (email: string, password: string) => Promise<boolean>;
}

export default function LoginForm({ loading, onSubmit }: LoginFormProps) {
  const router = useRouter();

  const [socialLoading, setSocialLoading] = useState<{
    google: boolean;
    apple: boolean;
    linkedin: boolean;
  }>({
    google: false,
    apple: false,
    linkedin: false,
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSocialLogin = async (
    provider: 'google' | 'apple' | 'linkedin',
    loginFn: () => Promise<any>,
  ) => {
    try {
      setSocialLoading(prev => ({ ...prev, [provider]: true }));
      await loginFn();
    } catch (error) {
      console.error(`${provider} login error:`, error);
      Alert.alert(
        'Login Failed',
        error instanceof Error
          ? error.message
          : `Failed to login with ${provider}`,
      );
    } finally {
      setSocialLoading(prev => ({ ...prev, [provider]: false }));
    }
  };

  return (
    <KeyboardAvoidingView
      onTouchStart={() => Keyboard.dismiss()}
      className="w-[90%]"
    >
      <VStack className="w-full space-y-4 px-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              label="Email"
              isRequired
              isInvalid={errors.email}
              helperMsg="We'll never share your email"
            >
              <Input>
                <InputField
                  type="text"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  defaultValue={value}
                  value={value}
                  autoFocus
                  autoCorrect={false}
                  autoComplete="email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholder="Enter your email"
                />
              </Input>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl
              label="Password"
              isRequired
              isInvalid={errors.password}
              helperMsg=""
            >
              <Input>
                <InputField
                  type="password"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  autoCorrect={false}
                  secureTextEntry
                  placeholder="Enter your password"
                />
              </Input>
            </FormControl>
          )}
        />

        <Link href="/auth/forgot-password" asChild>
          <Text className="text-right text-primary-600">Forgot password?</Text>
        </Link>

        <Button
          onPress={handleSubmit(async data => {
            try {
              const success = await onSubmit(data.email, data.password);
              if (!success) {
                throw new Error('Failed to login');
              }
            } catch (error) {
              console.error('Login error:', error);
              Alert.alert(
                'Login Failed',
                error instanceof Error
                  ? error.message
                  : 'An unknown error occurred',
              );
            }
          })}
          disabled={loading}
          action="primary"
          variant="solid"
          size="lg"
          className="mt-6 w-full"
        >
          <ButtonText>Login with Email</ButtonText>
          {loading && <ButtonSpinner />}
        </Button>

        <HStack className="items-center py-4">
          <Divider className="flex-1" />
          <Text className="px-4 text-gray-500">or continue with</Text>
          <Divider className="flex-1" />
        </HStack>

        <Button
          variant="outline"
          size="lg"
          className="w-full"
          onPress={() => handleSocialLogin('google', signInWithGoogle)}
          disabled={socialLoading.google}
        >
          <AtSignIcon width={16} height={16} />
          <ButtonText className="ml-2">
            {socialLoading.google ? 'Signing in...' : 'Continue with Google'}
          </ButtonText>
          {socialLoading.google && <ButtonSpinner />}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="mt-4 w-full"
          onPress={() => handleSocialLogin('apple', signInWithApple)}
          disabled={socialLoading.apple}
        >
          <CircleIcon width={16} height={16} />
          <ButtonText className="ml-2">
            {socialLoading.apple ? 'Signing in...' : 'Continue with Apple'}
          </ButtonText>
          {socialLoading.apple && <ButtonSpinner />}
        </Button>

        <Button
          variant="outline"
          size="lg"
          className="mt-4 w-full"
          onPress={() => handleSocialLogin('linkedin', signInWithLinkedIn)}
          disabled={socialLoading.linkedin}
        >
          <LinkIcon width={16} height={16} />
          <ButtonText className="ml-2">
            {socialLoading.linkedin
              ? 'Signing in...'
              : 'Continue with LinkedIn'}
          </ButtonText>
          {socialLoading.linkedin && <ButtonSpinner />}
        </Button>

        <HStack className="items-center py-4">
          <Divider className="flex-1" />
          <Text className="px-4 text-gray-500">or continue with</Text>
          <Divider className="flex-1" />
        </HStack>

        <Button
          variant="outline"
          size="lg"
          className="mt-4 w-full"
          onPress={() => {
            router.replace('/(tabs)/home');
          }}
          disabled={socialLoading.linkedin}
        >
          <LinkIcon width={16} height={16} />
          <ButtonText className="ml-2">Continue as a Guest</ButtonText>
        </Button>
      </VStack>
    </KeyboardAvoidingView>
  );
}
