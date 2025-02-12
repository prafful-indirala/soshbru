import React, { useCallback, useRef, useState } from 'react';
import { Dimensions, FlatList, ViewToken } from 'react-native';
import { router } from 'expo-router';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { OnboardingSlide } from '@/types/onboarding';

import { useFirstTimeUser } from '@/hooks/useFirstTimeUser';
import {
  CafeIllustration,
  GrowthIllustration,
  NetworkingIllustration,
} from '@/components/illustrations/OnboardingIllustrations';

import { Box } from '@/ui/box';
import { Button, ButtonText } from '@/ui/button';
import { HStack } from '@/ui/hstack';
import { Text } from '@/ui/text';
import { VStack } from '@/ui/vstack';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const onboardingSlides: (OnboardingSlide & {
  Illustration: () => JSX.Element;
})[] = [
    {
      id: 1,
      title: 'Find Your Perfect Workspace',
      description:
        'Discover cozy cafes around you perfect for working and networking',
      Illustration: CafeIllustration,
    },
    {
      id: 2,
      title: 'Break the Ice',
      description: 'Connect with like-minded professionals in your chosen cafe',
      Illustration: NetworkingIllustration,
    },
    {
      id: 3,
      title: 'Grow Your Network',
      description:
        'Build meaningful connections while enjoying your favorite brew',
      Illustration: GrowthIllustration,
    },
  ];

const AnimatedFlatList = Animated.createAnimatedComponent(
  FlatList<OnboardingSlide & { Illustration: () => JSX.Element }>,
);

const OnboardingDot = ({
  index,
  scrollX,
}: {
  index: number;
  scrollX: Animated.SharedValue<number>;
}) => {
  const dotStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    const width = interpolate(scrollX.value, inputRange, [8, 16, 8], 'clamp');
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      'clamp',
    );

    return {
      width,
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: '#007AFF',
          marginHorizontal: 4,
        },
        dotStyle,
      ]}
    />
  );
};

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<FlatList>(null);
  const scrollX = useSharedValue(0);
  const { completeOnboarding } = useFirstTimeUser();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems[0]) {
        setCurrentIndex(viewableItems[0].index || 0);
      }
    },
    [],
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50,
  };

  const renderItem = useCallback(
    ({
      item,
    }: {
      item: OnboardingSlide & { Illustration: () => JSX.Element };
    }) => (
      <Box className="w-screen px-4">
        <VStack className="items-center justify-center">
          <Box className="h-[300px] w-[300px] items-center justify-center">
            <item.Illustration />
          </Box>
          <Text className="mt-8 text-center text-2xl font-bold">
            {item.title}
          </Text>
          <Text className="mt-4 text-center text-base text-gray-600">
            {item.description}
          </Text>
        </VStack>
      </Box>
    ),
    [],
  );

  const handleNext = async () => {
    if (currentIndex < onboardingSlides.length - 1) {
      slidesRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      await completeOnboarding();
      router.replace('/auth/register');
    }
  };

  return (
    <Box className="flex-1 bg-white">
      <AnimatedFlatList
        ref={slidesRef}
        data={onboardingSlides}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={event => {
          scrollX.value = event.nativeEvent.contentOffset.x;
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        keyExtractor={item => `slide-${item.id}`}
      />
      <VStack className="absolute bottom-12 w-full items-center px-4">
        <HStack space="sm" className="mt-4">
          {onboardingSlides.map((_, index) => (
            <OnboardingDot
              key={`dot-${index}`}
              index={index}
              scrollX={scrollX}
            />
          ))}
        </HStack>
        <Button
          size="lg"
          variant="solid"
          className="mt-8 w-full"
          onPress={handleNext}
        >
          <Text>
            hello
            {currentIndex === onboardingSlides.length - 1
              ? 'Get Started'
              : 'Next'}
          </Text>
        </Button>
      </VStack>
    </Box>
  );
};

export default OnboardingScreen;
