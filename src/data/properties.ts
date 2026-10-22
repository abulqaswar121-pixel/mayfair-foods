export interface Property {
  id: string;
  sample?: boolean;
  status: string;
  type: string;
  title: string;
  subtitle?: string;
  price: string;
  pricePeriod?: string;
  location: string;
  address?: string;
  bedrooms: number;
  bathrooms: number;
  toilets: number;
  parking: number;
  areaSqm?: string;
  description: string;
  features?: string[];
  images: string[];
  imageAlt?: string[];
  seo?: { title: string; description: string; ogImage?: string };
}

// Prestige Villa — Sample property data (demo only)
export const PRESTIGE_VILLA_PROPERTIES = [
  {
    id:"sample-001", sample:true, status:"For Sale", type:"Duplex",
    title:"4-Bedroom Luxury Duplex — Agodi GRA",
    subtitle:"Sample listing — replace with real details",
    price:"180000000", pricePeriod:"total",
    location:"Agodi GRA, Ibadan",
    address:"Plot 14, Adeoyo Street, Agodi GRA, Ibadan, Oyo State",
    bedrooms:4, bathrooms:4, toilets:5, parking:3, areaSqm:"450 sqm",
    description:"This is a sample listing. A stunning 4-bedroom duplex in prestigious Agodi GRA. Features a private swimming pool, ensuite bedrooms, modern kitchen, 24/7 security and borehole water system.",
    features:["Swimming pool","4 ensuite bedrooms","Modern kitchen","24/7 security","Borehole water system","Private driveway (3 cars)","CCTV surveillance"],
    images:["/images/sample-duplex-1.jpg","/images/sample-exterior-1.jpg","/images/sample-interior-1.jpg","/images/sample-duplex-2.jpg"],
    imageAlt:["Luxury duplex exterior","Duplex pool area","Spacious living room","Master bedroom"],
    seo:{title:"4-Bedroom Luxury Duplex — Agodi GRA | Prestige Villa",description:"Sample 4-bedroom luxury duplex for sale in Agodi GRA, Ibadan. Swimming pool, ensuite bedrooms, 24/7 security.",ogImage:"/images/sample-duplex-1.jpg"}
  },
  {
    id:"sample-002", sample:true, status:"For Rent", type:"Apartment",
    title:"3-Bedroom Serviced Apartment — Jericho",
    subtitle:"Sample listing — replace with real details",
    price:"2500000", pricePeriod:"per year",
    location:"Jericho, Ibadan",
    address:"Block 8, Unity Road, Jericho, Ibadan, Oyo State",
    bedrooms:3, bathrooms:2, toilets:3, parking:2, areaSqm:"160 sqm",
    description:"This is a sample listing. Elegant 3-bedroom serviced apartment in Jericho with concierge service, fully fitted kitchen, balcony, covered parking and 24-hour power.",
    features:["Concierge service","Fully fitted kitchen","Balcony","Covered parking","24-hour power","Gym access","Intercom system"],
    images:["/images/sample-apartment-1.jpg","/images/sample-interior-2.jpg","/images/sample-apartment-2.jpg"],
    imageAlt:["Modern apartment exterior","Apartment living room","Apartment bedroom"],
    seo:{title:"3-Bedroom Serviced Apartment — Jericho | Prestige Villa",description:"Sample 3-bedroom serviced apartment for rent in Jericho, Ibadan. Concierge, gym, covered parking.",ogImage:"/images/sample-apartment-1.jpg"}
  },
  {
    id:"sample-003", sample:true, status:"For Sale", type:"Land",
    title:"600 sqm Residential Plot — Bodija",
    subtitle:"Sample listing — replace with real details",
    price:"85000000", pricePeriod:"total",
    location:"Bodija, Ibadan",
    address:"Bodija Housing Estate, Ibadan, Oyo State",
    bedrooms:0, bathrooms:0, toilets:0, parking:0, areaSqm:"600 sqm",
    description:"This is a sample listing. Prime 600 sqm residential plot in Bodija Housing Estate. Dry land, good access road, perimeter fenced, survey plan available.",
    features:["Dry land","Good access road","Perimeter fenced","Survey plan available","Title documents","Developed estate"],
    images:["/images/sample-exterior-2.jpg","/images/sample-duplex-3.jpg"],
    imageAlt:["Residential land plot","Estate road view"],
    seo:{title:"600 sqm Residential Plot — Bodija | Prestige Villa",description:"Sample plot of land for sale in Bodija, Ibadan. Dry land, fenced, survey plan available.",ogImage:"/images/sample-exterior-2.jpg"}
  },
  {
    id:"sample-004", sample:true, status:"For Sale", type:"House",
    title:"5-Bedroom Executive Mansion — Old Bodija",
    subtitle:"Sample listing — replace with real details",
    price:"320000000", pricePeriod:"total",
    location:"Old Bodija, Ibadan",
    address:"Plot 22, Bashorun Road, Old Bodija, Ibadan, Oyo State",
    bedrooms:5, bathrooms:5, toilets:6, parking:4, areaSqm:"620 sqm",
    description:"This is a sample listing. Magnificent 5-bedroom executive mansion on a large corner plot. Grand foyer, home office, cinema room, infinity pool, guest quarters and round-the-clock security.",
    features:["Grand foyer","Home office","Cinema room","Infinity pool","Guest quarters","24/7 security patrol","Solar power backup"],
    images:["/images/sample-exterior-1.jpg","/images/sample-duplex-1.jpg","/images/sample-interior-1.jpg"],
    imageAlt:["Executive mansion exterior","Mansion living room","Home cinema room"],
    seo:{title:"5-Bedroom Executive Mansion — Old Bodija | Prestige Villa",description:"Sample 5-bedroom executive mansion for sale in Old Bodija, Ibadan. Infinity pool, cinema room, guest quarters.",ogImage:"/images/sample-exterior-1.jpg"}
  },
  {
    id:"sample-005", sample:true, status:"For Rent", type:"Apartment",
    title:"2-Bedroom Modern Apartment — Dugbe",
    subtitle:"Sample listing — replace with real details",
    price:"1200000", pricePeriod:"per year",
    location:"Dugbe, Ibadan",
    address:"15 Agbeni Road, Dugbe, Ibadan, Oyo State",
    bedrooms:2, bathrooms:2, toilets:3, parking:1, areaSqm:"110 sqm",
    description:"This is a sample listing. Bright 2-bedroom modern apartment in central Dugbe. Open-plan living, fitted kitchen, in-unit laundry, secure parking, close to banks and markets.",
    features:["Open-plan living","Fitted kitchen","In-unit laundry","Secure parking","Close to city centre","Intercom"],
    images:["/images/sample-apartment-2.jpg","/images/sample-interior-2.jpg"],
    imageAlt:["Apartment exterior","Modern kitchen interior"],
    seo:{title:"2-Bedroom Modern Apartment — Dugbe | Prestige Villa",description:"Sample 2-bedroom apartment for rent in Dugbe, Ibadan. Open-plan, fitted kitchen, city centre location.",ogImage:"/images/sample-apartment-2.jpg"}
  },
  {
    id:"sample-006", sample:true, status:"For Sale", type:"Commercial",
    title:"Commercial Shop — Challenge Market",
    subtitle:"Sample listing — replace with real details",
    price:"45000000", pricePeriod:"total",
    location:"Challenge, Ibadan",
    address:"Shop 17, Challenge Market Complex, Ibadan, Oyo State",
    bedrooms:0, bathrooms:1, toilets:1, parking:2, areaSqm:"45 sqm",
    description:"This is a sample listing. Well-positioned commercial shop in Challenge Market Complex. High foot traffic, suitable for retail, boutique or office use.",
    features:["High foot traffic","Retail/office use","Title documents","Secure complex","Loading bay access"],
    images:["/images/sample-exterior-2.jpg"],
    imageAlt:["Commercial shop front"],
    seo:{title:"Commercial Shop — Challenge Market | Prestige Villa",description:"Sample commercial shop for sale in Challenge, Ibadan. Retail space, high foot traffic.",ogImage:"/images/sample-exterior-2.jpg"}
  },
  {
    id:"sample-007", sample:true, status:"For Sale", type:"Duplex",
    title:"4-Bedroom Duplex with Pool — Eleyele",
    subtitle:"Sample listing — replace with real details",
    price:"145000000", pricePeriod:"total",
    location:"Eleyele, Ibadan",
    address:"Eleyele Residential Layout, Ibadan, Oyo State",
    bedrooms:4, bathrooms:3, toilets:4, parking:2, areaSqm:"380 sqm",
    description:"This is a sample listing. Beautiful 4-bedroom duplex in serene Eleyele. Private swimming pool, spacious terrace, ensuite master bedroom and ample parking.",
    features:["Private swimming pool","Spacious terrace","Ensuite master bedroom","Quiet neighbourhood","Good road access"],
    images:["/images/sample-duplex-2.jpg","/images/sample-exterior-1.jpg"],
    imageAlt:["Duplex with pool","Terrace view"],
    seo:{title:"4-Bedroom Duplex with Pool — Eleyele | Prestige Villa",description:"Sample 4-bedroom duplex for sale in Eleyele, Ibadan. Private pool, terrace, ensuite master bedroom.",ogImage:"/images/sample-duplex-2.jpg"}
  },
  {
    id:"sample-008", sample:true, status:"For Rent", type:"House",
    title:"3-Bedroom Family Home — Sango",
    subtitle:"Sample listing — replace with real details",
    price:"1800000", pricePeriod:"per year",
    location:"Sango, Ibadan",
    address:"Sango Estate, Ibadan, Oyo State",
    bedrooms:3, bathrooms:2, toilets:3, parking:2, areaSqm:"200 sqm",
    description:"This is a sample listing. Spacious 3-bedroom family home in Sango Estate. Large compound, children's play area, secure gate, close to schools and shops.",
    features:["Large compound","Children's play area","Secure gate","Close to schools","Close to shops"],
    images:["/images/sample-duplex-3.jpg","/images/sample-interior-1.jpg"],
    imageAlt:["Family home exterior","Living room"],
    seo:{title:"3-Bedroom Family Home — Sango | Prestige Villa",description:"Sample 3-bedroom family home for rent in Sango, Ibadan. Large compound, secure gate.",ogImage:"/images/sample-duplex-3.jpg"}
  },
  {
    id:"sample-009", sample:true, status:"For Sale", type:"Land",
    title:"1,000 sqm Commercial Land — Iwo Road",
    subtitle:"Sample listing — replace with real details",
    price:"150000000", pricePeriod:"total",
    location:"Iwo Road, Ibadan",
    address:"Iwo Road Expressway, Ibadan, Oyo State",
    bedrooms:0, bathrooms:0, toilets:0, parking:0, areaSqm:"1,000 sqm",
    description:"This is a sample listing. Large 1,000 sqm commercial land along Iwo Road Expressway. Excellent visibility, ideal for petrol station, supermarket or warehouse. C of O available.",
    features:["Expressway frontage","High traffic count","C of O available","Commercial zone","Large plot"],
    images:["/images/sample-duplex-3.jpg"],
    imageAlt:["Commercial land expressway view"],
    seo:{title:"1,000 sqm Commercial Land — Iwo Road | Prestige Villa",description:"Sample commercial land for sale on Iwo Road Expressway, Ibadan. C of O available.",ogImage:"/images/sample-duplex-3.jpg"}
  },
  {
    id:"sample-010", sample:true, status:"For Sale", type:"Apartment",
    title:"2-Bedroom Penthouse — Agodi",
    subtitle:"Sample listing — replace with real details",
    price:"95000000", pricePeriod:"total",
    location:"Agodi, Ibadan",
    address:"Penthouse Suite, Agodi Residences, Ibadan, Oyo State",
    bedrooms:2, bathrooms:2, toilets:3, parking:2, areaSqm:"140 sqm",
    description:"This is a sample listing. Exclusive 2-bedroom penthouse in Agodi Residences. Rooftop terrace with city views, premium finishes, smart home features, dedicated lift access.",
    features:["Rooftop terrace","City views","Premium finishes","Smart home features","Dedicated lift access"],
    images:["/images/sample-apartment-1.jpg","/images/sample-interior-2.jpg"],
    imageAlt:["Penthouse terrace","Penthouse interior"],
    seo:{title:"2-Bedroom Penthouse — Agodi | Prestige Villa",description:"Sample 2-bedroom penthouse for sale in Agodi, Ibadan. Rooftop terrace, smart home features.",ogImage:"/images/sample-apartment-1.jpg"}
  },
  {
    id:"sample-011", sample:true, status:"For Rent", type:"House",
    title:"4-Bedroom Bungalow — Ojoo",
    subtitle:"Sample listing — replace with real details",
    price:"1500000", pricePeriod:"per year",
    location:"Ojoo, Ibadan",
    address:"Ojoo Road, Ibadan, Oyo State",
    bedrooms:4, bathrooms:3, toilets:4, parking:3, areaSqm:"300 sqm",
    description:"This is a sample listing. Spacious 4-bedroom bungalow on Ojoo Road. Large garden, boys' quarters, perimeter fence, serene environment for families.",
    features:["Large garden","Boys' quarters","Perimeter fence","Serene environment","Family suitable"],
    images:["/images/sample-duplex-1.jpg"],
    imageAlt:["Bungalow exterior"],
    seo:{title:"4-Bedroom Bungalow — Ojoo | Prestige Villa",description:"Sample 4-bedroom bungalow for rent in Ojoo, Ibadan. Large garden, boys' quarters.",ogImage:"/images/sample-duplex-1.jpg"}
  },
  {
    id:"sample-012", sample:true, status:"For Sale", type:"Land",
    title:"800 sqm Plot — Akobo",
    subtitle:"Sample listing — replace with real details",
    price:"60000000", pricePeriod:"total",
    location:"Akobo, Ibadan",
    address:"Akobo Residential Area, Ibadan, Oyo State",
    bedrooms:0, bathrooms:0, toilets:0, parking:0, areaSqm:"800 sqm",
    description:"This is a sample listing. 800 sqm residential plot in Akobo. Good road network, developing neighbourhood, suitable for residential building. Survey plan ready.",
    features:["Good road network","Developing neighbourhood","Survey plan ready","Residential building"],
    images:["/images/sample-exterior-2.jpg"],
    imageAlt:["Residential plot Akobo"],
    seo:{title:"800 sqm Plot — Akobo | Prestige Villa",description:"Sample plot of land for sale in Akobo, Ibadan. Survey plan ready.",ogImage:"/images/sample-exterior-2.jpg"}
  },
];



export function getPropertyById(id: string | null | undefined): Property | null {
  if (!id) return null;
  return PRESTIGE_VILLA_PROPERTIES.find((p) => p.id === id) || null;
}

export const PROPERTY_LOCATIONS = Array.from(
  new Set(PRESTIGE_VILLA_PROPERTIES.map((p) => p.location)),
);
