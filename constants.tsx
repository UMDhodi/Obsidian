
import { Product, Quote, ConsultationResponse } from './types';

export const PRODUCTS: Product[] = [
  // SKIN
  {
    id: 's1',
    name: 'Obsidian Face Wash',
    tagline: 'STRIP THE GRIT',
    description: 'Deep-cleansing charcoal tube removes urban pollutants.',
    category: 'skin',
    type: 'tube',
    imageUrl: './product_skin_1.png',
    price: 24,
    benefits: ['Active Charcoal', 'Tea Tree Oil', 'Anti-Pollution Shield', 'Pore Tightening'],
    inStock: true
  },
  {
    id: 's2',
    name: 'Obsidian Skin Cream',
    tagline: 'SHIELD THE FLESH',
    description: 'Heavyweight hydration in a massive 200ml tube.',
    category: 'skin',
    type: 'tube',
    imageUrl: './product_skin_2.png',
    price: 32,
    benefits: ['Ceramides', 'Non-Greasy', '24hr Hydration', 'Vitamin E Fortified'],
    inStock: true
  },
  {
    id: 's3',
    name: 'Obsidian Skin Serum',
    tagline: 'SHIELD THE FLESH',
    description: ' Hydration in a massive serum bottle.',
    category: 'skin',
    type: 'tube',
    imageUrl: './product_skin_3.png',
    price: 32,
    benefits: ['Ceramides', 'Non-Greasy', '24hr Hydration', 'Vitamin E Fortified'],
    inStock: true
  },
  // HAIR
  {
    id: 'h1',
    name: 'Steel Pomade Kit',
    tagline: 'COMMAND YOUR CROWN',
    description: 'High-hold, matte finish gromming kit.',
    category: 'hair',
    type: 'kit',
    imageUrl: './product_hair_1.png',
    price: 28,
    benefits: ['Matte Finish', 'Rain Resistant', 'Pliable Hold', 'Water Soluble'],
    inStock: false // Out of stock for testing
  },
  {
    id: 'h2',
    name: 'Root Fuel Hair Serum',
    tagline: 'STRENGTH FROM WITHIN',
    description: 'Caffeine-infused serum for thicker, more resilient follicles.',
    category: 'hair',
    type: 'bottle',
    imageUrl: './product_hair_2.png',
    price: 45,
    benefits: ['Follicle Stimulation', 'Scalp Health', 'Caffeine Infusion', 'Biotin Boost'],
    inStock: true
  },
  {
    id: 'h3',
    name: 'Obsidian Hair Drayer',
    tagline: 'ULTRA COMPACT HAIR DRYER ',
    description: 'Styling Gun Ultra Compact Hair Dryer - Black Edition',
    category: 'hair',
    type: 'electronic',
    imageUrl: './product_hair_3.png',
    price: 45,
    benefits: ['Light Weight', '1100W Power', 'Concentrator Nozzle', 'Over Heat Protection'],
    inStock: true
  },
  {
    id: 'h4',
    name: 'Obsidian Stronghold Hair Wax',
    tagline: 'STRENGTH & MATTE FINISH',
    description: 'Whatever your choice of hairstyle, choose nothing but the best. Really on Beardo Strong Hold Hair Wax to keep your hair healthy and styled all day long.',
    category: 'hair',
    type: 'jar',
    imageUrl: './product_hair_4.png',
    price: 45,
    benefits: ['Strong Hold', 'Matte Finish', 'Non-Greasy', 'Easy Wash Out'],
    inStock: true
  },
  // FRAGRANCE
  {
    id: 'f1',
    name: 'Midnight Lead',
    tagline: 'SCENT OF AUTHORITY',
    description: 'Smoky vetiver, dark leather, and cold-pressed bergamot.',
    category: 'fragrance',
    type: 'bottle',
    imageUrl: './product_perfume_1.png',
    price: 110,
    benefits: ['12hr Longevity', 'Intense Sillage', 'Natural Ingredients', 'Paraben Free'],
    inStock: true
  },
  {
    id: 'f2',
    name: 'Extrait',
    tagline: 'ESSENCE OF POWER',
    description: 'Rich oud, black pepper, and a hint of dark chocolate.',
    category: 'fragrance',
    type: 'bottle',
    imageUrl: './product_perfume_2.png',
    price: 110,
    benefits: ['12hr Longevity', 'Intense Sillage', 'Natural Ingredients', 'Paraben Free'],
    inStock: true
  },
  {
    id: 'f3',
    name: 'Vodun Perfume',
    tagline: 'SIGNATURE PRESENCE',
    description: 'Earthy patchouli, smoky incense, and a whisper of citrus zest.',
    category: 'fragrance',
    type: 'bottle',
    imageUrl: './product_perfume_3.png',
    price: 110,
    benefits: ['12hr Longevity', 'Intense Sillage', 'Natural Ingredients', 'Paraben Free'],
    inStock: true
  },
];

export const QUOTES: Quote[] = [
  { text: "Skincare is not vanity. It's maintenance for the machinery.", author: "The Modern Stoic" },
  { text: "Your face is your first impression. Forge it well.", author: "Obsidian Philosophy" },
  { text: "Maturity is realizing soap isn't a skincare routine.", author: "Common Sense" }
];

export const MACHO_IMAGES = [
  './hero_gallery_1.png',
  './hero_gallery_2.png',
  './hero_gallery_3.png'
];

export const SKIN_SAMPLES: Record<string, ConsultationResponse> = {
  Oily: {
    routine: ["Cleanse with Face Wash", "Serum to T-zone", "Light Layer Obsidian Cream"],
    advice: "Control the grease.",
    recommendedProducts: ["Obsidian Face Wash", "Obsidian Skin Serum"]
  },
  Dry: {
    routine: ["Double dose Hydra-Core", "Heavy application Obsidian Cream", "Solar Guard mandatory"],
    advice: "Hydration is fuel.",
    recommendedProducts: ["Obsidian Skin Cream", "Obsidian Skin Serum", "Obsidian Face Wash"]
  }
};
