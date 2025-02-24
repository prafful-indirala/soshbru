import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// import { toast } from 'sonner-native';

interface SignUpFormProps {
  onSuccess: () => void;
  onToggleMode: () => void;
}

export const SignUpForm: React.FC<SignUpFormProps> = ({
  onSuccess,
  onToggleMode,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = () => {
    if (!name || !email || !password || !confirmPassword) {
      // toast.error('Missing Fields', {
      //   description: 'Please fill in all required fields.',
      // });
      return;
    }

    if (password !== confirmPassword) {
      // toast.error('Password Mismatch', {
      //   description: 'Passwords do not match.',
      // });
      return;
    }

    // Here you would typically make an API call to register
    // toast.success('Welcome!', {
    //   description: 'Account created successfully.',
    // });
    onSuccess();
  };

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-outline"
            size={20}
            color="rgba(255,255,255,0.7)"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={name}
            onChangeText={setName}
            autoCapitalize="words"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="mail-outline"
            size={20}
            color="rgba(255,255,255,0.7)"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="rgba(255,255,255,0.7)"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <Pressable
            onPress={() => setShowPassword(!showPassword)}
            style={styles.showPasswordButton}
          >
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="rgba(255,255,255,0.7)"
            />
          </Pressable>
        </View>

        <View style={styles.inputContainer}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="rgba(255,255,255,0.7)"
            style={styles.inputIcon}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
          />
          <Pressable
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
            style={styles.showPasswordButton}
          >
            <Ionicons
              name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="rgba(255,255,255,0.7)"
            />
          </Pressable>
        </View>

        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Create Account</Text>
        </Pressable>

        <Pressable style={styles.toggleButton} onPress={onToggleMode}>
          <Text style={styles.toggleButtonText}>
            Already have an account? Sign In
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  form: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
    marginBottom: 16,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    height: '100%',
  },
  showPasswordButton: {
    padding: 8,
  },
  submitButton: {
    backgroundColor: '#fff',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonText: {
    color: '#1a73e8',
    fontSize: 16,
    fontWeight: '600',
  },
  toggleButton: {
    alignItems: 'center',
  },
  toggleButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
});
