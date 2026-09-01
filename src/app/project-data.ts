/* =====================================================
   Shared project data — used by both the home page list
   and the project detail page.
   ===================================================== */

export interface ProjectImage {
  url: string;
  alt: string;
}

export interface ProjectSpec {
  label: string;
  value: string;
}

export interface ProjectDetail {
  slug:        string;
  name:        string;
  tagline:     string;
  category:    string;
  location:    string;
  status:      string;
  type:        string;
  color:       string;          // card placeholder bg
  heroColor:   string;          // detail hero bg gradient
  completionYear?: string;
  reraNumber?: string;
  totalUnits?: string;
  area?:       string;
  possession?: string;
  description: string;
  highlights:  string[];
  specs:       ProjectSpec[];
  images:      ProjectImage[];
  amenities:   string[];
  address:     string;
  mapEmbed?:   string;          // optional Google Maps embed URL
}

/* Nandanvan — rich data */
export const PROJECTS: ProjectDetail[] = [
  {
    slug:        'nandanvan',
    name:        'Rajyashree Nandanvan',
    tagline:     'Where Nature Meets Architecture',
    category:    'Residential',
    location:    'Bhilarewadi, Pune',
    address:     'CVC5+RRM, Bhilarewadi, Pune, Maharashtra 411046',
    status:      'Ongoing',
    type:        'ongoing',
    color:       '#2c4a3e',
    heroColor:   'linear-gradient(135deg, #1a3328 0%, #2c4a3e 50%, #1e3d30 100%)',
    completionYear: '2026',
    reraNumber:  'PS2100024059',
    totalUnits:  '650+ Premium Units',
    area:        '1000 – 1600  sq.ft',
    possession:  'December 2030',
    description: 'Rajyashree Nandanvan is a landmark residential development in the heart of Baner, Pune — where lush greenery, modern architecture, and thoughtful design converge to create an unparalleled living experience. Spread across 5 acres, Nandanvan offers spacious 2 & 3 BHK residences designed for those who refuse to compromise on quality, space, or serenity.',
    highlights: [
      '5 acres of landscaped greens',
      'Rooftop infinity pool with city views',
      '2 & 3 BHK premium residences',
      'Vastu-compliant floor plans',
      'IGBC Green Building certified',
      '24/7 security with video surveillance',
    ],
    specs: [
      { label: 'Configuration',  value: '2 & 3 BHK' },
      { label: 'Super Built-up', value: '1000 – 1600 sq.ft' },
      { label: 'Total Floors',   value: 'G + 23 Floors' },
      { label: 'Total Units',    value: '650+ premium units' },
      { label: 'Possession',     value: 'December 2030' },
      { label: 'RERA No.',       value: 'PS2100024059' },
      { label: 'Price Range',    value: '₹55 lakh – ₹1.2 Cr' },
      { label: 'Location',       value: 'Bhilarewadi, Pune' },
    ],
    amenities: [
      'Infinity Swimming Pool',
      'Fully Equipped Gymnasium',
      'Rooftop Sky Lounge',
      'Children\'s Play Area',
      'Landscaped Garden',
      'Multipurpose Hall',
      'Indoor Games Room',
      'Meditation Pavilion',
      'EV Charging Stations',
      'Visitor Parking',
      'Senior Citizen Seating',
      'Jogging Track',
    ],
    images: [
      { url: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663102/IMG-20260626-WA0009_1_zw9rup.jpg', alt: 'Nandanvan exterior view' },
      { url: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1786735254/Gemini_Generated_Image_le4y2xle4y2xle4y_rhdpgu.png', alt: 'Nandanvan hero view' },
      { url: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663105/21_rfyed0.jpg',                    alt: 'Nandanvan living area' },
      { url: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663106/23_daqebj.jpg',                    alt: 'Nandanvan interior' },
      { url: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663106/20_upp2fm.jpg',                    alt: 'Nandanvan amenities' },
      { url: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663106/22_wmawwj.jpg',                    alt: 'Nandanvan landscape' },
      { url: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663106/19_aj7pln.jpg',                    alt: 'Nandanvan rooftop' },
    ],
    mapEmbed: 'https://maps.google.com/maps?q=CVC5%2BRRM+Bhilarewadi+Pune+Maharashtra+411046&output=embed',
  },
  {
    slug:        'greenview-heights',
    name:        'Rajyashree Greenview Heights',
    tagline:     'Elevated Living, Green Surroundings',
    category:    'Residential',
    location:    'Baner, Pune',
    address:     'Plot No. 18, Greenview Road, Baner, Pune – 411045',
    status:      'Upcoming',
    type:        'upcoming',
    color:       '#2c4a3e',
    heroColor:   'linear-gradient(135deg, #1a3328 0%, #2c4a3e 50%, #1e3d30 100%)',
    completionYear: '2025',
    reraNumber:  'PS2100024059',
    totalUnits:  '72 Units',
    area:        '1,200 – 2,100 sq.ft',
    possession:  'June 2025',
    description: 'Greenview Heights is a premium residential complex offering 2 & 3 BHK apartments surrounded by lush greenery. Thoughtfully designed for modern families seeking comfort and convenience in Pune\'s most sought-after neighbourhood.',
    highlights: [
      '1.8 acres of green landscape',
      'Swimming pool & clubhouse',
      '2 & 3 BHK premium apartments',
      'Solar-powered common areas',
      'Smart home automation ready',
      'Covered parking for all units',
    ],
    specs: [
      { label: 'Configuration',  value: '2 BHK & 3 BHK' },
      { label: 'Super Built-up', value: '1,200 – 2,100 sq.ft' },
      { label: 'Total Floors',   value: 'G + 10 Floors' },
      { label: 'Total Units',    value: '72 Units' },
      { label: 'Possession',     value: 'June 2025' },
      { label: 'RERA No.',       value: 'PS2100024059' },
      { label: 'Price Range',    value: '₹95 L – ₹1.85 Cr' },
      { label: 'Location',       value: 'Baner, Pune' },
    ],
    amenities: [
      'Swimming Pool',
      'Gymnasium',
      'Clubhouse',
      'Children\'s Play Area',
      'Landscaped Garden',
      'Covered Parking',
      'Solar Power',
      'CCTV Security',
    ],
    images: [
      { url: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1784663105/21_rfyed0.jpg', alt: 'Greenview Heights exterior' },
      { url: 'https://res.cloudinary.com/npdmfhdw/image/upload/v1786735254/Gemini_Generated_Image_le4y2xle4y2xle4y_rhdpgu.png', alt: 'Greenview Heights hero view' },
      { url: '', alt: 'Greenview Heights interiors' },
    ],
  },
  /* COMMENTED OUT - Will be enabled later
  {
    slug:        'skyline-towers',
    name:        'Rajyashree Skyline Towers',
    tagline:     'Business at the Pinnacle',
    category:    'Commercial',
    location:    'Hinjewadi, Pune',
    address:     'Phase 1, Hinjewadi IT Park Road, Pune – 411057',
    status:      'Ongoing',
    type:        'ongoing',
    color:       '#1c2b3a',
    heroColor:   'linear-gradient(135deg, #0d1a28 0%, #1c2b3a 50%, #162238 100%)',
    completionYear: '2026',
    reraNumber:  'P52100051899',
    totalUnits:  '240 Office Suites',
    area:        '500 – 5,000 sq.ft',
    possession:  'March 2026',
    description: 'Skyline Towers is a Grade-A commercial development in Hinjewadi, Pune\'s premier IT corridor. Designed for modern businesses, it offers flexible office spaces, world-class infrastructure, and seamless connectivity.',
    highlights: [
      'Grade-A commercial spaces',
      'LEED Gold certified building',
      'High-speed elevators',
      'Basement + multi-level parking',
      'Food court & retail on ground floor',
      '24/7 concierge services',
    ],
    specs: [
      { label: 'Configuration',  value: 'Office Suites & Floors' },
      { label: 'Super Built-up', value: '500 – 5,000 sq.ft' },
      { label: 'Total Floors',   value: 'G + 18 Floors' },
      { label: 'Total Units',    value: '240 Office Suites' },
      { label: 'Possession',     value: 'March 2026' },
      { label: 'RERA No.',       value: 'P52100051899' },
      { label: 'Price Range',    value: '₹65 L – ₹5.8 Cr' },
      { label: 'Location',       value: 'Hinjewadi, Pune' },
    ],
    amenities: [
      'Conference Rooms',
      'Co-working Spaces',
      'Food Court',
      'Gymnasium',
      'EV Charging',
      'Visitor Management',
      'CCTV & Access Control',
      'DG Power Backup',
    ],
    images: [
      { url: '', alt: 'Skyline Towers exterior' },
      { url: '', alt: 'Skyline Towers lobby' },
    ],
  },
  {
    slug:        'garden-villas',
    name:        'Rajyashree Garden Villas',
    tagline:     'Your Private Paradise',
    category:    'Residential',
    location:    'Wagholi, Pune',
    address:     'Wagholi–Kesnand Road, Wagholi, Pune – 412207',
    status:      'Completed',
    type:        'residential',
    color:       '#3a2c1c',
    heroColor:   'linear-gradient(135deg, #261c0e 0%, #3a2c1c 50%, #2e2214 100%)',
    completionYear: '2023',
    reraNumber:  'P52100032100',
    totalUnits:  '48 Villas',
    area:        '2,800 – 4,500 sq.ft',
    possession:  'Possession Completed 2023',
    description: 'Garden Villas offers a collection of independently crafted villas in the serene locale of Wagholi. Each villa is a private sanctuary with a personal garden, ample parking, and premium finishes throughout.',
    highlights: [
      'Independent bungalows with private garden',
      'Gated community with 24/7 security',
      'Premium Italian marble flooring',
      'Smart home automation',
      'Individual bore-well & water softener',
      'Club with pool, gym & party lawn',
    ],
    specs: [
      { label: 'Configuration',  value: '4 BHK Independent Villas' },
      { label: 'Super Built-up', value: '2,800 – 4,500 sq.ft' },
      { label: 'Total Units',    value: '48 Villas' },
      { label: 'Possession',     value: 'Completed 2023' },
      { label: 'RERA No.',       value: 'P52100032100' },
      { label: 'Price Range',    value: '₹2.8 Cr – ₹4.5 Cr' },
      { label: 'Location',       value: 'Wagholi, Pune' },
    ],
    amenities: [
      'Private Garden',
      'Swimming Pool',
      'Gymnasium',
      'Party Lawn',
      'Indoor Games',
      'Jogging Track',
      'CCTV Security',
      'Club House',
    ],
    images: [
      { url: '', alt: 'Garden Villas exterior' },
      { url: '', alt: 'Garden Villas interior' },
    ],
  },
  {
    slug:        'business-park',
    name:        'Rajyashree Business Park',
    tagline:     'Where Ambition Finds Its Address',
    category:    'Commercial',
    location:    'Kharadi, Pune',
    address:     'EON Free Zone, Kharadi, Pune – 411014',
    status:      'Completed',
    type:        'commercial',
    color:       '#2c2c3a',
    heroColor:   'linear-gradient(135deg, #1a1a26 0%, #2c2c3a 50%, #222230 100%)',
    completionYear: '2022',
    reraNumber:  'P52100028890',
    totalUnits:  '180 Office Units',
    area:        '400 – 8,000 sq.ft',
    possession:  'Possession Completed 2022',
    description: 'Business Park at Kharadi is a completed commercial landmark in Pune\'s eastern IT hub. With flexible office spaces and top-class amenities, it houses leading MNCs and startups alike.',
    highlights: [
      'Prime Kharadi IT location',
      '100% power backup',
      'Flexible office configurations',
      'LEED certified green building',
      'Dedicated visitor & tenant parking',
      'Cafeteria & retail zones',
    ],
    specs: [
      { label: 'Configuration',  value: 'Office Suites' },
      { label: 'Super Built-up', value: '400 – 8,000 sq.ft' },
      { label: 'Total Floors',   value: 'G + 14 Floors' },
      { label: 'Total Units',    value: '180 Office Units' },
      { label: 'Possession',     value: 'Completed 2022' },
      { label: 'RERA No.',       value: 'P52100028890' },
      { label: 'Location',       value: 'Kharadi, Pune' },
    ],
    amenities: [
      'Cafeteria',
      'Conference Rooms',
      'Gym',
      'Retail Zone',
      'Visitor Parking',
      'Power Backup',
      'Fire Safety',
      'Access Control',
    ],
    images: [
      { url: '', alt: 'Business Park exterior' },
    ],
  },
  {
    slug:        'heritage-residency',
    name:        'Rajyashree Heritage Residency',
    tagline:     'A Legacy of Luxury Living',
    category:    'Residential',
    location:    'Koregaon Park, Pune',
    address:     'Lane 5, Koregaon Park, Pune – 411001',
    status:      'Completed',
    type:        'residential',
    color:       '#3a3020',
    heroColor:   'linear-gradient(135deg, #26200e 0%, #3a3020 50%, #2e2818 100%)',
    completionYear: '2021',
    reraNumber:  'P52100019445',
    totalUnits:  '36 Premium Apartments',
    area:        '2,200 – 4,000 sq.ft',
    possession:  'Possession Completed 2021',
    description: 'Heritage Residency in Koregaon Park is our most exclusive residential offering — a boutique development of just 36 ultra-luxury apartments in Pune\'s most prestigious address.',
    highlights: [
      'Ultra-luxury boutique development',
      'Only 36 exclusive residences',
      'Imported Italian marble & woodwork',
      'Private terrace for top floors',
      'Concierge & valet service',
      'World-class clubhouse',
    ],
    specs: [
      { label: 'Configuration',  value: '3 & 4 BHK Ultra-Luxury' },
      { label: 'Super Built-up', value: '2,200 – 4,000 sq.ft' },
      { label: 'Total Units',    value: '36 Apartments' },
      { label: 'Possession',     value: 'Completed 2021' },
      { label: 'RERA No.',       value: 'P52100019445' },
      { label: 'Price Range',    value: '₹3.5 Cr – ₹7 Cr' },
      { label: 'Location',       value: 'Koregaon Park, Pune' },
    ],
    amenities: [
      'Rooftop Pool',
      'Concierge Service',
      'Private Theatre',
      'Wine Cellar',
      'Spa & Salon',
      'Gymnasium',
      'Valet Parking',
      'Clubhouse',
    ],
    images: [
      { url: '', alt: 'Heritage Residency exterior' },
    ],
  },
  {
    slug:        'metro-connect-hub',
    name:        'Rajyashree Metro Connect Hub',
    tagline:     'Infrastructure That Moves the City',
    category:    'Infrastructure',
    location:    'Pimpri, Pune',
    address:     'Metro Station Road, Pimpri-Chinchwad, Pune – 411018',
    status:      'Ongoing',
    type:        'ongoing',
    color:       '#1c3a3a',
    heroColor:   'linear-gradient(135deg, #0e2626 0%, #1c3a3a 50%, #162e2e 100%)',
    completionYear: '2027',
    reraNumber:  'N/A – Infrastructure Project',
    totalUnits:  'Civic Infrastructure',
    area:        '12,000 sq.ft (Commercial + Transit)',
    possession:  '2027',
    description: 'Metro Connect Hub is a mixed-use transit-oriented development at the new Pimpri metro station, integrating retail, commercial, and public transit infrastructure to serve thousands of daily commuters.',
    highlights: [
      'Transit-oriented development',
      'Direct metro station access',
      'Mixed-use retail & commercial',
      'Smart city compliant design',
      'Sustainable building materials',
      '12,000 sq.ft public plaza',
    ],
    specs: [
      { label: 'Type',           value: 'Mixed-Use Infrastructure' },
      { label: 'Total Area',     value: '12,000 sq.ft' },
      { label: 'Completion',     value: '2027' },
      { label: 'Location',       value: 'Pimpri, Pune' },
    ],
    amenities: [
      'Metro Access',
      'Retail Stores',
      'Food Court',
      'Public Plaza',
      'Parking',
      'EV Charging',
    ],
    images: [
      { url: '', alt: 'Metro Connect Hub render' },
    ],
  },
  */ // END OF COMMENTED PROJECTS
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return PROJECTS.find(p => p.slug === slug);
}
