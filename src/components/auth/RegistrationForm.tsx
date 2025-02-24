import React from 'react';
import { Alert, Keyboard, ScrollView } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button, ButtonSpinner, ButtonText } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Input, InputField } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import FormControl from '@/elements/FormControl';

import { KeyboardAvoidingView } from '@/ui/keyboard-avoiding-view';

const registrationSchema = z
  .object({
    email: z.string().email('Invalid email address'),
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        'Password must contain at least one uppercase letter, one lowercase letter, and one number',
      ),
    confirmPassword: z.string(),
    full_name: z.string().min(2, 'Name is required'),
    designation: z.string().optional(),
    bio: z.string().optional(),
    linkedin_url: z
      .string()
      .url('Invalid LinkedIn URL')
      .optional()
      .or(z.literal('')),
    github_url: z
      .string()
      .url('Invalid GitHub URL')
      .optional()
      .or(z.literal('')),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegistrationFormData = z.infer<typeof registrationSchema>;

interface RegistrationFormProps {
  loading?: boolean;
  onSubmit: (
    email: string,
    password: string,
    userData: {
      full_name: string;
      designation?: string;
      bio?: string;
      linkedin_url?: string;
      github_url?: string;
    },
  ) => Promise<boolean>;
}

export default function RegistrationForm({
  loading = false,
  onSubmit,
}: RegistrationFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationFormData>({
    mode: 'onChange',
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      full_name: '',
      designation: '',
      bio: '',
      linkedin_url: '',
      github_url: '',
    },
  });

  return (
    <KeyboardAvoidingView
      onTouchStart={() => Keyboard.dismiss()}
      className="w-[90%]"
    >
      <ScrollView showsVerticalScrollIndicator={false}>
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
            name="full_name"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl
                label="Full Name"
                isRequired
                isInvalid={errors.full_name}
                helperMsg="How should we address you?"
              >
                <Input>
                  <InputField
                    type="text"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={value}
                    placeholder="Enter your full name"
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
                helperMsg="Must be 8+ characters with uppercase, lowercase, and number"
              >
                <Input>
                  <InputField
                    type="text"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={value}
                    secureTextEntry
                    placeholder="Create a password"
                  />
                </Input>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl
                label="Confirm Password"
                isRequired
                isInvalid={errors.confirmPassword}
                helperMsg=""
              >
                <Input>
                  <InputField
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={value}
                    secureTextEntry
                    placeholder="Confirm your password"
                  />
                </Input>
              </FormControl>
            )}
          />

          <Text className="mt-4 font-medium">Optional Information</Text>

          <Controller
            control={control}
            name="designation"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl
                label="Designation"
                isRequired={false}
                isInvalid={errors.designation}
                helperMsg="Your professional role"
              >
                <Input>
                  <InputField
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={value}
                    placeholder="What's your role? (e.g., Software Engineer)"
                  />
                </Input>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="bio"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl
                label="Bio"
                isRequired={false}
                isInvalid={errors.bio}
                helperMsg="Share a bit about yourself"
              >
                <Input>
                  <InputField
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={value}
                    placeholder="Tell us about yourself"
                    multiline
                    numberOfLines={3}
                  />
                </Input>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="linkedin_url"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl
                label="LinkedIn Profile"
                isRequired={false}
                isInvalid={errors.linkedin_url}
                helperMsg="Link to your LinkedIn profile"
              >
                <Input>
                  <InputField
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={value}
                    placeholder="Your LinkedIn profile URL"
                    autoCapitalize="none"
                  />
                </Input>
              </FormControl>
            )}
          />

          <Controller
            control={control}
            name="github_url"
            render={({ field: { onChange, onBlur, value } }) => (
              <FormControl
                label="GitHub Profile"
                isRequired={false}
                isInvalid={errors.github_url}
                helperMsg="Link to your GitHub profile"
              >
                <Input>
                  <InputField
                    onBlur={onBlur}
                    onChangeText={onChange}
                    defaultValue={value}
                    placeholder="Your GitHub profile URL"
                    autoCapitalize="none"
                  />
                </Input>
              </FormControl>
            )}
          />

          <HStack className="mt-6 w-full justify-end">
            <Button
              onPress={handleSubmit(data =>
                onSubmit(data.email, data.password, {
                  full_name: data.full_name,
                  designation: data.designation,
                  bio: data.bio,
                  linkedin_url: data.linkedin_url,
                  github_url: data.github_url,
                }),
              )}
              disabled={loading || !isValid}
              action="primary"
              variant="solid"
              size="lg"
              className="w-full"
            >
              <ButtonText>Create Account</ButtonText>
              {loading && <ButtonSpinner />}
            </Button>
          </HStack>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
