import React, { useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SCREEN_WIDTH } from '@/constants/screen';
import { onboardingSlides } from '@/data/onboardingSlides';
import type { OnboardingSlide } from '@/types/onboarding';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useFirstTimeUser } from '@/hooks/useFirstTimeUser';
import Layout from '@/components/Layout';
import OnboardingDot from '@/components/OnboardingDot';
import AnimatedButton from '@/components/ui/animated-button';
import { Text } from '@/components/ui/text';
import { View } from '@/components/ui/view';

const styles = StyleSheet.create({
  lottieView: {
    height: 300,
    width: 300,
  },
});

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const { completeOnboarding } = useFirstTimeUser();
  const router = useRouter();

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollX.value = event.contentOffset.x;
      runOnJS(setCurrentIndex)(
        Math.round(event.contentOffset.x / SCREEN_WIDTH),
      );
    },
  });

  const renderItem = useCallback(
    ({ item }: { item: OnboardingSlide }) => (
      <View className="w-screen px-4">
        <View className="items-center justify-center">
          <View className="h-[300px] w-[300px] items-center justify-center">
            {item.lottieSource && (
              <LottieView
                source={item.lottieSource}
                autoPlay
                loop
                style={styles.lottieView}
              />
            )}
          </View>
          <Text className="mt-8 text-center font-heading text-3xl">
            {item.title}
          </Text>
          <Text className="mt-4 text-center text-lg">{item.description}</Text>
        </View>
      </View>
    ),
    [],
  );

  const handleNext = async () => {
    if (currentIndex < onboardingSlides.length - 1) {
      scrollX.value = withTiming((currentIndex + 1) * SCREEN_WIDTH, {
        duration: 300,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      await completeOnboarding();
      router.replace('/auth/login');
    }
  };

  return (
    <Layout hasSafeArea={false}>
      <View className="flex-1">
        <Animated.FlatList
          data={onboardingSlides}
          renderItem={renderItem}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
          keyExtractor={item => `slide-${item.id}`}
        />
        <BlurView
          intensity={80}
          tint="light"
          className="absolute bottom-0 left-0 right-0"
        >
          <View className="w-full items-center px-4 py-8">
            <View className="mt-4 flex-row space-x-2">
              {onboardingSlides.map((slide: OnboardingSlide) => (
                <OnboardingDot
                  key={`dot-${slide.id}`}
                  index={onboardingSlides.indexOf(slide)}
                  scrollX={scrollX}
                />
              ))}
            </View>
            {/* <ThemeToggle /> */}
            <AnimatedButton
              text={
                currentIndex === onboardingSlides.length - 1
                  ? 'Get Started'
                  : 'Next'
              }
              onPress={handleNext}
              className="mt-8 w-full rounded-full bg-blue-500 py-4"
            />
          </View>
        </BlurView>
      </View>
    </Layout>
  );
}
