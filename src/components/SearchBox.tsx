import React from 'react';

import { Box } from '@/components/ui/box';
import { Text } from '@/components/ui/text';

export type FormData = {
  query: string;
};

export default function SearchBox() {
  return (
    <Box className="z-50 px-6 shadow-lg">
      <Text>Search Box</Text>
    </Box>
  );
}
