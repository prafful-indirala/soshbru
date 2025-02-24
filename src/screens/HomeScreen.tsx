import React from 'react';

import CafeList from '@/components/cafe/CafeList';
import Layout from '@/components/Layout';
import SearchBox from '@/components/SearchBox';
import { VStack } from '@/components/ui/vstack';

export default function HomeScreen() {
  return (
    <Layout hasSafeArea={true}>
      <VStack className="h-full items-center justify-center gap-[8px]">
        <SearchBox />
        <CafeList />
      </VStack>
    </Layout>
  );
}
