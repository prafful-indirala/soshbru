import React from 'react';
import { Cafe } from '@/data/useCafe';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export default function CafeCard({ data }: { data: Cafe }) {
  return (
    <Box>
      <Text>{data?.name}</Text>
    </Box>
  );
}
