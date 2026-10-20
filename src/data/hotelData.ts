import { Room, Amenity, GalleryImage, Testimonial } from '../types';

export const HOTEL_INFO = {
  name: "Hotel Vichar Vimarsh",
  shortName: "Vichar Vimarsh",
  tagline: "Thoughtful Hospitality. A More Memorable Stay.",
  sanskritEthos: "Vichar & Vimarsh — Discourse & Contemplation",
  location: "Rajasthan, India",
  address: "Hotel Vichar Vimarsh, Near Arterial Transit Highway, Rajasthan, India",
  googleMapsUrl: "https://maps.google.com/?q=Hotel+Vichar+Vimarsh+Rajasthan",
  phones: [
    { label: "Front Desk & WhatsApp Reception", number: "+91 9251112789", tel: "+919251112789" },
    { label: "Alternate Helpline", number: "+91 9251112789", tel: "+919251112789" },
  ],
  whatsapp: "919251112789",
  whatsappUrl: "https://wa.me/919251112789",
  email: "HOTELVICHARVIMARSH@GMAIL.COM",
  operatingHours: "Open 24 Hours • 7 Days a Week",
  checkInTime: "12:00 PM (Flexible check-in accommodated)",
  checkOutTime: "11:00 AM (Express check-out 24/7)",
  featuresList: [
    "24/7 Front Desk with Physical Staff on Duty",
    "Well-Ventilated Room Categories",
    "Inverter Backup",
    "Hydrotherapy Wellness Bath (Select Suite)",
    "Guarded Gated Premises & On-Site Parking",
    "Purified Multi-Stage RO Drinking Water Alcoves",
    "High-Speed Optical Wi-Fi Throughout Property",
    "Eco-Conscious Energy & Environmental Principles"
  ]
};

export const ROOMS: Room[] = [
  {
    id: "budget-single-room",
    name: "Budget Single Room",
    category: "Solo Traveler Essential",
    tagline: "Comfortable single-bed room for solo travellers, with an attached private bathroom.",
    description: "Comfortable single-bed room for solo travellers, with an attached private bathroom.",
    size: "3 FT × 7 FT",
    occupancy: "1 Adult",
    bedType: "Single Bed",
    image: "/images/Budget Single A.C. Room.png",
    images: ["/images/Budget Single A.C. Room.png"],
    badge: "Solo Practical",
    features: [
      "3 ft × 7 ft Single Bed",
      "Attached Private Bathroom",
      "Inverter Backup",
      "High-Speed Optical Wi-Fi"
    ],
    inclusions: [
      "24/7 Front Desk Assistance",
      "Guarded On-Site Parking",
      "Clean Sanitized Bedding & Linens",
      "Pure RO Drinking Water Station"
    ],
    startingRate: "Contact Reception for Direct Tariff"
  },
  {
    id: "small-economy-double",
    name: "Small Economy Double Room",
    category: "Economy Double",
    tagline: "Compact double room for two guests, with an attached private bathroom.",
    description: "Compact double room for two guests, with an attached private bathroom.",
    size: "4.25 FT × 7 FT",
    occupancy: "2 Adults",
    bedType: "Double Bed",
    image: "/images/Small Economy Double A.C. Room.png",
    images: [
      "/images/Small Economy Double A.C. Room.png",
      "/images/Small Economy Double A.C. Room 2.png"
    ],
    badge: "Popular Value",
    features: [
      "4.25 ft × 7 ft Double Bed",
      "Attached Private Bathroom",
      "Inverter Backup",
      "High-Speed Optical Wi-Fi"
    ],
    inclusions: [
      "24/7 Front Desk Reception",
      "Guarded Private Parking",
      "Sanitized Fresh Linens",
      "Pure RO Filtered Water"
    ],
    startingRate: "Contact Reception for Direct Tariff"
  },
  {
    id: "premium-king-size-room",
    name: "Premium King Size Bed Room",
    category: "Premium Comfort",
    tagline: "Spacious king-size room with ambient lighting and a dedicated private bathroom on the floor above.",
    description: "Spacious king-size room with ambient lighting and a dedicated private bathroom on the floor above.",
    size: "7 FT × 7 FT",
    occupancy: "2 Adults",
    bedType: "King Bed",
    image: "/images/Premium Big size Bedroom.png",
    images: ["/images/Premium Big size Bedroom.png"],
    badge: "Spacious Comfort",
    features: [
      "7 ft × 7 ft King-Size Bed",
      "Dedicated Private Bathroom (Floor Above)",
      "Inverter Backup",
      "High-Speed Optical Wi-Fi"
    ],
    inclusions: [
      "Dedicated Private Bathroom (Floor Above)",
      "24/7 Front Desk Dedicated Care",
      "Guarded On-Site Parking",
      "Freshly Laundered Premium Bedding"
    ],
    startingRate: "Contact Reception for Direct Tariff"
  },
  {
    id: "deluxe-double-room",
    name: "Deluxe Double Room",
    category: "Deluxe Double",
    tagline: "Double bedroom with scenic nature landscape art mural and attached private bathroom.",
    description: "A well-appointed double room featuring a scenic waterfall landscape feature wall, comfortable double bed, sliding frosted glass doors, and an attached private bathroom.",
    size: "DELUXE DOUBLE",
    occupancy: "2 Adults",
    bedType: "Double Bed",
    image: "/images/Deluxe Double A.C. Room.png",
    images: ["/images/Deluxe Double A.C. Room.png"],
    badge: "Scenic Art Mural",
    features: [
      "Attached Private Bathroom (Ensuite)",
      "Scenic Waterfall Art Mural Wall",
      "Comfortable Double Bed",
      "Inverter Backup",
      "High-Speed Optical Wi-Fi"
    ],
    inclusions: [
      "24/7 Front Desk Assistance",
      "Guarded On-Site Parking",
      "Clean Sanitized Bedding & Linens",
      "Pure RO Drinking Water Station"
    ],
    startingRate: "Contact Reception for Direct Tariff"
  },
  {
    id: "luxury-jacuzzi-room",
    name: "Luxury Room with Private Jacuzzi",
    category: "Signature Luxury",
    tagline: "Luxury bedroom suite with attached private hydrotherapy Jacuzzi bath.",
    description: "Our most exclusive accommodation featuring an elegant swirling marble accent wall, romantic ambiance, and an attached private hydrotherapy Jacuzzi wellness bath.",
    size: "SIGNATURE SUITE",
    occupancy: "2 Adults",
    bedType: "Plush Double Bed",
    image: "/images/Luxury A.C. Room with Private Jacuzzi.png",
    images: [
      "/images/Luxury A.C. Room with Private Jacuzzi.png",
      "/images/bathroom-jacuzzi.png"
    ],
    badge: "Private Jacuzzi",
    features: [
      "Attached Private Hydrotherapy Jacuzzi Bath",
      "Designer Marble Feature Wall & Cove Lighting",
      "Plush Bed with Decorative Amenities",
      "Inverter Backup",
      "High-Speed Optical Wi-Fi"
    ],
    inclusions: [
      "Hydrotherapy Jacuzzi Wellness Bath",
      "24/7 Front Desk Dedicated Care",
      "Guarded On-Site Parking",
      "Freshly Laundered Luxury Linens"
    ],
    startingRate: "Contact Reception for Direct Tariff"
  }
];

export const AMENITIES: Amenity[] = [
  {
    id: "front-desk",
    title: "24/7 Front Desk & Reception",
    subtitle: "Physical staff on duty around the clock",
    description: "Arriving late after a long road trip? Our reception desk is physically staffed 24 hours a day to handle late arrivals, luggage assistance, and express check-in with genuine Rajasthani warmth.",
    iconName: "Clock",
    image: "/images/lobby-warm.png",
    highlightTag: "Always Open 24x7"
  },
  {
    id: "security-cctv",
    title: "Round-The-Clock CCTV Security",
    subtitle: "Surveillance & secure gated perimeter",
    description: "Continuous CCTV camera monitoring of entryways, hallways, and parking zones, monitored 24/7 for guest safety and quiet peace of mind.",
    iconName: "ShieldCheck",
    image: "/images/reception-cctv.png",
    highlightTag: "Continuous Safety"
  },
  {
    id: "jacuzzi-bath",
    title: "Hydrotherapy Wellness Bath",
    subtitle: "Private hydro-comfort relaxation",
    description: "Soothe travel weariness in our therapeutic Jacuzzi bath setup featuring relaxing water jets and calming underwater illumination.",
    iconName: "Waves",
    image: "/images/bathroom-jacuzzi.png",
    highlightTag: "Select Room Feature"
  },
  {
    id: "power-backup",
    title: "Inverter Backup",
    subtitle: "Power backup for essential lighting",
    description: "Equipped with inverter backup to support essential lighting and fans during power outages.",
    iconName: "Zap",
    highlightTag: "Inverter Backup"
  },
  {
    id: "water-hygiene",
    title: "Multi-Stage RO Water Station",
    subtitle: "Hygienic pure drinking water alcoves",
    description: "Dedicated pure drinking water alcoves equipped with modern RO water filtration, alongside rigorous room hygiene and sanitized linens.",
    iconName: "Droplet",
    image: "/images/facility-water-purifier.png",
    highlightTag: "Pure & Sanitized"
  },
  {
    id: "gated-parking",
    title: "Guarded On-Site Parking",
    subtitle: "Private parking on hotel grounds",
    description: "Direct highway connectivity with private, gated on-site parking for personal cars, touring vehicles, and SUVs with night guard monitoring.",
    iconName: "Car",
    image: "/images/facade-golden-hour.png",
    highlightTag: "Complimentary"
  },
  {
    id: "eco-initiatives",
    title: "Eco-Conscious Comfort",
    subtitle: "Energy-efficient & responsible practices",
    description: "Thoughtful stewardship including LED lighting design, water conservation measures, and clean maintenance principles.",
    iconName: "Leaf",
    image: "/images/lobby-warm.png",
    highlightTag: "Mindful Hospitality"
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "room-1",
    title: "Budget Single Room",
    category: "rooms",
    src: "/images/Budget Single A.C. Room.png",
    aspectRatio: "wide",
    caption: "Budget Single Room featuring 3 ft × 7 ft bed and attached private bathroom."
  },
  {
    id: "room-2",
    title: "Small Economy Double Room",
    category: "rooms",
    src: "/images/Small Economy Double A.C. Room.png",
    aspectRatio: "wide",
    caption: "Small Economy Double Room showing ensuite bathroom, shower, and sink."
  },
  {
    id: "room-3",
    title: "Premium King Size Bed Room",
    category: "rooms",
    src: "/images/Premium Big size Bedroom.png",
    aspectRatio: "wide",
    caption: "Premium King Size Bed Room with king bed, mirrored ceiling accents, and warm cove lighting."
  },
  {
    id: "ext-golden",
    title: "Architectural Facade at Golden Hour",
    category: "exterior",
    src: "/images/facade-golden-hour.png",
    aspectRatio: "wide",
    caption: "Frontal view of Hotel Vichar Vimarsh illuminated under golden sunset skies."
  },
  {
    id: "ext-entrance-sign",
    title: "Illuminated Grand Entrance at Twilight",
    category: "exterior",
    src: "/images/entrance-sign.jpg",
    aspectRatio: "tall",
    caption: "The illuminated Hotel Vichar Vimarsh entrance warmly welcoming arrivals."
  },
  {
    id: "ext-facade-sunset",
    title: "Facade at Sunset",
    category: "exterior",
    src: "/images/facade-sunset.png",
    aspectRatio: "wide",
    caption: "Warm evening sunlight reflecting across the hotel's exterior."
  },
  {
    id: "room-4",
    title: "Small Economy Double Room - Bedroom View",
    category: "rooms",
    src: "/images/Small Economy Double A.C. Room 2.png",
    aspectRatio: "wide",
    caption: "Small Economy Double Room featuring double bed, fluted marble panelling, and door."
  },
  {
    id: "room-5",
    title: "Deluxe Double Room",
    category: "rooms",
    src: "/images/Deluxe Double A.C. Room.png",
    aspectRatio: "wide",
    caption: "Deluxe Double Room featuring nature waterfall landscape art mural."
  },
  {
    id: "room-6",
    title: "Luxury Room with Private Jacuzzi",
    category: "rooms",
    src: "/images/Luxury A.C. Room with Private Jacuzzi.png",
    aspectRatio: "wide",
    caption: "Luxury Room suite featuring marble feature wall and towel swan decor."
  },
  {
    id: "reception-1",
    title: "Reception Lobby & Welcome Desk",
    category: "reception",
    src: "/images/lobby-warm.png",
    aspectRatio: "wide",
    caption: "Warm amber illumination and gracious 24/7 reception service."
  },
  {
    id: "ext-dusk",
    title: "Entrance Porch at Dusk",
    category: "exterior",
    src: "/images/entrance-sunset.png",
    aspectRatio: "wide",
    caption: "Evening ambiance at the welcoming entryway."
  },
  {
    id: "amenity-1",
    title: "Attached Hydrotherapy Jacuzzi Bath",
    category: "amenities",
    src: "/images/bathroom-jacuzzi.png",
    aspectRatio: "wide",
    caption: "Hydrotherapy Jacuzzi bath featuring therapeutic water jets."
  },
  {
    id: "reception-2",
    title: "24/7 CCTV & Security Monitoring",
    category: "reception",
    src: "/images/reception-cctv.png",
    aspectRatio: "wide",
    caption: "State-of-the-art surveillance ensuring quiet peace of mind."
  },
  {
    id: "amenity-2",
    title: "Pure RO Drinking Water Station",
    category: "amenities",
    src: "/images/facility-water-purifier.png",
    aspectRatio: "tall",
    caption: "Hygienic multi-stage RO water filter and sink alcove."
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    quote: "Hotel Vichar Vimarsh was our unexpected sanctuary. Arriving after midnight, the front desk greeted us with warm water and made checking in effortless. The marble suite with the warm lighting felt like a luxury boutique hotel in Delhi or Jaipur.",
    author: "Dr. Ananya & Vikram Mehta",
    origin: "Ahmedabad, Gujarat",
    verifiedStay: true,
    rating: 5,
    highlight: "An Unexpected Midnight Sanctuary",
    stayType: "Couple's Road Trip"
  },
  {
    id: "t2",
    quote: "The quiet elegance of the rooms, the inverter backup, and the safe parking gave our family total peace of mind during our Rajasthan road trip. Exceptional hospitality.",
    author: "Rajeshwar Singh",
    origin: "Jaipur Transit Highway",
    verifiedStay: true,
    rating: 5,
    highlight: "Peace of Mind on a Family Trip",
    stayType: "Family Holiday Stay"
  },
  {
    id: "t3",
    quote: "A remarkably smooth transit halt right off the arterial route. The room was impeccably neat, Wi-Fi connectivity was solid for work, and the 24-hour reception assisted promptly with an early 5 AM departure.",
    author: "Amit K. Verma",
    origin: "Delhi NCR",
    verifiedStay: true,
    rating: 5,
    highlight: "Seamless Transit & 24/7 Desk Care",
    stayType: "Business Transit Stay"
  },
  {
    id: "t4",
    quote: "Spotlessly clean room, pure RO drinking water station, and courteous night staff on duty around the clock. Guarded on-site parking made our road journey completely stress-free.",
    author: "Sunita & Mahendra Rathore",
    origin: "Udaipur, Rajasthan",
    verifiedStay: true,
    rating: 5,
    highlight: "Spotless Cleanliness & Guarded Parking",
    stayType: "Overnight Highway Halt"
  }
];
