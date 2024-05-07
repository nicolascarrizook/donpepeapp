import { create } from 'zustand';
import { db } from '@/services/firebase/firebase.service';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

interface FoodItem {
  name: string;
  price: number;
  discount: number;
  category: 'foods';
  isActive: boolean;
}

interface DrinkItem {
  name: string;
  price: number;
  discount: number;
  category: 'drinks';
  isActive: boolean;
}

interface BeerItem {
  name: string;
  price: number;
  discount: number;
  category: 'beers';
  isActive: boolean;
}

interface ProductCategories {
  foods: FoodItem[];
  drinks: DrinkItem[];
  beers: BeerItem[];
}

type ProductItem = FoodItem | DrinkItem | BeerItem

type ProductStore = {
  products: ProductCategories;
  fetchProducts: () => Promise<void>;
  addProduct: (category: keyof ProductCategories, product: ProductItem) => Promise<void>;
  updateProduct: (category: keyof ProductCategories, product: ProductItem, docId: string) => Promise<void>;
  deleteProduct: (category: keyof ProductCategories, docId: string) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: {
    foods: [],
    drinks: [],
    beers: []
  },

  fetchProducts: async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    let products: ProductCategories = { foods: [], drinks: [], beers: [] };
    snapshot.forEach((doc) => {
      const data = doc.data() as ProductItem;
      switch (data.category) {
        case 'foods':
          products.foods.push(data as FoodItem);
          break;
        case 'drinks':
          products.drinks.push(data as DrinkItem);
          break;
        case 'beers':
          products.beers.push(data as BeerItem);
          break;
      }
    });
    set({ products });
  },

  addProduct: async (category, product) => {
    const docRef = await addDoc(collection(db, 'products'), { ...product, category });
    console.log("Document written with ID: ", docRef.id);
  },

  updateProduct: async (category, product, docId) => {
    const docRef = doc(db, 'products', docId);
    await updateDoc(docRef, { ...product, category });
  },

  deleteProduct: async (category, docId) => {
    await deleteDoc(doc(db, 'products', docId));
  }
}));
