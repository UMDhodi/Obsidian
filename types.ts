
export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: 'skin' | 'hair' | 'fragrance';
  type: 'tube' | 'bottle' | 'jar' | 'kit' | 'electronic';
  imageUrl: string;
  price: number;
  benefits: string[];
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Quote {
  text: string;
  author: string;
}

export interface ConsultationResponse {
  routine: string[];
  advice: string;
  recommendedProducts: string[];
}
