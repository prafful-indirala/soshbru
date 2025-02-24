import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface RatingStarsProps {
  rating: number;
}

export const RatingStars = ({ rating }: RatingStarsProps) => {
  return (
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>{rating}</Text>
      <MaterialIcons name="star" size={16} color="#FFD700" />
    </View>
  );
};

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#fff',
    marginRight: 4,
    fontSize: 14,
  },
});
