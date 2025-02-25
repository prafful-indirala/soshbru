import React from 'react';

import { Text } from '@/components/ui/text';

interface PriceLevelProps {
  level: string;
}

export const PriceLevel = ({ level }: PriceLevelProps) => {
  return <Text className="text-sm text-white">{level}</Text>;
};
