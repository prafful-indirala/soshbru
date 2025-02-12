import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_COMPLETE_KEY = '@soshbru:onboarding_complete';

export const useFirstTimeUser = () => {
  const [isFirstTime, setIsFirstTime] = useState<boolean | null>(null);

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    try {
      const status = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
      setIsFirstTime(status === null);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      setIsFirstTime(true); // Default to showing onboarding if there's an error
    }
  };

  const completeOnboarding = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'completed');
      setIsFirstTime(false);
    } catch (error) {
      console.error('Error setting onboarding status:', error);
    }
  };

  return {
    isFirstTime,
    completeOnboarding,
  };
};
