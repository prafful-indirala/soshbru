import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StatusBadgeProps {
  isOpen: boolean;
}

export const StatusBadge = ({ isOpen }: StatusBadgeProps) => {
  return (
    <View style={styles.statusContainer}>
      <View
        style={[
          styles.statusDot,
          { backgroundColor: isOpen ? '#4CAF50' : '#FF5252' },
        ]}
      />
      <Text style={styles.statusText}>{isOpen ? 'Open' : 'Closed'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#fff',
    fontSize: 14,
  },
});
