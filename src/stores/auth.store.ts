import { create } from 'zustand';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, setPersistence, browserLocalPersistence } from "firebase/auth";
import { auth } from "../services/firebase/firebase.service";
import { useEffect } from 'react';
import { persist } from 'zustand/middleware';

type UserState = {
  user: any; 
  error: string;
  notification: string;
  loading: boolean;
  login: (email: string, password: string, navigate: any) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: (navigate: any) => Promise<void>;
  checkAuth: () => void;
};

export const useUserStore = create(persist<UserState>((set, get) => ({
  user: null,
  error: '',
  notification: '',
  loading: false,
  
  login: async (email, password, navigate) => {
    set({ loading: true });
    try {
      await setPersistence(auth, browserLocalPersistence);  
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in successfully', auth.currentUser);
      set({ user: auth.currentUser, loading: false, error: '' });
      navigate('/');
    } catch (error: any) {
      console.log('Error: ', error.message);
      set({ error: error.message, loading: false });
    }
  },

  loginWithGoogle: async (navigate) => {
    set({ loading: true });
    const provider = new GoogleAuthProvider();
    try {
      await setPersistence(auth, browserLocalPersistence); 
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        set({ user: result.user, loading: false, error: '' });
        navigate('/');
      } else {
        throw new Error("No se pudo obtener información del usuario de Google.");
      }
    } catch (error: any) {
      console.error('Error: ', error.message);
      set({ error: error.message, loading: false });
    }
  },
  
  logout: async () => {
    set({ loading: true });
    try {
      await signOut(auth);
      set({ user: null, loading: false, error: '' });
    } catch (error: any) {
      console.log('Error: ', error.message);
      set({ error: error.message, loading: false });
    }
  },

  checkAuth: () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        set({ user });
      } else {
        set({ user: null });
      }
    });
  },
}), {
  name: 'user-storage', 
  getStorage: () => sessionStorage 
}));

export function useAuthStateObserver() {
  const { checkAuth } = useUserStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
}