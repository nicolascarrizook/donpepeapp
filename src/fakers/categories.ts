import _ from "lodash";
import { icons } from "@/components/Base/Lucide";

export interface Category {
  name: string;
  icon: keyof typeof icons;
  tags: string[];
  slug: string;
  isActive: boolean;
}

const fakers = {
  fakeCategories() {
    const categories: Array<Category> = [
      {
        name: "Sangucheria",
        icon: "Clipboard",
        tags: ["minutas", "milanesas", "supremas"],
        slug: "foods",
        isActive: true,
      },
      {
        name: "Pizzas",
        icon: "Circle", 
        tags: ["comun", "especial", "napolitana"],
        slug: "pizzas",
        isActive: true,
      },
      {
        name: "Bebidas sin alcohol",
        icon: "Coffee", 
        tags: ["sodas", "waters"],
        slug: "drinks",
        isActive: true,
      },
      {
        name: "Cervezas",
        icon: "Beer", 
        tags: ["norte", "salta", "imperial"],
        slug: "beers",
        isActive: true,
      }
    ];
    return _.shuffle(categories);
  },
};

export default fakers;
