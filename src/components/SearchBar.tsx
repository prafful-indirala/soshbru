import React from 'react';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/ui/button';
import { HStack } from '@/components/ui/hstack';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ value, onChangeText, onClear }: SearchBarProps) => {
  return (
    <HStack className="mb-4 h-12 items-center rounded-xl bg-white px-3 shadow-sm">
      <Ionicons name="search" size={20} color="#666" className="mr-2" />
      <TextInput
        className="text-textDark900 flex-1 text-base"
        placeholder="Search cafés..."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
      />
      {value.length > 0 && (
        <Button variant="link" onPress={onClear} className="p-1">
          <Ionicons name="close-circle" size={20} color="#666" />
        </Button>
      )}
    </HStack>
  );
};
