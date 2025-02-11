import React from 'react';
import { Keyboard } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from 'expo-router';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { FormControl } from '@/elements';

import { Box } from '@/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/ui/button';
import { Input } from '@/ui/input';
import { KeyboardAvoidingView } from '@/ui/keyboard-avoiding-view';
import { Text } from '@/ui/text';
import { VStack } from '@/ui/vstack';

export type FormData = {
  email: string;
  password: string;
};

export const defaultProps = {
  loading: false,
  onSubmit: (data: FormData) => console.log('onSubmit props', data),
};

export type Props = {
  loading?: boolean;
  onSubmit: (data: FormData) => void;
} & typeof defaultProps;

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, 'Password is required'),
});

const LoginForm = ({ loading, onSubmit }: Props) => {
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  // console.log('LoginForm errors', errors);

  return (
    <KeyboardAvoidingView
      onTouchStart={() => Keyboard.dismiss()}
      className="w-[90%]"
    >
      <VStack>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <FormControl label="Email" isInvalid={errors?.email} isRequired>
              <Input
                type="text"
                placeholder="john@doe.com"
                onBlur={onBlur}
                onChangeText={onChange}
                defaultValue={value}
                value={value}
                autoFocus
                autoCorrect={false}
                autoComplete="email"
                autoCapitalize="none"
              />
            </FormControl>
          )}
        />
        <Box>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl
                label="Password"
                isInvalid={errors?.password}
                isRequired
              >
                <Input
                  type="password"
                  placeholder="password"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  defaultValue={value}
                  value={value}
                  autoCorrect={false}
                  autoComplete="password"
                  autoCapitalize="none"
                />
              </FormControl>
            )}
          />
          <Text
            onPress={() => navigation.navigate('PasswordResetScreen')}
            className="text-sm"
          >
            Forgot password?
          </Text>
        </Box>
        <Button
          onPress={handleSubmit(onSubmit)}
          size="lg"
          isDisabled={loading}
          className="mt-6 w-[100%] items-center self-center"
        >
          {loading && <ButtonSpinner className="mr-1" />}
          <ButtonText>Login</ButtonText>
        </Button>
      </VStack>
    </KeyboardAvoidingView>
  );
};

export default LoginForm;
