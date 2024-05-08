import { create } from 'zustand';
import { collection, addDoc, getDocs } from "firebase/firestore"; 
import { db } from "../services/firebase/firebase.service";  

type EmployeeInfo = {
  fullName: string;
  dateOfBirth: string | null;
  gender: string;
  email: string;
  phoneNumber: string;
  phoneType: string;
  department: string;
  status: string;
  isActive: boolean;
};

type EmployeeStore = {
  employees: EmployeeInfo[];
  employee: EmployeeInfo;
  setEmployees: (employees: EmployeeInfo[]) => void;
  setEmployee: (info: Partial<EmployeeInfo>) => void;
  loadEmployees: () => Promise<void>;
  saveEmployee: () => Promise<void>;
  error: string | null;
};

type EmployeeInfoWithId = EmployeeInfo & { id: string };

export const useEmployeeStore = create<EmployeeStore>((set, get) => ({
  employees: [],
  employee: {
    fullName: '',
    dateOfBirth: null,
    gender: '',
    email: '',
    phoneNumber: '',
    phoneType: '',
    department: '',
    status: '',
    isActive: false,
  },
  setEmployees: (employees) => set({ employees }),
  setEmployee: (info) => {
    const updatedEmployee = { ...get().employee, ...info };
    set({ employee: updatedEmployee });
  },
  loadEmployees: async () => {
    try {
      const snapshot = await getDocs(collection(db, "employees"));
      const employees = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }) as EmployeeInfoWithId); 
      set({ employees });
    } catch (error: any) {
      console.error("Error loading employees: ", error);
      set({ error: error.message });
    }
  },
  saveEmployee: async () => {
    const { employee } = get();
    try {
      await addDoc(collection(db, "employees"), employee);
      set({ employee: {
        fullName: '',
        dateOfBirth: null,
        gender: '',
        email: '',
        phoneNumber: '',
        phoneType: '',
        department: '',
        status: '',
        isActive: false,
      }});
    } catch (error: any) {
      console.error("Error saving employee: ", error);
      set({ error: error.message });
    }
  },
  error: null
}));
