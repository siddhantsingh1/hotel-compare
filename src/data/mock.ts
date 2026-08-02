import { cityPhotos, hotelPhotos, roomPhotos } from './images';

export type AltPrice = { platform: string; price: string; higherBy: string };

export type BestPrice = {
  platform: string;
  total: string;
  compareAt: string;
  discount: string;
  taxes: string;
  roomName: string;
  highlights: string[];
};

export type Hotel = {
  id: string;
  name: string;
  starCount: number;
  guestRating: string;
  ratingLabel: string;
  reviewCount: string;
  location: string;
  distance: string;
  badge: string;
  photos: string[];
  bestPrice: BestPrice;
  altPrices: AltPrice[];
  /** Drives empty state 3 — a property with no reviews on any source. */
  hasReviews: boolean;
  type: string;
  locality: string;
  detailDistance: string;
  about: string;
  address: string;
  amenityCount: number;
  photoCount: string;
};

export const HOTELS: Hotel[] = [
  {
    id: 'ocean-pearl',
    name: 'Ocean Pearl Resort',
    starCount: 4,
    guestRating: '4.3',
    ratingLabel: 'Very good',
    reviewCount: '1,240',
    location: 'Candolim Beach',
    distance: '2.1 km from center',
    badge: 'Save ₹1,400',
    photos: hotelPhotos['ocean-pearl'],
    bestPrice: {
      platform: 'MakeMyTrip',
      total: '₹4,899',
      compareAt: '₹6,299',
      discount: '22%',
      taxes: '+ ₹588 taxes & fees',
      roomName: 'Deluxe Room, Sea View',
      highlights: ['Free breakfast', 'Free cancellation', 'Pay later'],
    },
    altPrices: [
      { platform: 'Booking.com', price: '₹5,120', higherBy: '5%' },
      { platform: 'Goibibo', price: '₹5,340', higherBy: '9%' },
    ],
    hasReviews: true,
    type: 'Resort',
    locality: 'Candolim Beach, North Goa',
    detailDistance: '2.1 km from city center · 400 m from beach',
    about:
      'Beachfront resort with two outdoor pools, a spa and three dining options. Rooms feature private balconies with sea or garden views, and the property offers airport transfers on request.',
    address: 'Survey No. 142, Candolim Beach Road, Candolim, North Goa, 403515',
    amenityCount: 32,
    photoCount: '42 photos',
  },
  {
    id: 'palm-grove',
    name: 'Palm Grove Inn',
    starCount: 3,
    guestRating: '4.0',
    ratingLabel: 'Good',
    reviewCount: '620',
    location: 'Baga',
    distance: '3.4 km from center',
    badge: 'Save ₹800',
    photos: hotelPhotos['palm-grove'],
    bestPrice: {
      platform: 'Booking.com',
      total: '₹2,999',
      compareAt: '₹3,799',
      discount: '21%',
      taxes: '+ ₹360 taxes & fees',
      roomName: 'Standard Room, City View',
      highlights: ['Free Wi-Fi', 'Pay at hotel', 'No prepayment'],
    },
    altPrices: [
      { platform: 'MakeMyTrip', price: '₹3,150', higherBy: '5%' },
      { platform: 'Agoda', price: '₹3,299', higherBy: '10%' },
    ],
    hasReviews: false,
    type: 'Hotel',
    locality: 'Baga, North Goa',
    detailDistance: '3.4 km from city center · 700 m from beach',
    about:
      'Compact hotel a short walk from Baga Beach, with a rooftop terrace, in-house cafe and complimentary Wi-Fi throughout. Rooms are air-conditioned with city or garden outlook.',
    address: 'Baga Beach Road, Baga, North Goa, 403516',
    amenityCount: 18,
    photoCount: '24 photos',
  },
  {
    id: 'grand-vista',
    name: 'The Grand Vista',
    starCount: 5,
    guestRating: '4.6',
    ratingLabel: 'Excellent',
    reviewCount: '2,015',
    location: 'Miramar',
    distance: '1.2 km from center',
    badge: 'Save ₹2,450',
    photos: hotelPhotos['grand-vista'],
    bestPrice: {
      platform: 'Agoda',
      total: '₹7,450',
      compareAt: '₹9,900',
      discount: '25%',
      taxes: '+ ₹894 taxes & fees',
      roomName: 'Executive Suite, Ocean View',
      highlights: ['Free breakfast', 'Free airport pickup', 'Spa credit'],
    },
    altPrices: [
      { platform: 'MakeMyTrip', price: '₹7,820', higherBy: '5%' },
      { platform: 'Booking.com', price: '₹8,010', higherBy: '8%' },
    ],
    hasReviews: true,
    type: 'Hotel',
    locality: 'Miramar, Panjim',
    detailDistance: '1.2 km from city center · 250 m from beach',
    about:
      'Five-star property overlooking Miramar Beach with a rooftop infinity pool, full-service spa and four restaurants. Suites include lounge access and airport transfers.',
    address: 'Miramar Circle, Panjim, North Goa, 403001',
    amenityCount: 46,
    photoCount: '68 photos',
  },
];

export const RESULTS_SUMMARY = { resultsCount: 128, siteCount: 8 };

export const QUICK_FILTERS = ['Price', 'Star rating', 'Guest rating', 'Free cancellation', 'Best deals'];

export const FILTER_CATEGORIES = [
  {
    label: 'Quick filters',
    options: [
      { label: 'Free cancellation', count: '84' },
      { label: 'Breakfast included', count: '62' },
      { label: 'Pay at hotel', count: '48' },
      { label: 'Couple friendly', count: '31' },
      { label: 'Instant confirmation', count: '96' },
      { label: 'Book with ₹0 advance', count: '22' },
    ],
  },
  {
    label: 'Price range',
    options: [
      { label: 'Under ₹2,000', count: '18' },
      { label: '₹2,000 – ₹4,000', count: '46' },
      { label: '₹4,000 – ₹7,000', count: '38' },
      { label: '₹7,000 – ₹12,000', count: '19' },
      { label: 'Above ₹12,000', count: '7' },
    ],
  },
  {
    label: 'Hotel rating',
    options: [
      { label: '5 star', count: '14' },
      { label: '4 star', count: '39' },
      { label: '3 star', count: '52' },
      { label: '2 star & below', count: '23' },
    ],
  },
  {
    label: 'Guest rating',
    options: [
      { label: '4.5 & above', count: '21' },
      { label: '4.0 & above', count: '58' },
      { label: '3.5 & above', count: '87' },
      { label: '3.0 & above', count: '104' },
    ],
  },
  {
    label: 'Amenities',
    options: [
      { label: 'Swimming pool', count: '44' },
      { label: 'Free Wi-Fi', count: '112' },
      { label: 'Spa', count: '18' },
      { label: 'Gym', count: '35' },
      { label: 'Restaurant', count: '76' },
      { label: 'Parking', count: '81' },
    ],
  },
  {
    label: 'Property type',
    options: [
      { label: 'Hotel', count: '68' },
      { label: 'Resort', count: '24' },
      { label: 'Villa', count: '17' },
      { label: 'Homestay', count: '12' },
      { label: 'Hostel', count: '7' },
    ],
  },
  {
    label: 'Locality',
    options: [
      { label: 'Candolim', count: '31' },
      { label: 'Baga', count: '27' },
      { label: 'Anjuna', count: '19' },
      { label: 'Panjim', count: '22' },
      { label: 'Palolem', count: '14' },
    ],
  },
  {
    label: 'Payment',
    options: [
      { label: 'Pay at hotel', count: '48' },
      { label: 'Book with ₹0 advance', count: '22' },
      { label: 'EMI available', count: '30' },
    ],
  },
];

export const SORT_OPTIONS = [
  'Recommended',
  'Price: low to high',
  'Price: high to low',
  'Guest rating',
  'Popularity',
  'Distance',
];

/** Filter selections that no property satisfies — drives empty state 2. */
export const IMPOSSIBLE_FILTERS = ['5 star', 'Under ₹2,000'];

export const PLACES = [
  { name: 'Goa, India', meta: 'City · 1,200+ hotels', from: 'From ₹2,499', hasResults: true },
  { name: 'Gurugram, Haryana', meta: 'City · 540+ hotels', from: 'From ₹3,100', hasResults: true },
  { name: 'Gangtok, Sikkim', meta: 'City · 210+ hotels', from: 'From ₹1,750', hasResults: true },
  { name: 'Manali, Himachal Pradesh', meta: 'City · 480+ hotels', from: 'From ₹1,899', hasResults: true },
  { name: 'Mumbai, Maharashtra', meta: 'City · 1,600+ hotels', from: 'From ₹3,450', hasResults: true },
  { name: 'Taj Lands End, Mumbai', meta: 'Hotel · Bandra West', from: 'From ₹9,200', hasResults: true },
  { name: 'Taj Holiday Village, Goa', meta: 'Hotel · Candolim', from: 'From ₹8,420', hasResults: true },
  { name: 'Jaipur, Rajasthan', meta: 'City · 650+ hotels', from: 'From ₹2,199', hasResults: true },
  { name: 'Bangkok, Thailand', meta: 'City · 2,100+ hotels', from: 'From ₹3,499', hasResults: true },
  { name: 'Bali, Indonesia', meta: 'Region · 3,400+ hotels', from: 'From ₹4,050', hasResults: true },
  { name: 'Dubai, UAE', meta: 'City · 1,900+ hotels', from: 'From ₹6,200', hasResults: true },
  { name: 'Zuluk, Sikkim', meta: 'Village · no listed stays', from: '', hasResults: false },
];

export const RECENT_SEARCHES = [
  {
    place: 'Manali, Himachal Pradesh',
    dates: '12 Aug – 15 Aug',
    guests: '2 adults',
    price: '₹1,899',
    photo: cityPhotos['Manali, Himachal Pradesh'],
  },
  {
    place: 'Dubai, UAE',
    dates: '02 Sep – 06 Sep',
    guests: '2 adults · 1 child',
    price: '₹6,200',
    photo: cityPhotos['Dubai, UAE'],
  },
  {
    place: 'Ubud, Bali',
    dates: '20 Oct – 25 Oct',
    guests: '1 room · 2 adults',
    price: '₹4,050',
    photo: cityPhotos['Ubud, Bali'],
  },
];

export const POPULAR_DESTINATIONS = [
  { city: 'Goa', hotels: '1,200+ hotels', startingPrice: '₹2,499', photo: cityPhotos.Goa },
  { city: 'Manali', hotels: '480+ hotels', startingPrice: '₹1,899', photo: cityPhotos.Manali },
  { city: 'Jaipur', hotels: '650+ hotels', startingPrice: '₹2,199', photo: cityPhotos.Jaipur },
  { city: 'Bangkok', hotels: '2,100+ hotels', startingPrice: '₹3,499', photo: cityPhotos.Bangkok },
];

export const CHAIN_DEALS = [
  { chain: 'Taj Hotels', offer: 'Up to 25% off', savings: 'Save ₹4,200' },
  { chain: 'Marriott', offer: 'Extra 15% off', savings: 'Save ₹3,000' },
  { chain: 'OYO Rooms', offer: 'Flat 30% off', savings: 'Save ₹1,500' },
];

export const ENTRY_GIFT_CARDS = [
  { chain: 'Taj Hotels', discount: '10%' },
  { chain: 'Marriott Bonvoy', discount: '8%' },
  { chain: 'ITC Hotels', discount: '12%' },
];

export const TRIP_TYPES = ['Business', 'Leisure', 'Family', 'Solo'];

export const ABOUT_PARAGRAPHS = [
  'Beachfront resort with two outdoor pools, a spa and three dining options. Rooms feature private balconies with sea or garden views, and the property offers airport transfers on request.',
  'The resort sits 400 m from Candolim Beach, with a shaded walkway leading directly to a private beach deck. Sun loungers and towels are provided at no extra charge.',
  'Facilities include a 24-hour front desk, currency exchange, travel desk for local tours, laundry service, and a supervised kids club open through the day.',
  'Placeholder copy for the remaining property description. Final content to be supplied by the content team before high-fidelity design.',
];

export const AMENITY_GROUPS = [
  {
    title: 'Popular',
    items: ['Outdoor pool', 'Free Wi-Fi', 'Free parking', 'Airport shuttle', 'Beach access', 'Air conditioning'],
  },
  { title: 'Wellness', items: ['Spa', 'Gym', 'Yoga deck', 'Sauna'] },
  { title: 'Food & drink', items: ['Restaurant', 'Poolside bar', 'Room service', 'Breakfast buffet'] },
  { title: 'Services', items: ['24-hr front desk', 'Laundry', 'Travel desk', 'Currency exchange'] },
  { title: 'Rooms', items: ['Private balcony', 'Mini fridge', 'Safe', 'Tea/coffee maker'] },
];

export const TOP_AMENITIES = ['Pool', 'Free Wi-Fi', 'Spa', 'Restaurant', 'Gym', 'Parking'];

export const MEDIA_ITEMS = ['Property tour', 'Pool & deck', 'Room walkthrough', 'Spa'];

export const GALLERY_SECTIONS = [
  { title: 'Rooms', count: '18 photos', photos: 4 },
  { title: 'Pool & outdoors', count: '12 photos', photos: 4 },
  { title: 'Dining', count: '8 photos', photos: 2 },
  { title: 'Bathroom', count: '2 photos', photos: 2 },
  { title: 'Exterior', count: '2 photos', photos: 2 },
];

export const REVIEWS = [
  {
    name: 'Reviewer name',
    initial: 'R',
    date: '2 weeks ago',
    text: 'Placeholder review text spanning two lines to show the expected content length in this card layout.',
  },
  {
    name: 'Reviewer name',
    initial: 'R',
    date: '1 month ago',
    text: 'Placeholder review text spanning two lines to show the expected content length in this card layout.',
  },
];

export const REVIEW_SOURCES = ['Google', 'MakeMyTrip', 'Booking.com'];

export const LOCATION_FILTERS = ['Key landmarks', 'Food & shopping', 'Transportation', 'Beaches', 'Nightlife'];

export const LANDMARKS = [
  { name: 'Candolim Beach', distance: '400 m' },
  { name: 'Goa Intl. Airport', distance: '38 km' },
  { name: 'Fort Aguada', distance: '3.2 km' },
  { name: 'Calangute Market', distance: '4.5 km' },
];

export const DINING = [
  { name: 'Restaurant name', detail: 'Multi-cuisine · Breakfast, lunch, dinner' },
  { name: 'Poolside bar', detail: 'Snacks & beverages · 11 AM – 11 PM' },
  { name: 'In-room dining', detail: '24 hours' },
];

export const RULES = [
  'Check-in after 2:00 PM, check-out before 11:00 AM',
  'Valid government ID required at check-in',
  'Children of all ages are welcome',
  'Pets are not allowed',
];

export const RULE_GROUPS = [
  {
    title: 'Check-in & check-out',
    items: ['Check-in after 2:00 PM', 'Check-out before 11:00 AM', 'Early check-in subject to availability'],
  },
  {
    title: 'ID & documentation',
    items: [
      'Valid government photo ID required for all guests',
      'PAN card not accepted as ID proof',
      'Local IDs accepted',
    ],
  },
  {
    title: 'Guests & children',
    items: [
      'Children of all ages are welcome',
      'Extra bed available on request at additional cost',
      'Unmarried couples allowed',
    ],
  },
  { title: 'Pets & smoking', items: ['Pets are not allowed', 'Smoking permitted in designated areas only'] },
  {
    title: 'Payment & cancellation',
    items: [
      'Free cancellation up to 48 hours before check-in',
      'Security deposit may be collected at check-in',
      'Cards and UPI accepted',
    ],
  },
];

const INCLUSIONS_A = [
  'Breakfast for 2',
  'Free cancellation till 10 Aug',
  'King bed',
  'Free Wi-Fi',
  'Pay at hotel',
];
const INCLUSIONS_B = [
  'Room only',
  'Non-refundable',
  'Twin beds',
  'Free Wi-Fi',
  'Early check-in on request',
];

export type Package = {
  name: string;
  collapsedSummary: string;
  inclusions: string[];
  /** Filter labels this package satisfies — drives empty state 4. */
  tags: string[];
  best: { platform: string; total: string; compareAt: string; discount: string; taxes: string };
  others: AltPrice[];
  remaining: number;
};

export const PACKAGES: Package[] = [
  {
    name: 'Breakfast + Free cancellation',
    collapsedSummary: 'Best ₹4,899 on MakeMyTrip · 7 more sites',
    inclusions: INCLUSIONS_A,
    tags: ['Breakfast included', 'Free cancellation', 'Bed preference', 'Pay at hotel'],
    best: {
      platform: 'MakeMyTrip',
      total: '₹4,899',
      compareAt: '₹6,299',
      discount: '22%',
      taxes: '+ ₹588 taxes & fees',
    },
    others: [
      { platform: 'Goibibo', price: '₹5,010', higherBy: '2%' },
      { platform: 'Booking.com', price: '₹5,120', higherBy: '5%' },
      { platform: 'Agoda', price: '₹5,340', higherBy: '9%' },
    ],
    remaining: 4,
  },
  {
    name: 'Room only · Non-refundable',
    collapsedSummary: 'Best ₹4,150 on Agoda · 6 more sites',
    inclusions: INCLUSIONS_B,
    tags: ['Bed preference'],
    best: {
      platform: 'Agoda',
      total: '₹4,150',
      compareAt: '₹5,200',
      discount: '20%',
      taxes: '+ ₹498 taxes & fees',
    },
    others: [
      { platform: 'MakeMyTrip', price: '₹4,290', higherBy: '3%' },
      { platform: 'Booking.com', price: '₹4,420', higherBy: '7%' },
      { platform: 'Goibibo', price: '₹4,560', higherBy: '10%' },
    ],
    remaining: 3,
  },
];

export const PACKAGE_FILTERS = [
  'Breakfast included',
  'Free cancellation',
  'Bed preference',
  'Pay at hotel',
];

export const ROOM_TABS = [
  { name: 'Deluxe Room', from: '₹4,899' },
  { name: 'Premier Sea View', from: '₹6,250' },
  { name: 'Executive Suite', from: '₹9,400' },
];

export const ROOM_FACTS = ['28 sqm', 'Sleeps 2 adults + 1 child', '1 king bed'];

export const ROOM_AMENITIES = [
  'Sea view',
  'Balcony',
  'Air conditioning',
  'Mini fridge',
  'Safe',
  'Tea/coffee maker',
];

export const ROOM_AMENITY_GROUPS = [
  {
    title: 'Room features',
    items: ['Sea view', 'Balcony', 'Air conditioning', 'Blackout curtains', 'Safe', 'Iron & board'],
  },
  { title: 'Bathroom', items: ['Rain shower', 'Bathtub', 'Toiletries', 'Hairdryer'] },
  { title: 'Food & drink', items: ['Mini fridge', 'Tea/coffee maker', 'Room service', 'Bottled water'] },
  { title: 'Entertainment', items: ['Smart TV', 'Free Wi-Fi', 'Bluetooth speaker', 'Reading nook'] },
];

export const ROOM_PHOTO_LABELS = ['room photo 1', 'room photo 2', 'bathroom', 'balcony view'];
export const ROOM_PHOTO_URIS = roomPhotos;

export const ALL_SITE_PRICES = [
  { platform: 'MakeMyTrip', price: '₹4,899', note: 'Best price', taxes: '+ ₹588 taxes & fees' },
  { platform: 'Goibibo', price: '₹5,010', note: '2% higher', taxes: '+ ₹601 taxes & fees' },
  { platform: 'Booking.com', price: '₹5,120', note: '5% higher', taxes: '+ ₹614 taxes & fees' },
  { platform: 'Agoda', price: '₹5,340', note: '9% higher', taxes: '+ ₹641 taxes & fees' },
  { platform: 'Cleartrip', price: '₹5,410', note: '10% higher', taxes: '+ ₹649 taxes & fees' },
  { platform: 'EaseMyTrip', price: '₹5,520', note: '13% higher', taxes: '+ ₹662 taxes & fees' },
  { platform: 'Hotel website', price: '₹5,650', note: '15% higher', taxes: '+ ₹678 taxes & fees' },
];

export const PLATFORM_TABS = [
  { name: 'MakeMyTrip', from: '₹4,899' },
  { name: 'Goibibo', from: '₹5,010' },
  { name: 'Booking.com', from: '₹5,120' },
  { name: 'Agoda', from: '₹5,340' },
];

export const PLATFORM_ROOMS = [
  {
    name: 'Deluxe Room',
    summary: '2 packages · from ₹4,290',
    meta: '2 adults · 28 sqm · Garden view',
    photo: roomPhotos[0],
    packages: [
      {
        name: 'Breakfast + Free cancellation',
        inclusions: INCLUSIONS_A,
        total: '₹4,899',
        compareAt: '₹6,299',
        discount: '22%',
        taxes: '+ ₹588 taxes & fees',
      },
      {
        name: 'Room only · Non-refundable',
        inclusions: INCLUSIONS_B,
        total: '₹4,290',
        compareAt: '₹5,200',
        discount: '17%',
        taxes: '+ ₹515 taxes & fees',
      },
    ],
  },
  {
    name: 'Premier Sea View',
    summary: '1 package · from ₹6,250',
    meta: '2 adults · 34 sqm · Sea view',
    photo: roomPhotos[1],
    packages: [
      {
        name: 'Breakfast + Free cancellation',
        inclusions: INCLUSIONS_A,
        total: '₹6,250',
        compareAt: '₹7,900',
        discount: '21%',
        taxes: '+ ₹750 taxes & fees',
      },
    ],
  },
];

export const PACKAGE_SUMMARY = { packageCount: 6, siteCount: 8, platformRoomCount: 4 };

export const CONFIRMATION = {
  bookingId: 'BH-4827-19340',
  saved: '₹1,988',
  platform: 'MakeMyTrip',
  amountPaid: '₹5,642',
  compareAt: '₹7,630',
  discount: '26%',
  keyFeatures: ['Free cancellation till 10 Aug', 'Breakfast included', 'Pay at hotel'],
  guestName: 'Ananya Rao',
  guestInitials: 'AR',
  roomName: 'Deluxe Room, Sea View',
  packageName: 'Breakfast + Free cancellation',
};

export const RIDE_BANNERS = [
  { title: 'Goa Airport → Hotel', cta: 'Book Cabs', from: '₹1,180', providers: 4 },
  { title: 'Hotel → Goa Airport', cta: 'Book', from: '₹1,340', providers: 3 },
  { title: 'Candolim → Old Goa', cta: 'Explore', from: '₹499', providers: 3 },
];

export const TRIP_GIFT_CARDS = [
  { brand: 'Ride brand', offerType: 'Instant off', discount: '6%' },
  { brand: 'Food delivery brand', offerType: 'Cashback', discount: '10%' },
  { brand: 'Restaurant chain', offerType: 'Instant off', discount: '8%' },
  { brand: 'Retail brand', offerType: 'Cashback', discount: '5%' },
  { brand: 'Fuel brand', offerType: 'Instant off', discount: '3%' },
  { brand: 'Travel brand', offerType: 'Cashback', discount: '7%' },
];

export const CHECKOUT = {
  emptyTotal: '₹6,447',
  filledTotal: '₹5,642',
  email: 'ananya.rao24@gmail.com',
  phone: '9821440376',
  name: 'Ananya Rao',
  gender: 'Female',
};
