import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AccountScreen() {
  const { width } = useWindowDimensions();
  const scrollY = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const statsAnimations = [0, 1, 2].map(
    () => useRef(new Animated.Value(0)).current,
  );
  const [activeTab, setActiveTab] = React.useState('overview');
  const [networkingVisible, setNetworkingVisible] = React.useState(true);

  // Profile data
  const profile = {
    name: 'Alex Johnson',
    avatar:
      'https://api.a0.dev/assets/image?text=professional%20headshot%20of%20young%20professional',
    designation: 'Senior Software Engineer',
    location: 'Digital Nomad • Currently in Bali',
    bio: 'Remote developer passionate about productivity and community. Building scalable solutions while exploring the world.',
    stats: {
      focusHours: '127',
      workspaces: '12',
      connections: '84',
    },
    skills: ['React Native', 'TypeScript', 'UI/UX', 'Cloud Architecture'],
    preferences: [
      { icon: 'wifi', label: 'High-Speed WiFi (300+ Mbps)' },
      { icon: 'volume-off', label: 'Quiet Environment' },
      { icon: 'laptop', label: 'Ergonomic Setup' },
      { icon: 'people', label: 'Networking Friendly' },
    ],
  };

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.stagger(
        150,
        statsAnimations.map(anim =>
          Animated.spring(anim, {
            toValue: 1,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
          }),
        ),
      ),
    ]).start();
  }, []);

  const headerTranslate = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -100],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container}>
      {/* Animated Header */}
      <Animated.View
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslate }],
            opacity: headerOpacity,
          },
        ]}
      >
        <LinearGradient
          colors={['#1a73e8', '#0d47a1']}
          style={styles.headerGradient}
        >
          <Animated.Image
            source={{ uri: profile.avatar }}
            style={[
              styles.avatar,
              {
                transform: [{ scale: scaleAnim }],
                opacity: fadeAnim,
              },
            ]}
          />
          <Animated.Text style={[styles.name, { opacity: fadeAnim }]}>
            {profile.name}
          </Animated.Text>
          <Animated.Text style={[styles.designation, { opacity: fadeAnim }]}>
            {profile.designation}
          </Animated.Text>
          <Animated.View
            style={[styles.locationContainer, { opacity: fadeAnim }]}
          >
            <Ionicons name="location-outline" size={16} color="#fff" />
            <Text style={styles.location}>{profile.location}</Text>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      {/* Main Content */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {/* Professional Stats */}
        <View style={styles.statsContainer}>
          {[
            {
              icon: 'timer',
              value: profile.stats.focusHours,
              label: 'Focus Hours',
            },
            {
              icon: 'location-on',
              value: profile.stats.workspaces,
              label: 'Workspaces',
            },
            {
              icon: 'people',
              value: profile.stats.connections,
              label: 'Network',
            },
          ].map((stat, index) => (
            <Animated.View
              key={index}
              style={[
                styles.statItem,
                {
                  opacity: statsAnimations[index],
                  transform: [
                    { scale: statsAnimations[index] },
                    {
                      translateY: statsAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [20, 0],
                      }),
                    },
                  ],
                },
              ]}
            >
              <MaterialIcons name={stat.icon} size={24} color="#1a73e8" />
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </Animated.View>
          ))}
        </View>

        {/* Bio Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>{profile.bio}</Text>
        </View>

        {/* Skills Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.skillsContainer}>
            {profile.skills.map((skill, index) => (
              <View key={index} style={styles.skillBadge}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Work Preferences */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Preferences</Text>
          {profile.preferences.map((pref, index) => (
            <View key={index} style={styles.preferenceItem}>
              <FontAwesome5 name={pref.icon} size={16} color="#1a73e8" />
              <Text style={styles.preferenceText}>{pref.label}</Text>
            </View>
          ))}
        </View>

        {/* Networking Toggle */}
        <View style={styles.section}>
          <View style={styles.networkingHeader}>
            <Text style={styles.sectionTitle}>Networking</Text>
            <Pressable
              style={[
                styles.networkingToggle,
                networkingVisible && styles.networkingToggleActive,
              ]}
              onPress={() => setNetworkingVisible(!networkingVisible)}
            >
              <Text
                style={[
                  styles.networkingToggleText,
                  networkingVisible && styles.networkingToggleTextActive,
                ]}
              >
                {networkingVisible ? 'Visible' : 'Hidden'}
              </Text>
            </Pressable>
          </View>
          <Text style={styles.networkingDescription}>
            {networkingVisible
              ? 'Other professionals can see and connect with you'
              : 'Your profile is hidden from other professionals'}
          </Text>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    height: 250,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  headerGradient: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
  },
  designation: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  location: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 4,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
    marginTop: 250,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  section: {
    margin: 16,
    marginTop: 0,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  bio: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  skillBadge: {
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  skillText: {
    color: '#1a73e8',
    fontSize: 14,
    fontWeight: '500',
  },
  preferenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  preferenceText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 12,
  },
  networkingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  networkingToggle: {
    backgroundColor: '#f1f3f4',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  networkingToggleActive: {
    backgroundColor: '#e8f0fe',
  },
  networkingToggleText: {
    fontSize: 14,
    color: '#666',
  },
  networkingToggleTextActive: {
    color: '#1a73e8',
    fontWeight: '500',
  },
  networkingDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});
