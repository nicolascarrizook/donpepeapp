import { create } from 'zustand';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../services/firebase/firebase.service";  

type EmployeeInfo = {
  fullName: string;
  dateOfBirth: string | null;
  gender: string;
  email: string;
  phoneNumber: string;
  phoneType: string;
  department: string;
};

type EmployeeStore = {
  employee: EmployeeInfo;
  setEmployee: (info: Partial<EmployeeInfo>) => void;
  saveEmployee: () => Promise<void>;
  error: string | null;
};

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employee: {
    fullName: '',
    dateOfBirth: null,
    gender: '',
    email: '',
    phoneNumber: '',
    phoneType: '',
    department: ''
  },
  setEmployee: (info) => {
    const currentEmployee = get().employee;
    set({ employee: { ...currentEmployee, ...info } });
  },
  saveEmployee: async () => {
    const { employee } = get();
    try {
      const docRef = await addDoc(collection(db, "employees"), employee);
      console.log("Document written with ID: ", docRef.id);
    } catch (e: any) {
      console.error("Error adding document: ", e);
      set({ error: e.message });
    }
  },
  error: null
}));
