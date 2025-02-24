import React from 'react';
import { Dimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

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

    const width = interpolate(scrollX.value, inputRange, [8, 24, 8], 'clamp');
    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      'clamp',
    );
    const scale = interpolate(scrollX.value, inputRange, [1, 1.2, 1], 'clamp');

    return {
      width,
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          height: 8,
          borderRadius: 4,
          backgroundColor: '#4A2A85', // Brand purple
          marginHorizontal: 4,
        },
        dotStyle,
      ]}
    />
  );
}
