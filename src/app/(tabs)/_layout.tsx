import React, { createElement } from 'react';
import { Tabs } from 'expo-router';
import { CircleUser, HomeIcon, SearchIcon } from 'lucide-react-native';

import { HapticTab } from '@/components/HapticTab';

// Define styles outside of the component
const tabBarStyle = {
  // backgroundColor: '#020F1C',
};

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

// Define screen options once outside of the component
const screenOptions = {
  tabBarActiveTintColor: 'black',
  tabBarInactiveTintColor: 'grey',
  tabBarStyle,
  headerShown: false,
  tabBarButton: HapticTab,
};

export default function TabLayout() {
  return (
    <Tabs screenOptions={screenOptions}>
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
