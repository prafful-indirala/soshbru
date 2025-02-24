import React from 'react';
import {
  Animated,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';

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
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {options.map(option => {
        const isSelected = selectedFilters.includes(option.id);
        return (
          <Animated.View
            key={option.id}
            style={[
              styles.chipContainer,
              { transform: [{ scale: animatedValues[option.id] }] },
            ]}
          >
            <Pressable
              style={[styles.chip, isSelected && styles.selectedChip]}
              onPress={() => onToggleFilter(option.id)}
              onPressIn={() => handlePressIn(option.id)}
              onPressOut={() => handlePressOut(option.id)}
            >
              <Text
                style={[styles.chipText, isSelected && styles.selectedChipText]}
              >
                {option.label}
              </Text>
            </Pressable>
          </Animated.View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 40,
  },
  contentContainer: {
    paddingHorizontal: 16,
    alignItems: 'center', // Center chips vertically
  },
  chipContainer: {
    marginRight: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 18,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    height: '100%', // Fill chip container height
    justifyContent: 'center', // Center text vertically
  },
  selectedChip: {
    backgroundColor: '#1a1a1a',
    borderColor: '#1a1a1a',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
  },
  selectedChipText: {
    color: '#fff',
  },
});
