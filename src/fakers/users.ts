import _ from "lodash";
import { useEmployeeStore } from '@/stores/employes';

export interface User {
  name: string;
  position: string;
  photo: string;
  email: string;
  phone: string;
  department: string;
  location: string;
  joinedDate: string;
  manager: string;
  addressLine1: string;
  addressLine2: string;
  isActive: boolean;
}

const imageAssets = import.meta.glob<{
  default: string;
}>("/src/assets/images/users/*.{jpg,jpeg,png,svg}", { eager: true });

const fakers = {
  
  fakeUsers() {
    const users: Array<User> = [
      {
        name: "Tom Hanks",
        position: "Sales Manager",
        photo: imageAssets["/src/assets/images/users/user1-50x50.jpg"].default,
        email: "tom.hanks@left4code.com",
        phone: "+1 (123) 456-7890",
        department: "Sales Department",
        location: "New York, USA",
        joinedDate: "January 15, 2010",
        manager: "John Smith",
        addressLine1: "123 Main Street",
        addressLine2: "Suite 456",
        isActive: true,
      },
    ];
    return _.shuffle(users);
  },
};

export default fakers;
