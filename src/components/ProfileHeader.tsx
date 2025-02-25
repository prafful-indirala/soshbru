import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface ProfileHeaderProps {
  name: string;
  designation: string;
  bio: string;
  onEdit: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  designation,
  bio,
  onEdit,
}) => {
  return (
    <Box className="mb-4 rounded-xl bg-white p-4 shadow-sm">
      <HStack className="mb-2 items-center justify-between">
        <Text className="text-textDark900 font-bold text-2xl">{name}</Text>
        <Button variant="link" onPress={onEdit} className="p-1">
          <Ionicons name="create-outline" size={24} color="#1a73e8" />
        </Button>
      </HStack>
      <VStack space="sm">
        <Text className="text-textLight600 text-base">{designation}</Text>
        <Text className="text-textLight600 text-sm leading-5">{bio}</Text>
      </VStack>
    </Box>
  );
};
