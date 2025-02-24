import React from 'react';
import { SearchIcon } from 'lucide-react-native';

import Layout from '@/components/Layout';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';

import { VStack } from '@/ui/vstack';

export default function SearchScreen() {
  return (
    <Layout>
      <VStack className="gap-16">
        <HStack className="items-center gap-2 self-center p-10">
          <SearchIcon size={30} color="#4A2A85" />
          <Text>Search Feature coming soon...</Text>
        </HStack>
      </VStack>
    </Layout>
  );
}
