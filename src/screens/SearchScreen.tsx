import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import useCafes from '@/data/useCafe';
import { Cafe } from '@/types/cafe';
import { useRouter } from 'expo-router';

import { CafeCard } from '@/components/CafeCard';
import Layout from '@/components/Layout';
import { brandColors } from '@/components/ui/colors-reference';

const { width } = Dimensions.get('window');

export default function SearchScreen() {
  const router = useRouter();
  const [selectedCafe, setSelectedCafe] = useState<Cafe | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const { data: MOCK_CAFES } = useCafes();

  // Animations
  const spinAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(1)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;

  useEffect(() => {
    // Initial animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const spinWheel = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    const randomRotations = 5 + Math.random() * 5; // 5-10 rotations
    const randomCafe =
      MOCK_CAFES[Math.floor(Math.random() * MOCK_CAFES.length)];

    // Reset animations
    spinAnim.setValue(0);

    Animated.sequence([
      // Spin animation
      Animated.timing(spinAnim, {
        toValue: randomRotations,
        duration: 3000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      // Bounce animation
      Animated.spring(bounceAnim, {
        toValue: 1.2,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start(() => {
      // Reset bounce
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();

      setSelectedCafe(randomCafe);
      setIsSpinning(false);
    });
  };

  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Layout hasSafeArea={false}>
      <LinearGradient
        colors={[brandColors.purpleDark, brandColors.purple]}
        className="flex-1 p-8"
      >
        <Animated.View
          className="mb-10 mt-5 items-center"
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
        >
          <Text className="mb-2 text-center font-bold text-2xl text-white">
            Discover Your Workspace
          </Text>
          <Text className="text-center text-base text-white/80">
            Let fate decide your perfect spot today!
          </Text>
        </Animated.View>

        <View className="mb-10 items-center">
          <Pressable onPress={spinWheel} disabled={isSpinning}>
            <Animated.View
              className="rounded-full bg-white shadow-lg"
              style={[
                {
                  width: width * 0.8,
                  height: width * 0.8,
                  transform: [{ rotate: spin }, { scale: bounceAnim }],
                },
              ]}
            >
              <Image
                source={{
                  uri: 'https://spinthewheel.app/assets/images/preview/color-wheel-40Qgq.png',
                }}
                className="h-full w-full rounded-full"
              />
            </Animated.View>
          </Pressable>
        </View>

        {selectedCafe && (
          <Animated.View
            className="mt-5"
            style={{
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }}
          >
            <Text className="mb-4 text-center text-xl font-semibold text-white">
              Your Coffice Today:
            </Text>
            <CafeCard
              cafe={selectedCafe}
              onPress={cafe => {
                router.push({
                  pathname: '/cafe/[id]',
                  params: { id: cafe.id },
                });
              }}
            />
          </Animated.View>
        )}
      </LinearGradient>
    </Layout>
  );
}
