import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';

interface NetworkingToggleProps {
  value: boolean;
  onValueChange: (newValue: boolean) => void;
}

export const NetworkingToggle: React.FC<NetworkingToggleProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Show me for networking</Text>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={value ? '#1a73e8' : '#f4f3f4'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  label: {
    fontSize: 16,
    color: '#1a1a1a',
  },
});
