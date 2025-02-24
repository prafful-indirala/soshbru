export interface Cafe {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  priceLevel: string;
  imageUrl: string;
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
