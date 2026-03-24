
export interface Plant {
  id: string;
  name: string;
  scientificName: string;
  price: number;
  category: string;
  image: string;
  description: string;
  careLevel: 'Easy' | 'Intermediate' | 'Advanced';
  rating: number;
  reviewsCount: number;
  isBestSeller?: boolean;
}

export interface CartItem extends Plant {
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  avatar: string;
  rating: number;
}
