import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface FavoriteCafesProps {
  cafes: string[];
}

export const FavoriteCafes: React.FC<FavoriteCafesProps> = ({ cafes }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favorite Workspaces</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {cafes.map((cafe, index) => (
          <View key={index} style={styles.cafeChip}>
            <Text style={styles.cafeText}>{cafe}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  scrollContainer: {
    flexDirection: 'row',
  },
  cafeChip: {
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  cafeText: {
    fontSize: 14,
    color: '#444',
  },
});
