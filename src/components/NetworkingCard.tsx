import React, { useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// import { toast } from 'sonner-native';

interface NetworkingCardProps {
  cafeId: string;
  cafeName: string;
  onSiteCount: number;
  isCheckedIn: boolean;
  onCheckIn: () => void;
  onViewProfessionals: () => void;
}

export const NetworkingCard: React.FC<NetworkingCardProps> = ({
  cafeName,
  onSiteCount,
  isCheckedIn,
  onCheckIn,
  onViewProfessionals,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;

  const handleCheckIn = () => {
    setIsAnimating(true);

    // Scale animation
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsAnimating(false);
      onCheckIn();

      // Show success toast
      // toast.success('Successfully checked in!', {
      //   description: `You're now visible to other professionals at ${cafeName}`,
      // });
    });
  };

  React.useEffect(() => {
    if (isCheckedIn) {
      // Continuous pulse animation for checked-in state
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.05,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [isCheckedIn]);

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale: scaleAnim }] }]}
    >
      <LinearGradient
        colors={isCheckedIn ? ['#4CAF50', '#2E7D32'] : ['#1a73e8', '#0d47a1']}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Networking</Text>
            {isCheckedIn && (
              <Animated.View
                style={[
                  styles.activeIndicator,
                  { transform: [{ scale: pulseAnim }] },
                ]}
              >
                <MaterialIcons name="verified" size={20} color="#fff" />
                <Text style={styles.activeText}>On-site</Text>
              </Animated.View>
            )}
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <FontAwesome5 name="users" size={20} color="#fff" />
              <Text style={styles.statValue}>{onSiteCount}</Text>
              <Text style={styles.statLabel}>Professionals On-site</Text>
            </View>
          </View>

          <View style={styles.actionContainer}>
            <Pressable
              style={[
                styles.button,
                isCheckedIn ? styles.checkedInButton : styles.checkInButton,
              ]}
              onPress={handleCheckIn}
              disabled={isAnimating || isCheckedIn}
            >
              <FontAwesome5
                name={isCheckedIn ? 'check-circle' : 'location-arrow'}
                size={16}
                color={isCheckedIn ? '#4CAF50' : '#fff'}
              />
              <Text
                style={[styles.buttonText, isCheckedIn && styles.checkedInText]}
              >
                {isCheckedIn ? 'Checked In' : 'Check In'}
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.viewButton]}
              onPress={onViewProfessionals}
            >
              <FontAwesome5 name="user-friends" size={16} color="#1a73e8" />
              <Text style={[styles.buttonText, styles.viewButtonText]}>
                View Professionals
              </Text>
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  gradient: {
    borderRadius: 16,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  activeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  activeText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    gap: 8,
  },
  checkInButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  checkedInButton: {
    backgroundColor: '#fff',
  },
  viewButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  checkedInText: {
    color: '#4CAF50',
  },
  viewButtonText: {
    color: '#1a73e8',
  },
});
