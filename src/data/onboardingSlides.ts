import type { OnboardingSlide } from '@/types/onboarding';

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 1,
    title: 'Find Your Perfect Workspace',
    description:
      'Discover cozy cafes around you perfect for working and networking',
    // lottieSource: require('@/assets/animations/cafe-workspace.json'),
    lottieSource: null,
  },
  {
    id: 2,
    title: 'Break the Ice',
    description: 'Connect with like-minded professionals in your chosen cafe',
    // lottieSource: require('@/assets/animations/networking.json'),
    lottieSource: null,
  },
  {
    id: 3,
    title: 'Grow Your Network',
    description:
      'Build meaningful connections while enjoying your favorite brew',
    // lottieSource: require('@/assets/animations/growth.json'),
    lottieSource: null,
  },
];
