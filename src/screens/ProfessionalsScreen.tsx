import React, { useEffect, useRef } from 'react';
import { Alert, Animated } from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { Box } from '@/components/ui/box';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { VStack } from '@/components/ui/vstack';

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
];

export default function ProfessionalsScreen() {
  const { cafeName } = useLocalSearchParams<{ cafeName: string }>();
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    const animateIn = () => {
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
    };

    animateIn();
  }, [fadeAnim, slideAnim]);

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
    <Box className="bg-backgroundLight0 flex-1">
      <LinearGradient
        colors={['#1a73e8', '#0d47a1']}
        className="px-4 pb-4 pt-2"
      >
        <Button
          variant="link"
          onPress={() => router.back()}
          className="mb-4 h-10 w-10 items-center justify-center rounded-full bg-white/10"
        >
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </Button>
        <Text className="font-bold text-2xl text-white">
          Professionals On-site
        </Text>
        <Text className="text-base text-white/80">{cafeName}</Text>
      </LinearGradient>

      <Box className="flex-1 p-4">
        {MOCK_PROFESSIONALS.map(professional => (
          <Animated.View
            key={professional.id}
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            }}
            className="mb-4 rounded-2xl bg-white p-4 shadow-sm"
          >
            <VStack space="sm">
              <Box className="flex-row justify-between">
                <VStack space="xs">
                  <Text className="font-bold text-lg">{professional.name}</Text>
                  <Text className="text-textLight600 text-sm">
                    {professional.role}
                  </Text>
                  <Text className="text-textLight600 text-sm">
                    {professional.company}
                  </Text>
                </VStack>
                <Box
                  className={
                    professional.status === 'available'
                      ? 'bg-success100 rounded-xl px-2 py-1'
                      : 'bg-warning100 rounded-xl px-2 py-1'
                  }
                >
                  <Text
                    className={
                      professional.status === 'available'
                        ? 'text-success600 text-xs'
                        : 'text-warning600 text-xs'
                    }
                  >
                    {professional.status === 'available' ? 'Available' : 'Busy'}
                  </Text>
                </Box>
              </Box>

              <Box className="flex-row flex-wrap gap-2">
                {professional.skills.map(skill => (
                  <Box
                    key={`${professional.id}-${skill}`}
                    className="bg-backgroundLight200 rounded-2xl px-3 py-1.5"
                  >
                    <Text className="text-textLight600 text-xs">{skill}</Text>
                  </Box>
                ))}
              </Box>

              <Box className="flex-row items-center justify-between">
                <Text className="text-textLight600 text-xs">
                  <MaterialIcons name="access-time" size={14} color="#666" />{' '}
                  Checked in {professional.checkInTime}
                </Text>
                <Button
                  size="sm"
                  variant={
                    professional.status === 'do-not-disturb'
                      ? 'outline'
                      : 'solid'
                  }
                  onPress={() => handleConnect(professional)}
                  className="flex-row items-center px-3 py-1.5"
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
                    className={
                      professional.status === 'do-not-disturb'
                        ? 'text-textLight600 ml-1.5'
                        : 'text-primary600 ml-1.5'
                    }
                  >
                    Connect
                  </Text>
                </Button>
              </Box>
            </VStack>
          </Animated.View>
        ))}
      </Box>
    </Box>
  );
}
