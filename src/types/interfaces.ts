// types.ts
export interface ProductItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  isActive: boolean;
  category: string;
}

export interface CartItem extends ProductItem {
  quantity: number; // Añadimos una cantidad para cada ítem del carrito
}

export interface Order {
  id: number;
  items: CartItem[];
  date: Date;
  total: number;
}