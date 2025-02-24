import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface WorkPreferencesProps {
  preferences: string[];
}

export const WorkPreferences: React.FC<WorkPreferencesProps> = ({
  preferences,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Work Preferences</Text>
      {preferences.map((pref, index) => (
        <View key={index} style={styles.preferenceItem}>
          <Text style={styles.preferenceText}>• {pref}</Text>
        </View>
      ))}
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
  preferenceItem: {
    marginBottom: 4,
  },
  preferenceText: {
    fontSize: 14,
    color: '#444',
  },
});
