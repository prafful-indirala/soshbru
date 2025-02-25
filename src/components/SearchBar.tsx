import React from 'react';
import { TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Button } from '@/components/ui/button';
import { grayScale } from '@/components/ui/colors-reference';
import { HStack } from '@/components/ui/hstack';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}

export const SearchBar = ({ value, onChangeText, onClear }: SearchBarProps) => {
  return (
    <HStack className="mb-4 h-12 items-center rounded-xl bg-white px-3 shadow-sm">
      <Ionicons
        name="search"
        size={20}
        color={grayScale.gray500}
        className="mr-2"
      />
      <TextInput
        className="text-textDark900 flex-1 text-base"
        placeholder="Search coffice..."
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={grayScale.gray400}
      />
      {value.length > 0 && (
        <Button variant="link" onPress={onClear} className="p-1">
          <Ionicons name="close-circle" size={20} color={grayScale.gray500} />
        </Button>
      )}
    </HStack>
  );
};
