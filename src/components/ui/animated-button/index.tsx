import React from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Pressable } from '../pressable';
import { Text } from '../text';

interface AnimatedButtonProps {
  onPress: () => void | Promise<void>;
  text: string;
  className?: string;
  style?: StyleProp<ViewStyle>;
}

export default function AnimatedButton({
  onPress,
  text,
  className = 'mt-8 w-full rounded-full bg-blue-500 py-4',
  style,
}: AnimatedButtonProps) {
  const opacity = useSharedValue(1);

  const handlePress = async () => {
    opacity.value = withSequence(
      withTiming(0, { duration: 100 }),
      withTiming(1, { duration: 100 }),
    );
    await onPress();
  };

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    width: '100%',
    transform: [
      {
        scale: interpolate(opacity.value, [0, 1], [0.9, 1]),
      },
    ],
  }));

  return (
    <Animated.View style={[buttonStyle, style]}>
      <Pressable className={className} onPress={handlePress}>
        <Text className="text-center text-lg font-semibold text-white">
          {text}
        </Text>
      </Pressable>
    </Animated.View>
  );
}
