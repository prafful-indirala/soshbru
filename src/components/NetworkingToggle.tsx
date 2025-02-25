import React from 'react';

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Switch } from '@/components/ui/switch';
import { Text } from '@/components/ui/text';

interface NetworkingToggleProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

export const NetworkingToggle: React.FC<NetworkingToggleProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <Box className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <HStack className="items-center justify-between">
        <Text className="text-textDark900 text-base">
          Show me for networking
        </Text>
        <Switch
          value={value}
          onValueChange={onValueChange}
          trackColor={{ true: '$primary500', false: '$backgroundLight300' }}
          thumbColor={value ? '$primary600' : '$backgroundLight100'}
        />
      </HStack>
    </Box>
  );
};
