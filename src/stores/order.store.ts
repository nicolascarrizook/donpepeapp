import create from 'zustand';
import { CartItem, Order } from '@/types/interfaces';
import { db } from '@/services/firebase/firebase.service'; // Asegúrate de que la ruta es correcta
import { collection, addDoc } from "firebase/firestore"; 

interface CartState {
  cart: CartItem[];
  orders: Order[];
  nextOrderId: number;
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: (items: CartItem[], total: number) => Promise<Order>; // Añadir total
}

const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  orders: [],
  nextOrderId: 1,
  addToCart: (product) => set((state) => {
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
  }),
  removeFromCart: (productId) => set((state) => ({
    cart: state.cart.filter((item) => item.id !== productId),
  })),
  updateQuantity: (productId, quantity) => set((state) => ({
    cart: state.cart.map(item =>
      item.id === productId ? { ...item, quantity } : item
    )
  })),
  clearCart: () => set({ cart: [] }),
  createOrder: async (items, total) => {
    const state = get();
    const newOrder: Order = {
      id: state.nextOrderId,
      items,
      date: new Date(),
      total
    };
    await addDoc(collection(db, "orders"), newOrder); // Guardar en Firestore
    set({
      orders: [...state.orders, newOrder],
      nextOrderId: state.nextOrderId + 1,
      cart: []
    });
    return newOrder;
  }
}));

export default useCartStore;
