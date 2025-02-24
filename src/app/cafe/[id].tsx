import React, { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { MOCK_CAFES } from '@/screens/HomeScreen';
import type { Cafe } from '@/types/cafe';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Layout from '@/components/Layout';
import { NetworkingCard } from '@/components/NetworkingCard';
import { RatingStars } from '@/components/RatingStars';
import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';
import { Image } from '@/components/ui/image';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';
import { EmptyState } from '@/elements';

export default function CafeDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const cafe = MOCK_CAFES.find((c: Cafe) => c.id === id);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const [isCheckedIn, setIsCheckedIn] = React.useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  if (!cafe) {
    return (
      <Layout>
        <EmptyState
          title="Cafe Not Found"
          description="Could not find the specified cafe"
          buttonText="Go Back"
          onPress={() => router.back()}
        />
      </Layout>
    );
  }

  return (
    <Layout>
      <ScrollView className="flex-1">
        <NetworkingCard
          cafeId={cafe.id}
          cafeName={cafe.name}
          onSiteCount={cafe.professionalCount}
          isCheckedIn={isCheckedIn}
          onCheckIn={() => setIsCheckedIn(true)}
          onViewProfessionals={() => {
            router.push({
              pathname: '/professionals',
              params: { cafeName: cafe.name },
            });
          }}
        />

        <Box className="relative h-[300px]">
          <Image
            source={{ uri: cafe.imageUrl }}
            alt={cafe.name}
            className="h-full w-full"
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.7)']}
            className="absolute bottom-0 left-0 right-0 h-1/2"
          />
          <Button
            variant="link"
            onPress={() => router.back()}
            className="absolute left-4 top-4 h-10 w-10 items-center justify-center rounded-full bg-black/50"
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </Button>
        </Box>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Box className="p-4">
            {/* Workspace Status */}
            <HStack className="mb-4 justify-between">
              <Box
                className={`bg-backgroundLight100 flex-row items-center rounded-2xl px-3 py-1.5 ${cafe.isOpen ? 'border-success500' : 'border-error500'
                  } border`}
              >
                <Box
                  className={`mr-1.5 h-2 w-2 rounded-full ${cafe.isOpen ? 'bg-success500' : 'bg-error500'
                    }`}
                />
                <Text className="text-textLight600 text-sm font-semibold">
                  {cafe.isOpen ? 'Open' : 'Closed'}
                </Text>
              </Box>
              <Box className="bg-backgroundLight100 flex-row items-center rounded-2xl px-3 py-1.5">
                <FontAwesome5 name="user-friends" size={16} color="#666" />
                <Text className="text-textLight600 ml-1.5 text-sm font-semibold">
                  {cafe.currentOccupancy}/50 seats
                </Text>
              </Box>
            </HStack>

            {/* Workspace Title & Rating */}
            <VStack className="mb-5">
              <Text className="text-textLight900 mb-2 font-bold text-2xl">
                {cafe.name}
              </Text>
              <HStack className="items-center">
                <RatingStars rating={cafe.rating} />
                <Text className="text-textLight600 ml-2 text-sm">
                  ({cafe.reviews} reviews)
                </Text>
              </HStack>
            </VStack>

            {/* Key Metrics */}
            <HStack className="bg-backgroundLight100 mb-6 justify-between rounded-xl p-4">
              {/* WiFi Speed */}
              <VStack className="flex-1 items-center">
                <MaterialCommunityIcons
                  name="wifi"
                  size={24}
                  color={
                    cafe.wifiSpeed >= 100
                      ? '#4CAF50'
                      : cafe.wifiSpeed >= 50
                        ? '#FFC107'
                        : '#FF5252'
                  }
                />
                <Text
                  className={`mb-0.5 mt-1 text-sm font-semibold ${cafe.wifiSpeed >= 100
                      ? 'text-success500'
                      : cafe.wifiSpeed >= 50
                        ? 'text-warning500'
                        : 'text-error500'
                    }`}
                >
                  {cafe.wifiSpeed} Mbps
                </Text>
                <Text className="text-textLight600 text-xs">WiFi Speed</Text>
              </VStack>

              {/* Noise Level */}
              <VStack className="flex-1 items-center">
                <FontAwesome5
                  name={
                    cafe.noiseLevel === 'quiet'
                      ? 'volume-off'
                      : cafe.noiseLevel === 'moderate'
                        ? 'volume-down'
                        : 'volume-up'
                  }
                  size={24}
                  color={
                    cafe.noiseLevel === 'quiet'
                      ? '#4CAF50'
                      : cafe.noiseLevel === 'moderate'
                        ? '#FFC107'
                        : '#FF5252'
                  }
                />
                <Text
                  className={`mb-0.5 mt-1 text-sm font-semibold ${cafe.noiseLevel === 'quiet'
                      ? 'text-success500'
                      : cafe.noiseLevel === 'moderate'
                        ? 'text-warning500'
                        : 'text-error500'
                    }`}
                >
                  {cafe.noiseLevel === 'quiet'
                    ? 'Quiet Zone'
                    : cafe.noiseLevel === 'moderate'
                      ? 'Moderate'
                      : 'Lively'}
                </Text>
                <Text className="text-textLight600 text-xs">Ambiance</Text>
              </VStack>

              {/* Power Outlets */}
              <VStack className="flex-1 items-center">
                <MaterialCommunityIcons
                  name="power-socket"
                  size={24}
                  color={cafe.powerOutlets ? '#4CAF50' : '#FF5252'}
                />
                <Text
                  className={`mb-0.5 mt-1 text-sm font-semibold ${cafe.powerOutlets ? 'text-success500' : 'text-error500'
                    }`}
                >
                  {cafe.powerOutlets ? 'Available' : 'Limited'}
                </Text>
                <Text className="text-textLight600 text-xs">Power</Text>
              </VStack>
            </HStack>

            {/* Professional Network */}
            <Box className="bg-backgroundLight100 mb-6 rounded-xl p-4">
              <Text className="text-textLight900 mb-3 font-bold text-lg">
                Professional Network
              </Text>
              <HStack className="items-center">
                <FontAwesome5 name="laptop" size={16} color="#666" />
                <Text className="text-textLight600 ml-2 text-sm">
                  {cafe.professionalCount} professionals working now
                </Text>
              </HStack>
            </Box>

            {/* Workspace Packages */}
            {cafe.popularItems && (
              <VStack className="mb-6">
                <Text className="text-textLight900 mb-3 font-bold text-lg">
                  Workspace Packages
                </Text>
                {cafe.popularItems.map(item => (
                  <Box
                    key={`${item.name}-${item.price}`}
                    className="bg-backgroundLight100 mb-3 rounded-xl p-4"
                  >
                    <HStack className="mb-2 items-center justify-between">
                      <Text className="text-textLight900 text-base font-semibold">
                        {item.name}
                      </Text>
                      <Text className="text-success500 text-base font-semibold">
                        {item.price}
                      </Text>
                    </HStack>
                    <Text className="text-textLight600 text-sm leading-5">
                      {item.description}
                    </Text>
                  </Box>
                ))}
              </VStack>
            )}

            {/* Description */}
            <VStack className="mb-6">
              <Text className="text-textLight900 mb-3 font-bold text-lg">
                About this Workspace
              </Text>
              <Text className="text-textLight600 text-sm leading-6">
                {cafe.description}
              </Text>
            </VStack>

            {/* Location Info */}
            <HStack className="bg-backgroundLight100 items-center rounded-xl p-4">
              <Ionicons name="location-outline" size={20} color="#666" />
              <Text className="text-textLight600 ml-2 text-sm">
                {cafe.distance} away
              </Text>
            </HStack>
          </Box>
        </Animated.View>
      </ScrollView>
    </Layout>
  );
}
