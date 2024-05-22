import { create } from 'zustand';
import { db } from '@/services/firebase/firebase.service';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

interface ProductItem {
  id?: string;
  name: string;
  price: number;
  discount: number;
  category: 'foods' | 'drinks' | 'beers';
  isActive: boolean;
  imageUrl: string;
  quantity?: number;
}

type ProductStore = {
  products: ProductItem[];
  fetchProducts: () => Promise<void>;
  addProduct: (product: ProductItem, file: File) => Promise<void>;
  updateProduct: (product: ProductItem) => Promise<void>;
  deleteProduct: (docId: string) => Promise<void>;
};

export const useProductStore = create<ProductStore>((set, get) => ({
  products: [],

  fetchProducts: async () => {
    const snapshot = await getDocs(collection(db, 'products'));
    let products: ProductItem[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data() as ProductItem;
      data.id = doc.id; 
      products.push(data);
    });
    set({ products });
  },

  addProduct: async (product, file) => {
    try {
      const storageRef = ref(getStorage(), `products/${file.name}`);
      await uploadBytes(storageRef, file);
      const imageUrl = await getDownloadURL(storageRef);

      const newProduct = { ...product, imageUrl };
      const docRef = await addDoc(collection(db, 'products'), newProduct);

      get().fetchProducts(); 
      console.log("Product added with image successfully");
    } catch (error) {
      console.error("Error adding product with image: ", error);
    }
  },


  updateProduct: async (product) => {
    if (!product.id) return; 
    
    const updateData = {
      name: product.name,
      price: product.price,
      discount: product.discount,
      category: product.category,
      isActive: product.isActive
    };
  
    const docRef = doc(db, 'products', product.id);
  
    try {
      await updateDoc(docRef, updateData);
      console.log("Product updated successfully");
      get().fetchProducts(); 
    } catch (error) {
      console.error("Error updating product: ", error);
    }
  },
  deleteProduct: async (docId) => {
    await deleteDoc(doc(db, 'products', docId));
    get().fetchProducts(); 
  }
}));
