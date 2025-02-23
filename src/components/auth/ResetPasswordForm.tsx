import React from 'react';
import { Alert } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import FormControl from '@/elements/FormControl';

const resetSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export type ResetPasswordFormData = z.infer<typeof resetSchema>;

interface ResetPasswordFormProps {
  loading: boolean;
  onSubmit: (email: string) => Promise<boolean>;
}

export default function ResetPasswordForm({
  loading,
  onSubmit,
}: ResetPasswordFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <VStack className="w-full space-y-4 px-4">
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <FormControl
            label="Email"
            isRequired
            isInvalid={errors.email}
            helperMsg="We'll send password reset instructions to this email"
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

      <Button
        onPress={handleSubmit(async data => {
          try {
            const success = await onSubmit(data.email);
            if (!success) {
              throw new Error('Failed to send reset email');
            }
          } catch (error) {
            console.error('Reset password error:', error);
            Alert.alert(
              'Reset Failed',
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
        <ButtonText>Send Reset Instructions</ButtonText>
        {loading && <ButtonSpinner />}
      </Button>
    </VStack>
  );
}
