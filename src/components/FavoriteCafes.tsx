import React from 'react';

import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';

interface FavoriteCafesProps {
  cafes: string[];
}

export const FavoriteCafes: React.FC<FavoriteCafesProps> = ({ cafes }) => {
  return (
    <Box className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <Text className="text-textDark900 mb-2 font-bold text-lg">
        Favorite Workspaces
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <HStack space="sm">
          {cafes.map(cafe => (
            <Box
              key={`favorite-${cafe}`}
              className="bg-backgroundLight100 rounded-full px-3 py-2"
            >
              <Text className="text-textDark600 text-sm">{cafe}</Text>
            </Box>
          ))}
        </HStack>
      </ScrollView>
    </Box>
  );
};
