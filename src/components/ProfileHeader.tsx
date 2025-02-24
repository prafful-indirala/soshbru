import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ProfileHeaderProps {
  name: string;
  designation: string;
  bio: string;
  onEdit: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  name,
  designation,
  bio,
  onEdit,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.name}>{name}</Text>
        <Pressable onPress={onEdit} style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#1a73e8" />
        </Pressable>
      </View>
      <Text style={styles.designation}>{designation}</Text>
      <Text style={styles.bio}>{bio}</Text>
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  editButton: {
    padding: 4,
  },
  designation: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  bio: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
});
