import React from 'react';

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface WorkPreferencesProps {
  preferences: string[];
}

export const WorkPreferences: React.FC<WorkPreferencesProps> = ({
  preferences,
}) => {
  return (
    <Box className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <Text className="text-textDark900 mb-2 font-bold text-lg">
        Work Preferences
      </Text>
      <VStack space="xs">
        {preferences.map(pref => (
          <HStack key={pref} space="xs">
            <Text className="text-textLight600">•</Text>
            <Text className="text-textLight600 text-sm">{pref}</Text>
          </HStack>
        ))}
      </VStack>
    </Box>
  );
};
