import React from 'react';

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

interface StatusBadgeProps {
  isOpen: boolean;
}

export const StatusBadge = ({ isOpen }: StatusBadgeProps) => {
  return (
    <HStack
      space="xs"
      className="items-center rounded-xl bg-black/50 px-2 py-1"
    >
      <Box
        className={`h-2 w-2 rounded-full ${isOpen ? 'bg-success500' : 'bg-error500'
          }`}
      />
      <Text className="text-sm text-white">{isOpen ? 'Open' : 'Closed'}</Text>
    </HStack>
  );
};
