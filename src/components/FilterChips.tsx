import React from 'react';
import { Animated, StyleSheet } from 'react-native';

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

const FilterChipsComponent: React.FC<FilterChipsProps> = ({
  options,
  selectedFilters,
  onToggleFilter,
}) => {
  const animatedValuesRef = React.useRef<{ [key: string]: Animated.Value }>({});

  React.useEffect(() => {
    // Capture current ref values at the start of the effect
    const currentAnimatedValues = { ...animatedValuesRef.current };

    options.forEach(option => {
      if (!currentAnimatedValues[option.id]) {
        const newValue = new Animated.Value(1);
        currentAnimatedValues[option.id] = newValue;
        animatedValuesRef.current[option.id] = newValue;
      }
    });

    // Clean up old animation values
    Object.keys(currentAnimatedValues).forEach(id => {
      if (!options.some(option => option.id === id)) {
        delete currentAnimatedValues[id];
        delete animatedValuesRef.current[id];
      }
    });

    // Update the ref with cleaned up values
    animatedValuesRef.current = currentAnimatedValues;

    console.log('FilterChips mounted with options:', options);
    console.log('Selected filters:', selectedFilters);

    return () => {
      // Use captured values in cleanup
      Object.keys(currentAnimatedValues).forEach(id => {
        currentAnimatedValues[id].removeAllListeners();
      });
    };
  }, [options, selectedFilters]);

  // Memoize the toggle handler to prevent recreating on every render
  const handleToggle = React.useCallback(
    (id: string) => {
      console.log('Filter toggled:', id);
      onToggleFilter(id);
    },
    [onToggleFilter],
  );

  const handlePressIn = React.useCallback((id: string) => {
    const value = animatedValuesRef.current[id];
    if (value) {
      Animated.spring(value, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  const handlePressOut = React.useCallback((id: string) => {
    const value = animatedValuesRef.current[id];
    if (value) {
      Animated.spring(value, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, []);

  // Pre-compute filter chips to avoid conditional rendering issues
  const filterChips = options.map(option => {
    const isSelected = selectedFilters.includes(option.id);
    // Ensure animation value exists
    if (!animatedValuesRef.current[option.id]) {
      animatedValuesRef.current[option.id] = new Animated.Value(1);
    }
    return {
      ...option,
      isSelected,
      animValue: animatedValuesRef.current[option.id],
    };
  });

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className="h-10"
    >
      <HStack space="sm" className="items-center px-4">
        {filterChips.map(({ id, label, isSelected, animValue }) => (
          <Animated.View key={id} style={{ transform: [{ scale: animValue }] }}>
            <Pressable
              onPress={() => handleToggle(id)}
              onPressIn={() => handlePressIn(id)}
              onPressOut={() => handlePressOut(id)}
              className={
                isSelected
                  ? 'bg-textDark900 border-textDark900 rounded-full border px-4 py-2'
                  : 'bg-backgroundLight100 border-backgroundLight300 rounded-full border px-4 py-2'
              }
            >
              <Text
                style={isSelected ? styles.selectedText : styles.normalText}
              >
                {label}
              </Text>
            </Pressable>
          </Animated.View>
        ))}
      </HStack>
    </ScrollView>
  );
};

// Export memoized component
export const FilterChips = React.memo(FilterChipsComponent);

const styles = StyleSheet.create({
  selectedText: {
    fontSize: 14,
    color: '#fff',
  },
  normalText: {
    fontSize: 14,
    color: '#4B5563',
  },
});
