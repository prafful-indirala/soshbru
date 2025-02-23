import React from 'react';
import { Alert } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { Input, InputField } from '@/components/ui/input';
import { VStack } from '@/components/ui/vstack';
import FormControl from '@/elements/FormControl';

const updatePasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;

interface UpdatePasswordFormProps {
  loading: boolean;
  onSubmit: (newPassword: string) => Promise<boolean>;
}

export default function UpdatePasswordForm({
  loading,
  onSubmit,
}: UpdatePasswordFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  return (
    <VStack className="w-full space-y-4 px-4">
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <FormControl
            label="New Password"
            isRequired
            isInvalid={errors.password}
            helperMsg="Must be 8+ characters with uppercase, lowercase, and number"
          >
            <Input>
              <InputField
                {...field}
                secureTextEntry
                placeholder="Create a new password"
              />
            </Input>
          </FormControl>
        )}
      />

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field }) => (
          <FormControl
            label="Confirm New Password"
            isRequired
            isInvalid={errors.confirmPassword}
            helperMsg=""
          >
            <Input>
              <InputField
                {...field}
                secureTextEntry
                placeholder="Confirm your new password"
              />
            </Input>
          </FormControl>
        )}
      />

      <Button
        onPress={handleSubmit(async data => {
          try {
            const success = await onSubmit(data.password);
            if (!success) {
              throw new Error('Failed to update password');
            }
          } catch (error) {
            console.error('Update password error:', error);
            Alert.alert(
              'Update Failed',
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
        <ButtonText>Update Password</ButtonText>
        {loading && <ButtonSpinner />}
      </Button>
    </VStack>
  );
}
