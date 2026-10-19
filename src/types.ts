export interface Room {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  size: string;
  occupancy: string;
  bedType: string;
  image: string;
  badge?: string;
  features: string[];
  inclusions: string[];
  startingRate: string;
}

export interface Amenity {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  image?: string;
  highlightTag?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  category: 'all' | 'rooms' | 'exterior' | 'amenities' | 'reception';
  src: string;
  aspectRatio: 'wide' | 'tall' | 'square';
  caption: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  origin: string;
  verifiedStay: boolean;
  rating?: number;
  highlight?: string;
  stayType?: string;
}

export interface BookingInquiry {
  name: string;
  phone: string;
  email: string;
  checkIn: string;
  checkOut: string;
  roomType: string;
  guests: string;
  specialRequests: string;
}
