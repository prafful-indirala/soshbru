import React from 'react';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

interface NetworkingCardProps {
  cafeId: string;
  cafeName: string;
  onSiteCount: number;
  isCheckedIn: boolean;
  onCheckIn: () => void;
  onViewProfessionals: () => void;
}

export default function NetworkingCard({
  cafeId: _cafeId, // Using _ prefix to indicate intentionally unused prop
  cafeName: _cafeName, // Using _ prefix to indicate intentionally unused prop
  onSiteCount,
  isCheckedIn,
  onCheckIn,
  onViewProfessionals,
}: NetworkingCardProps) {
  const handleCheckIn = () => {
    // Alert.alert('check');
    onCheckIn();
  };

  return (
    <Box className="mx-4 my-2 overflow-hidden rounded-2xl shadow-md">
      <LinearGradient
        colors={isCheckedIn ? ['#4CAF50', '#2E7D32'] : ['#1a73e8', '#0d47a1']}
        className="p-4"
      >
        <HStack className="mb-4 items-center justify-between">
          <Text className="font-bold text-xl text-white">Networking</Text>
          {isCheckedIn && (
            <HStack
              space="xs"
              className="items-center rounded-full bg-white/20 px-3 py-1.5"
            >
              <MaterialIcons name="verified" size={20} color="#fff" />
              <Text className="font-semibold text-white">On-site</Text>
            </HStack>
          )}
        </HStack>

        <VStack space="lg" className="mb-5 items-center">
          <FontAwesome5 name="users" size={20} color="#fff" />
          <Text className="font-bold text-2xl text-white">{onSiteCount}</Text>
          <Text className="text-white/80">Professionals On-site</Text>
        </VStack>

        <HStack space="md">
          <Button
            variant={isCheckedIn ? 'outline' : 'solid'}
            onPress={handleCheckIn}
            disabled={isCheckedIn}
            className={
              isCheckedIn
                ? 'flex-1 flex-row items-center bg-white'
                : 'flex-1 flex-row items-center bg-white/20'
            }
          >
            <FontAwesome5
              name={isCheckedIn ? 'check-circle' : 'location-arrow'}
              size={16}
              color={isCheckedIn ? '#4CAF50' : '#fff'}
            />
            <Text
              className={
                isCheckedIn
                  ? 'text-success600 ml-2 font-semibold'
                  : 'ml-2 font-semibold text-white'
              }
            >
              {isCheckedIn ? 'Checked In' : 'Check In'}
            </Text>
          </Button>

          <Button
            variant="solid"
            onPress={onViewProfessionals}
            className="flex-1 flex-row items-center bg-white"
          >
            <FontAwesome5 name="user-friends" size={16} color="#1a73e8" />
            <Text className="text-primary600 ml-2 font-semibold">
              View Professionals
            </Text>
          </Button>
        </HStack>
      </LinearGradient>
    </Box>
  );
}
