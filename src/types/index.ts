export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
  sizes: string[];
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export type SortOption = 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';

export interface FilterState {
  category: string;
  minPrice: number;
  maxPrice: number;
  colors: string[];
  sizes: string[];
}