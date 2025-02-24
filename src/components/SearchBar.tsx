import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ value, onChangeText, onClear }: SearchBarProps) => {
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={20}
        color="#666"
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.input}
        placeholder="Search cafés..."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
      {value.length > 0 && (
        <Pressable onPress={onClear} style={styles.clearButton}>
          <Ionicons name="close-circle" size={20} color="#666" />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
});
