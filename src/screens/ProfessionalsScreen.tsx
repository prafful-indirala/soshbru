import React, { useEffect, useRef } from 'react';
import {
  Alert,
  Animated,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Professional {
  id: string;
  name: string;
  role: string;
  company: string;
  imageUrl: string;
  skills: string[];
  status: 'available' | 'busy' | 'do-not-disturb';
  checkInTime: string;
}

const MOCK_PROFESSIONALS: Professional[] = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Senior UX Designer',
    company: 'Design Co',
    imageUrl:
      'https://api.a0.dev/assets/image?text=professional%20asian%20woman%20designer%20headshot',
    skills: ['UI/UX', 'Product Design', 'Figma'],
    status: 'available',
    checkInTime: '2 hours ago',
  },
  {
    id: '2',
    name: 'Michael Ross',
    role: 'Full Stack Developer',
    company: 'Tech Solutions',
    imageUrl:
      'https://api.a0.dev/assets/image?text=professional%20man%20developer%20headshot',
    skills: ['React', 'Node.js', 'TypeScript'],
    status: 'busy',
    checkInTime: '1 hour ago',
  },
  {
    id: '3',
    name: 'Priya Patel',
    role: 'Product Manager',
    company: 'Innovation Labs',
    imageUrl:
      'https://api.a0.dev/assets/image?text=professional%20indian%20woman%20product%20manager%20headshot',
    skills: ['Strategy', 'Agile', 'Leadership'],
    status: 'available',
    checkInTime: '30 mins ago',
  },
  {
    id: '4',
    name: 'David Kim',
    role: 'Data Scientist',
    company: 'AI Solutions',
    imageUrl:
      'https://api.a0.dev/assets/image?text=professional%20asian%20man%20data%20scientist%20headshot',
    skills: ['Python', 'Machine Learning', 'Data Analysis'],
    status: 'do-not-disturb',
    checkInTime: '45 mins ago',
  },
];

export default function ProfessionalsScreen() {
  const { cafeName } = useLocalSearchParams<{ cafeName: string }>();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getStatusColor = (status: Professional['status']) => {
    switch (status) {
      case 'available':
        return '#4CAF50';
      case 'busy':
        return '#FFC107';
      case 'do-not-disturb':
        return '#FF5252';
      default:
        return '#999';
    }
  };

  const getStatusText = (status: Professional['status']) => {
    switch (status) {
      case 'available':
        return 'Available to Connect';
      case 'busy':
        return 'Currently Busy';
      case 'do-not-disturb':
        return 'Do Not Disturb';
      default:
        return 'Unknown Status';
    }
  };

  const handleConnect = (professional: Professional) => {
    if (professional.status === 'do-not-disturb') {
      Alert.alert(
        'Cannot Connect',
        'This professional has enabled Do Not Disturb mode.',
      );
      return;
    }

    Alert.alert(
      'Connection Request Sent',
      `Your request has been sent to ${professional.name}.`,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#1a73e8', '#0d47a1']} style={styles.header}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Pressable>
        <Text style={styles.title}>Professionals On-site</Text>
        <Text style={styles.subtitle}>{cafeName}</Text>
      </LinearGradient>

      <ScrollView style={styles.content}>
        {MOCK_PROFESSIONALS.map((professional, index) => (
          <Animated.View
            key={professional.id}
            style={[
              styles.card,
              {
                opacity: fadeAnim,
                transform: [
                  {
                    translateY: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [50 * (index + 1), 0],
                    }),
                  },
                ],
              },
            ]}
          >
            <View style={styles.cardHeader}>
              <Image
                source={{ uri: professional.imageUrl }}
                style={styles.avatar}
              />
              <View style={styles.userInfo}>
                <Text style={styles.name}>{professional.name}</Text>
                <Text style={styles.role}>{professional.role}</Text>
                <Text style={styles.company}>{professional.company}</Text>
              </View>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor: `${getStatusColor(professional.status)}15`,
                  },
                ]}
              >
                <View
                  style={[
                    styles.statusDot,
                    { backgroundColor: getStatusColor(professional.status) },
                  ]}
                />
                <Text
                  style={[
                    styles.statusText,
                    { color: getStatusColor(professional.status) },
                  ]}
                >
                  {getStatusText(professional.status)}
                </Text>
              </View>
            </View>

            <View style={styles.skillsContainer}>
              {professional.skills.map(skill => (
                <View
                  key={`${professional.id}-${skill}`}
                  style={styles.skillBadge}
                >
                  <Text style={styles.skillText}>{skill}</Text>
                </View>
              ))}
            </View>

            <View style={styles.footer}>
              <Text style={styles.timeText}>
                <MaterialIcons name="access-time" size={14} color="#666" />{' '}
                Checked in {professional.checkInTime}
              </Text>
              <Pressable
                style={[
                  styles.connectButton,
                  professional.status === 'do-not-disturb' &&
                  styles.connectButtonDisabled,
                ]}
                onPress={() => handleConnect(professional)}
              >
                <FontAwesome5
                  name="user-plus"
                  size={14}
                  color={
                    professional.status === 'do-not-disturb'
                      ? '#666'
                      : '#1a73e8'
                  }
                />
                <Text
                  style={[
                    styles.connectText,
                    professional.status === 'do-not-disturb' &&
                    styles.connectTextDisabled,
                  ]}
                >
                  Connect
                </Text>
              </Pressable>
            </View>
          </Animated.View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  role: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  company: {
    fontSize: 14,
    color: '#666',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  skillBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    fontSize: 12,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeText: {
    fontSize: 12,
    color: '#666',
  },
  connectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  connectButtonDisabled: {
    backgroundColor: '#f0f0f0',
  },
  connectText: {
    fontSize: 14,
    color: '#1a73e8',
    fontWeight: '500',
    marginLeft: 6,
  },
  connectTextDisabled: {
    color: '#666',
  },
});
