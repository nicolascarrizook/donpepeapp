import { CartItem } from '@/types/interfaces';
import {create} from 'zustand';

interface CartState {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  cart: [],
  addToCart: (product) => {
    console.log('Adding to cart', product);
    set((state) => {
      const existingProduct = state.cart.find(item => item.id === product.id);
      if (existingProduct) {
        return {
          cart: state.cart.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          )
        };
      } else {
        return { cart: [...state.cart, { ...product, quantity: 1 }] };
      }
    });
  },
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId),
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ cart: [] }),
}));

export default useCartStore;
