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
    { label: "Front Desk & WhatsApp Reception", number: "+91 9636082789", tel: "+919636082789" },
    { label: "Alternate Helpline", number: "+91 9251112789", tel: "+919251112789" },
  ],
  whatsapp: "919636082789",
  whatsappUrl: "https://wa.me/919636082789",
  email: "HOTELVICHARVIMARSH@GMAIL.COM",
  operatingHours: "Open 24 Hours • 7 Days a Week",
  checkInTime: "12:00 PM (Flexible check-in accommodated)",
  checkOutTime: "11:00 AM (Express check-out 24/7)",
  featuresList: [
    "24/7 Front Desk with Physical Staff on Duty",
    "Air Conditioned & Well-Ventilated Room Categories",
    "Continuous Generator Power & AC Backup",
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
    name: "Budget Single Bed Room",
    category: "Solo Traveler Essential",
    tagline: "3 ft × 7 ft single bed with attached private bathroom for solo travelers.",
    description: "A practical accommodation option for solo travellers, featuring a single bed and an attached private bathroom.",
    size: "3 FT × 7 FT BED",
    occupancy: "1 Adult",
    bedType: "3 ft × 7 ft Single Bed",
    image: "/images/room-budget-single.png",
    badge: "Solo Practical",
    features: [
      "Attached Private Bathroom (Ensuite)",
      "3 ft × 7 ft Single Bed",
      "Air Conditioned / Climate Control",
      "100% Uninterrupted Power Backup",
      "24/7 Hot & Cold Water Supply",
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
    tagline: "4.25 ft × 7 ft double bed with nature accent mural and attached private bathroom.",
    description: "A compact accommodation option for couples or two guests, featuring a 4.25 ft × 7 ft double bed and an attached private bathroom.",
    size: "4.25 FT × 7 FT BED",
    occupancy: "2 Adults",
    bedType: "4.25 ft × 7 ft Double Bed",
    image: "/images/room-economy-double.png",
    badge: "Popular Value",
    features: [
      "Attached Private Bathroom",
      "4.25 ft × 7 ft Double Bed",
      "Nature Accent Artwork Mural",
      "Quiet Air Conditioning",
      "100% Generator Power Backup",
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
    id: "premium-double-jacuzzi",
    name: "Premium Double Room with Jacuzzi",
    category: "Signature Luxury",
    tagline: "Spacious double bedroom with attached private hydrotherapy Jacuzzi bath.",
    description: "Our most luxurious accommodation option, featuring a spacious double bed, elegant ambient lighting, and an attached private hydrotherapy Jacuzzi bathroom for ultimate relaxation.",
    size: "DELUXE COMFORT",
    occupancy: "2 Adults",
    bedType: "Spacious Double Bed",
    image: "/images/room-premium-double.png",
    badge: "Jacuzzi Feature",
    features: [
      "Attached Private Jacuzzi Bathroom",
      "Spacious Double Bed with Plush Headboard",
      "Ambient Cove Lighting & Fluted Panelling",
      "Whisper-Quiet Air Conditioning",
      "100% Continuous Generator Backup",
      "High-Speed Optical Wi-Fi"
    ],
    inclusions: [
      "Hydrotherapy Jacuzzi Bath",
      "24/7 Front Desk Dedicated Care",
      "Guarded On-Site Parking",
      "Freshly Laundered Premium Bedding"
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
    title: "100% Uninterrupted Power Backup",
    subtitle: "Generator continuity for AC & light",
    description: "Equipped with dedicated generator power backup ensuring air conditioning, lighting, hot water, and Wi-Fi remain uninterrupted throughout your stay.",
    iconName: "Zap",
    highlightTag: "Uninterrupted AC"
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
    title: "Budget Single Bed Room",
    category: "rooms",
    src: "/images/room-budget-single.png",
    aspectRatio: "wide",
    caption: "Budget Single Bed Room featuring 3 ft × 7 ft bed and attached private bathroom."
  },
  {
    id: "room-2",
    title: "Small Economy Double Room",
    category: "rooms",
    src: "/images/room-economy-double.png",
    aspectRatio: "wide",
    caption: "Small Economy Double Room with 4.25 ft × 7 ft double bed and nature accent wall."
  },
  {
    id: "room-3",
    title: "Premium Double Room with Jacuzzi",
    category: "rooms",
    src: "/images/room-premium-double.png",
    aspectRatio: "wide",
    caption: "Premium Double Room with spacious bed, gold fluted panelling, and seating."
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
    title: "Small Economy Double Room - View 2",
    category: "rooms",
    src: "/images/room-economy-angle2.png",
    aspectRatio: "wide",
    caption: "Small Economy Double Room showcasing marble wall styling and plush bed."
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
    quote: "The quiet elegance of the rooms, the continuous power backup, and the safe parking gave our family total peace of mind during our Rajasthan road trip. Exceptional hospitality.",
    author: "Rajeshwar Singh",
    origin: "Jaipur Transit Highway",
    verifiedStay: true,
    rating: 5,
    highlight: "Peace of Mind on a Family Trip",
    stayType: "Family Holiday Stay"
  },
  {
    id: "t3",
    quote: "A remarkably smooth transit halt right off the arterial route. The air-conditioned room was impeccably neat, Wi-Fi connectivity was solid for work, and the 24-hour reception assisted promptly with an early 5 AM departure.",
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
