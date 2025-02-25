import React from 'react';
import { Animated } from 'react-native';

import { HStack } from '@/components/ui/hstack';
import { Pressable } from '@/components/ui/pressable';
import { ScrollView } from '@/components/ui/scroll-view';
import { Text } from '@/components/ui/text';

export type FilterOption = {
  id: string;
  label: string;
};

interface FilterChipsProps {
  options: FilterOption[];
  selectedFilters: string[];
  onToggleFilter: (filterId: string) => void;
}

export const FilterChips = ({
  options,
  selectedFilters,
  onToggleFilter,
}: FilterChipsProps) => {
  const animatedValues = React.useRef<{ [key: string]: Animated.Value }>(
    options.reduce(
      (acc, option) => ({
        ...acc,
        [option.id]: new Animated.Value(1),
      }),
      {},
    ),
  ).current;

  const handlePressIn = (id: string) => {
    Animated.spring(animatedValues[id], {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (id: string) => {
    Animated.spring(animatedValues[id], {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="h-10"
    >
      <HStack space="sm" className="items-center px-4">
        {options.map(option => {
          const isSelected = selectedFilters.includes(option.id);

          return (
            <Animated.View
              key={option.id}
              style={[{ transform: [{ scale: animatedValues[option.id] }] }]}
            >
              <Pressable
                onPress={() => onToggleFilter(option.id)}
                onPressIn={() => handlePressIn(option.id)}
                onPressOut={() => handlePressOut(option.id)}
                className={`rounded-full border px-4 py-2 ${isSelected
                    ? 'bg-textDark900 border-textDark900'
                    : 'bg-backgroundLight100 border-backgroundLight300'
                  }`}
              >
                <Text
                  className={
                    isSelected
                      ? 'text-sm text-white'
                      : 'text-textLight600 text-sm'
                  }
                >
                  {option.label}
                </Text>
              </Pressable>
            </Animated.View>
          );
        })}
      </HStack>
    </ScrollView>
  );
};
