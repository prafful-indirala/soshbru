import React, { createElement } from 'react';
import { Tabs } from 'expo-router';
import { CircleUser, HomeIcon, SearchIcon } from 'lucide-react-native';
import { useStore } from '@/store';

import { HapticTab } from '@/components/HapticTab';
import { brandColors } from '@/components/ui/colors-reference';

// Data array for tabs
const tabNavigationData = [
  {
    name: 'home/index',
    title: 'Home',
    icon: HomeIcon,
  },
  {
    name: 'search/index',
    title: 'Search',
    icon: SearchIcon,
  },
  {
    name: 'account/index',
    title: 'Account',
    icon: CircleUser,
  },
];

export default function TabLayout() {
  const theme = useStore(state => state.theme);

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: brandColors.purpleDark,
        tabBarInactiveTintColor: theme === 'dark' ? '#6B7280' : '#9CA3AF',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
        },
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      {tabNavigationData.map(tab => (
        <Tabs.Screen
          key={tab?.name}
          name={tab?.name}
          options={{
            tabBarLabel: tab?.title,
            tabBarLabelStyle: {
              fontFamily: 'Poppins',
            },
            tabBarIcon: ({ color }) => createElement(tab.icon, { color }),
          }}
        />
      ))}
    </Tabs>
  );
}
