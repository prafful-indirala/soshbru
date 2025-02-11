import React from 'react';

import { Alert } from '@/ui/alert';
import { Box } from '@/ui/box';
import { Button, ButtonText } from '@/ui/button';
import { Center } from '@/ui/center';
import { InfoIcon } from '@/ui/icon';
import { Text } from '@/ui/text';
import { VStack } from '@/ui/vstack';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: string;
  buttonText?: string;
  onPress?: () => void;
}

const EmptyState = ({ ...props }: EmptyStateProps) => {
  return (
    <Center>
      <VStack className="w-[100%]">
        <Alert className="bg-gray.200 w-[100%]">
          <VStack className="w-[100%] shrink-[1px] items-center pb-[6px] pt-[6px]">
            {props.icon || <InfoIcon size="md" />}
            <Text className="text-md font-medium">{props.title}</Text>
            <Box>{props.description}</Box>
            {props.buttonText && (
              <Button
                size="lg"
                onPress={props.onPress}
                className="mt-[4px] pl-[12px] pr-[12px]"
              >
                <ButtonText size="sm" className="text-[#ffffff]">
                  {props.buttonText}
                </ButtonText>
              </Button>
            )}
          </VStack>
        </Alert>
      </VStack>
    </Center>
  );
};

export default EmptyState;
