import React from 'react';
import { Animated, TouchableOpacity } from 'react-native';
import { MapPin, Star, Volume1, Wifi } from 'lucide-react-native';
import { Cafe } from '@/types/cafe';

import {
  Avatar,
  AvatarBadge,
  AvatarFallbackText,
  AvatarGroup,
  AvatarImage,
} from '@/components/ui/avatar';
import { Box } from '@/components/ui/box';
import { brandColors } from '@/components/ui/colors-reference';
import { Divider } from '@/components/ui/divider';
import { HStack } from '@/components/ui/hstack';
import { ImageBackground } from '@/components/ui/image-background';
import { Pressable } from '@/components/ui/pressable';
import { Text } from '@/components/ui/text';

interface CafeCardProps {
  cafe: Cafe;
  onPress: (cafe: Cafe) => void;
}

const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
];
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
      >
        <Box className="my-2 rounded-2xl border border-gray-200 bg-white shadow-lg">
          <ImageBackground
            source={{ uri: cafe.imageUrl }}
            className="h-48 w-full overflow-hidden rounded-t-2xl"
          />

          <Box className="p-4">
            {/* Title and Rating */}
            <Box className="mb-4 flex-row items-center justify-between">
              <Text className="font-bold text-xl text-gray-900">
                {cafe.name}
              </Text>
              <Box className="flex-row items-center rounded-full bg-yellow-100 px-2 py-1">
                <Star size={16} color="#FFB800" fill="#FFB800" />
                <Text className="ml-1 font-medium text-red-900">4.8</Text>
              </Box>
            </Box>

            {/* Amenities */}
            <Box className="mb-4 flex-row items-center gap-3">
              <Box className="flex-row items-center gap-1">
                <Wifi size={16} color={brandColors.purpleDark} />
                <Box className="h-1 w-8 rounded-lg bg-orange-500" />
              </Box>

              <Box className="flex-row items-center">
                <Volume1 size={16} color={brandColors.purpleDark} />
                <Text className="ml-1 text-gray-600">Low</Text>
              </Box>

              <Box className="flex-row items-center">
                <MapPin size={16} color={brandColors.purpleDark} />
                <Text className="ml-1 text-gray-600">0.3 km</Text>
              </Box>
            </Box>

            {/* Tags */}
            {/* <Box className="mb-4 flex-row space-x-2">
              {['Designer', 'Developer', 'Writer'].map(tag => (
                <Box key={tag} className="rounded-full bg-gray-100 px-3 py-1">
                  <Text className="text-sm text-gray-600">{tag}</Text>
                </Box>
              ))}
            </Box> */}

            <Divider className="mb-2" />
            {/* Working Here & Check In */}
            <Box className="flex-row items-center justify-between">
              <Box className="flex-row items-center">
                <HStack className="gap-0">
                  <AvatarGroup>
                    {avatars.map(avatar => (
                      <Avatar
                        size="sm"
                        key={avatar}
                        className="border-2 border-white"
                      >
                        <AvatarFallbackText>John Doe</AvatarFallbackText>
                        <AvatarImage
                          source={{
                            uri: avatar,
                          }}
                        />
                        {/* <AvatarBadge /> */}
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </HStack>
                <Text className="ml-2 text-gray-600">3 working here</Text>
              </Box>

              <TouchableOpacity
                className="rounded-full bg-orange-400 px-4 py-2"
                onPress={() => { }}
              >
                <Text className="font-medium text-white">👋🏻 I'm here</Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Pressable>
    </Animated.View>
  );
};
