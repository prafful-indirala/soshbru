export interface Cafe {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  priceLevel: string;
  imageUrl: string;
  wifiSpeed: number;
  noiseLevel: 'quiet' | 'moderate' | 'loud';
  powerOutlets: boolean;
  currentOccupancy: number;
  professionalCount: number;
  hasBookableSpace: boolean;
  description: string;
  isOpen: boolean;
  address?: string;
  phone?: string;
  website?: string;
  openingHours?: {
    [key: string]: string;
  };
  popularItems?: {
    name: string;
    price: string;
    description: string;
  }[];
}

const MOCK_CAFES: Cafe[] = [
  {
    id: '1',
    name: 'The Digital Den',
    rating: 4.8,
    reviews: 128,
    distance: '0.3 mi',
    priceLevel: '$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=modern%20coworking%20cafe%20with%20professionals%20working%20on%20laptops',
    description:
      'Premium workspace with high-speed internet and dedicated quiet zones for focused work.',
    isOpen: true,
    wifiSpeed: 300,
    noiseLevel: 'quiet',
    powerOutlets: true,
    currentOccupancy: 15,
    professionalCount: 12,
    hasBookableSpace: true,
    popularItems: [
      {
        name: 'Power Package',
        price: '$15/day',
        description:
          'Includes reserved desk, premium WiFi, and unlimited coffee',
      },
    ],
  },
  {
    id: '2',
    name: 'Creative Commons',
    rating: 4.6,
    reviews: 95,
    distance: '0.8 mi',
    priceLevel: '$$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=artistic%20cafe%20with%20colorful%20walls%20and%20creative%20workspace',
    description:
      'Vibrant community space perfect for creative professionals and collaborative projects.',
    isOpen: true,
    wifiSpeed: 200,
    noiseLevel: 'moderate',
    powerOutlets: true,
    currentOccupancy: 28,
    professionalCount: 20,
    hasBookableSpace: true,
    popularItems: [
      {
        name: 'Creative Corner',
        price: '$20/day',
        description:
          'Private booth with drawing tablet and creative software access',
      },
    ],
  },
  {
    id: '3',
    name: 'Zen Zone',
    rating: 4.9,
    reviews: 156,
    distance: '1.2 mi',
    priceLevel: '$$$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=minimalist%20japanese%20style%20workspace%20with%20zen%20garden',
    description:
      'Peaceful workspace with meditation rooms and focus-oriented design.',
    isOpen: false,
    wifiSpeed: 500,
    noiseLevel: 'quiet',
    powerOutlets: true,
    currentOccupancy: 5,
    professionalCount: 8,
    hasBookableSpace: true,
    popularItems: [
      {
        name: 'Zen Package',
        price: '$25/day',
        description:
          'Private pod with meditation cushion and wellness amenities',
      },
    ],
  },
  {
    id: '4',
    name: 'Tech Hub',
    rating: 4.7,
    reviews: 203,
    distance: '0.5 mi',
    priceLevel: '$$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=modern%20tech%20workspace%20with%20multiple%20monitors%20and%20gadgets',
    description:
      'High-tech workspace with advanced equipment and developer-friendly setup.',
    isOpen: true,
    wifiSpeed: 1000,
    noiseLevel: 'moderate',
    powerOutlets: true,
    currentOccupancy: 32,
    professionalCount: 25,
    hasBookableSpace: true,
    popularItems: [
      {
        name: 'Dev Station',
        price: '$30/day',
        description:
          'Dual monitor setup with development tools and private server',
      },
    ],
  },
  {
    id: '5',
    name: 'Green Oasis',
    rating: 4.5,
    reviews: 87,
    distance: '1.5 mi',
    priceLevel: '$$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=eco-friendly%20workspace%20with%20plants%20and%20natural%20light',
    description:
      'Eco-friendly workspace surrounded by plants and natural light.',
    isOpen: true,
    wifiSpeed: 150,
    noiseLevel: 'moderate',
    powerOutlets: true,
    currentOccupancy: 18,
    professionalCount: 10,
    hasBookableSpace: false,
    popularItems: [
      {
        name: 'Garden Desk',
        price: '$18/day',
        description:
          'Workspace surrounded by plants with organic coffee included',
      },
    ],
  },
  {
    id: '6',
    name: 'Night Owl Studio',
    rating: 4.4,
    reviews: 142,
    distance: '0.9 mi',
    priceLevel: '$$',
    imageUrl:
      'https://api.a0.dev/assets/image?text=late%20night%20workspace%20with%20cozy%20lighting%20and%20modern%20furniture',
    description:
      '24/7 workspace perfect for night owls and international remote workers.',
    isOpen: true,
    wifiSpeed: 400,
    noiseLevel: 'quiet',
    powerOutlets: true,
    currentOccupancy: 8,
    professionalCount: 15,
    hasBookableSpace: true,
    popularItems: [
      {
        name: 'Night Pass',
        price: '$22/night',
        description: 'Overnight access with sleeping pod and shower facilities',
      },
    ],
  },
];

export default function useCafes() {
  const formattedData = MOCK_CAFES;

  return {
    data: formattedData,
    error: false,
    isLoading: false,
  };
}
