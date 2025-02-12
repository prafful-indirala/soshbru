export interface OnboardingSlide {
  id: number;
  title: string;
  description: string;
  lottieSource: any;
}

export interface UserProfile {
  email: string;
  password: string;
  fullName: string;
  bio?: string;
  interests: string[];
  profilePhoto?: string;
  workPreferences: {
    preferredCafes?: string[];
    networkingInterests: ('professional' | 'casual' | 'mentorship')[];
    availableTimes?: string[];
  };
}

export type OnboardingStep =
  | 'welcome'
  | 'create-profile'
  | 'location-permission'
  | 'interests'
  | 'complete';
