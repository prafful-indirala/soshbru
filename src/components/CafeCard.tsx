import React from 'react';
import { Animated } from 'react-native';
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { Cafe } from '@/types/cafe';
import { LinearGradient } from 'expo-linear-gradient';

import { RatingStars } from '@/components/RatingStars';
import { StatusBadge } from '@/components/StatusBadge';
import { Box } from '@/components/ui/box';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';

interface CafeCardProps {
  cafe: Cafe;
  onPress: (cafe: Cafe) => void;
}

export const CafeCard = ({ cafe, onPress }: CafeCardProps) => {
  const pressAnimation = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(pressAnimation, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnimation, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View style={[{ transform: [{ scale: pressAnimation }] }]}>
      <Pressable
        onPress={() => onPress(cafe)}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="mb-4 overflow-hidden rounded-2xl bg-white shadow-md"
      >
        <Box className="relative">
          <Image
            source={{ uri: cafe.imageUrl }}
            alt={cafe.name}
            className="h-[200px] w-full rounded-2xl"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            className="absolute bottom-0 left-0 right-0 h-[70%] rounded-2xl"
          />

          <Box className="absolute bottom-0 left-0 right-0 p-4">
            <HStack className="mb-3 items-center justify-between">
              <HStack className="mr-2 flex-1 items-center">
                <Text className="mr-2 font-bold text-xl text-white">
                  {cafe.name}
                </Text>
                <StatusBadge isOpen={cafe.isOpen} />
              </HStack>
              <Box className="flex-row items-center rounded-xl bg-black/50 px-2 py-1">
                <FontAwesome5 name="user-friends" size={12} color="#fff" />
                <Text className="ml-1 text-xs text-white">
                  {cafe.currentOccupancy}/50
                </Text>
              </Box>
            </HStack>

            <Box className="mb-3 flex-row justify-between rounded-lg bg-black/50 p-2">
              {/* WiFi Speed */}
              <HStack className="mr-3 items-center">
                <MaterialCommunityIcons
                  name="wifi"
                  size={16}
                  color={
                    cafe.wifiSpeed >= 100
                      ? '#4CAF50'
                      : cafe.wifiSpeed >= 50
                        ? '#FFC107'
                        : '#FF5252'
                  }
                />
                <Text className="ml-1 text-xs font-semibold text-white">
                  {cafe.wifiSpeed} Mbps
                </Text>
              </HStack>

              {/* Noise Level */}
              <HStack className="mr-3 items-center">
                <FontAwesome5
                  name={
                    cafe.noiseLevel === 'quiet'
                      ? 'volume-off'
                      : cafe.noiseLevel === 'moderate'
                        ? 'volume-down'
                        : 'volume-up'
                  }
                  size={14}
                  color={
                    cafe.noiseLevel === 'quiet'
                      ? '#4CAF50'
                      : cafe.noiseLevel === 'moderate'
                        ? '#FFC107'
                        : '#FF5252'
                  }
                />
                <Text className="ml-1 text-xs font-semibold text-white">
                  {cafe.noiseLevel === 'quiet'
                    ? 'Quiet Zone'
                    : cafe.noiseLevel === 'moderate'
                      ? 'Moderate'
                      : 'Loud'}
                </Text>
              </HStack>

              {/* Power Outlets */}
              <HStack className="items-center">
                <MaterialCommunityIcons
                  name="power-socket"
                  size={16}
                  color={cafe.powerOutlets ? '#4CAF50' : '#FF5252'}
                />
                <Text className="ml-1 text-xs font-semibold text-white">
                  {cafe.powerOutlets ? 'Power Available' : 'Limited Power'}
                </Text>
              </HStack>
            </Box>

            <HStack className="mb-2 items-center">
              <RatingStars rating={cafe.rating} />
              <Text className="ml-1 text-sm text-white">({cafe.reviews})</Text>
              <Box className="mx-2 h-1 w-1 rounded-full bg-white" />
              <Text className="text-sm text-white">
                <Ionicons name="location-outline" size={14} color="#fff" />
                {cafe.distance}
              </Text>
            </HStack>

            <HStack className="bg-success500/20 items-center rounded-xl px-2 py-1">
              <FontAwesome5 name="laptop" size={12} color="#fff" />
              <Text className="ml-1 font-medium text-xs text-white">
                {cafe.professionalCount} professionals working now
              </Text>
            </HStack>
          </Box>
        </Box>
      </Pressable>
    </Animated.View>
  );
};
