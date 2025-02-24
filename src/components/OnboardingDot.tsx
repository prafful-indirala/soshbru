import React from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import { Box } from '@/components/ui/box';

interface OnboardingDotProps {
  index: number;
  scrollX: Animated.SharedValue<number>;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export default function OnboardingDot({ index, scrollX }: OnboardingDotProps) {
  const dotStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * SCREEN_WIDTH,
      index * SCREEN_WIDTH,
      (index + 1) * SCREEN_WIDTH,
    ];

    return {
      width: interpolate(scrollX.value, inputRange, [8, 24, 8], 'clamp'),
      opacity: interpolate(scrollX.value, inputRange, [0.5, 1, 0.5], 'clamp'),
      transform: [
        {
          scale: interpolate(scrollX.value, inputRange, [1, 1.2, 1], 'clamp'),
        },
      ],
    };
  });

  return (
    <Box>
      <Animated.View
        style={[
          {
            height: 8,
            borderRadius: 4,
            backgroundColor: '#4A2A85',
            marginHorizontal: 4,
          },
          dotStyle,
        ]}
      />
    </Box>
  );
}
