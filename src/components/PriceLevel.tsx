import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface PriceLevelProps {
  level: string;
}

export const PriceLevel = ({ level }: PriceLevelProps) => {
  return <Text style={styles.priceLevel}>{level}</Text>;
};

const styles = StyleSheet.create({
  priceLevel: {
    color: '#fff',
    fontSize: 14,
  },
});
