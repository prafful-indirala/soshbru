import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { statusColors } from '@/components/ui/colors-reference';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

interface RatingStarsProps {
  rating: number;
}

export const RatingStars = ({ rating }: RatingStarsProps) => {
  return (
    <HStack space="xs" className="items-center">
      <Text className="text-white">{rating}</Text>
      <MaterialIcons name="star" size={16} color={statusColors.warning} />
    </HStack>
  );
};
