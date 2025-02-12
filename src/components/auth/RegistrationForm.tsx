import React from 'react';
import { Keyboard, ScrollView } from 'react-native';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { UserProfile } from '@/types/onboarding';

import { FormControl } from '@/elements';

import { Box } from '@/ui/box';
import { Button, ButtonSpinner, ButtonText } from '@/ui/button';
import { Input, InputField } from '@/ui/input';
import { KeyboardAvoidingView } from '@/ui/keyboard-avoiding-view';
import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicator,
  SelectDragIndicatorWrapper,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from '@/ui/select';
import { Text } from '@/ui/text';
import { Textarea, TextareaInput } from '@/ui/textarea';
import { VStack } from '@/ui/vstack';

const networkingInterests = [
  { label: 'Professional Networking', value: 'professional' },
  { label: 'Casual Meetups', value: 'casual' },
  { label: 'Mentorship', value: 'mentorship' },
] as const;

const schema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  fullName: z.string().min(2, 'Full name is required'),
  bio: z.string().max(200, 'Bio must be less than 200 characters').optional(),
  interests: z.array(z.string()).min(1, 'Select at least one interest'),
  networkingInterests: z
    .array(z.enum(['professional', 'casual', 'mentorship']))
    .min(1, 'Select at least one networking preference'),
});

type RegistrationFormData = z.infer<typeof schema>;

interface Props {
  loading?: boolean;
  onSubmit: (data: RegistrationFormData) => void;
}

const RegistrationForm = ({ loading, onSubmit }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      networkingInterests: [],
      interests: [],
    },
  });

  return (
    <KeyboardAvoidingView onTouchStart={Keyboard.dismiss} className="w-[90%]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <VStack space="md">
          <Controller
            name="fullName"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                label="Full Name"
                isInvalid={errors.fullName}
                isRequired
                helperMsg=""
              >
                <Input>
                  <InputField
                    placeholder="John Doe"
                    onChangeText={onChange}
                    value={value}
                    autoCorrect={false}
                    autoCapitalize="words"
                  />
                </Input>
              </FormControl>
            )}
          />

          <Controller
            name="email"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                label="Email"
                isInvalid={errors.email}
                isRequired
                helperMsg=""
              >
                <Input>
                  <InputField
                    placeholder="john@example.com"
                    onChangeText={onChange}
                    value={value}
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </Input>
              </FormControl>
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                label="Password"
                isInvalid={errors.password}
                isRequired
                helperMsg="Must be at least 8 characters with uppercase, lowercase, and number"
              >
                <Input>
                  <InputField
                    type="password"
                    placeholder="Enter your password"
                    onChangeText={onChange}
                    value={value}
                    autoCorrect={false}
                    autoCapitalize="none"
                  />
                </Input>
              </FormControl>
            )}
          />

          <Controller
            name="bio"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                label="Bio"
                isInvalid={errors.bio}
                helperMsg="Tell others about yourself (optional)"
                isRequired={false}
              >
                <Textarea size="md" className="min-h-[100px]">
                  <TextareaInput
                    placeholder="I'm a software developer looking to meet other tech professionals..."
                    onChangeText={onChange}
                    value={value}
                    autoCorrect={true}
                  />
                </Textarea>
              </FormControl>
            )}
          />

          <Controller
            name="networkingInterests"
            control={control}
            render={({ field: { onChange, value } }) => (
              <FormControl
                label="Networking Preferences"
                isInvalid={
                  errors.networkingInterests
                    ? {
                      type: 'validation',
                      message: errors.networkingInterests.message,
                    }
                    : undefined
                }
                isRequired
                helperMsg=""
              >
                <Box className="flex flex-row flex-wrap gap-2">
                  {networkingInterests.map(interest => (
                    <Button
                      key={interest.value}
                      variant={
                        value.includes(interest.value) ? 'solid' : 'outline'
                      }
                      onPress={() => {
                        const newValue = value.includes(interest.value)
                          ? value.filter(v => v !== interest.value)
                          : [...value, interest.value];
                        onChange(newValue);
                      }}
                      size="sm"
                    >
                      <ButtonText>{interest.label}</ButtonText>
                    </Button>
                  ))}
                </Box>
              </FormControl>
            )}
          />

          <Box className="h-4" />

          <Button
            onPress={handleSubmit(onSubmit)}
            size="lg"
            isDisabled={loading}
            className="mt-4 w-full items-center self-center"
          >
            {loading && <ButtonSpinner className="mr-1" />}
            <ButtonText>Create Account</ButtonText>
          </Button>
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegistrationForm;
