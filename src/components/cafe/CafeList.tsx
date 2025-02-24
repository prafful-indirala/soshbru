import React from 'react';
import { FlatList } from 'react-native';
import useCafes, { Cafe } from '@/data/useCafe';

import CafeCard from '@/components/cafe/CafeCard';
import { Box } from '@/components/ui/box';

export default function CafeList() {
  const { data } = useCafes();
  return (
    <Box>
      <FlatList
        data={data}
        keyExtractor={item => item?.id}
        renderItem={({ item }: { item: Cafe }) => {
          return <CafeCard key={item?.id} data={item} />;
        }}
      />
    </Box>
  );
}
