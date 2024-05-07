import Lucide from "@/components/Base/Lucide";
import TomSelect from "@/components/Base/TomSelect";
import { ClassicEditor } from "@/components/Base/Ckeditor";
import {
  FormLabel,
  FormCheck,
  FormInput,
  FormInline,
  FormSelect,
  FormSwitch,
  InputGroup,
  FormHelp,
} from "@/components/Base/Form";
import Alert from "@/components/Base/Alert";
import Tippy from "@/components/Base/Tippy";
import products from "@/fakers/products";
import categories from "@/fakers/categories";
import Button from "@/components/Base/Button";
import Table from "@/components/Base/Table";
import { useRef, useState } from "react";
import clsx from "clsx";
import _ from "lodash";
import { useProductStore } from '@/stores/products.store';
import Notification, { NotificationElement } from '@/components/Base/Notification';

interface FoodItem {
  name: string;
  price: number;
  discount: number;
  category: 'foods';
  isActive: boolean; 
}

interface DrinkItem {
  name: string;
  sizes: { [key: string]: number };
  discount: number;
  category: 'drinks';
  isActive: boolean; 
}

interface BeerItem {
  name: string;
  literPrice: number;
  canPrice: number;
  discount: number;
  category: 'beers';
  isActive: boolean;
}

interface ProductCategories {
  foods: FoodItem[];
  drinks: DrinkItem[];
  beers: BeerItem[];
}

function Main() {
  const [subcategory, setSubcategory] = useState(["0"]);
  const { addProduct } = useProductStore();
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState<CategoryKey>('foods');
  const [showNotification, setShowNotification] = useState(false);
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState(false);
  type CategoryKey = keyof ProductCategories;

  const resetFields = () => {
    setProductName('');
    setPrice('');
    setIsActive(false);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await addProduct(category, {
        name: productName,
        price: parseFloat(price),
        discount: 0,
        category: category,
        isActive: isActive,
      });
      setShowNotification(true);
      setTimeout(() => {
        successNotification.current?.showToast();
      }, 500);
      resetFields();
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };
  
  const successNotification = useRef<NotificationElement>();

  return (
    <form className="grid grid-cols-12 gap-y-10 gap-x-6" onSubmit={handleSubmit}>
       {showNotification && (
        <Notification getRef={(el) => {
            successNotification.current = el;
          }}
          className="flex"
        >
          <Lucide icon="CheckCircle" className="text-success" />
          <div className="ml-4 mr-4">
            <div className="font-medium">Producto registrado con éxito!</div>
            <div className="mt-1 text-slate-500">
              Su información ha sido guardada correctamente.
            </div>
          </div>
        </Notification>
      )}
      <div className="col-span-12">
        <div className="flex flex-col mt-4 md:mt-0 md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Agregar Producto
          </div>
        </div>
        <div className="mt-3.5 grid grid-cols-12 xl:grid-cols-10 gap-y-7 lg:gap-y-10 gap-x-6">
          <div className="relative flex flex-col col-span-12 lg:col-span-9 xl:col-span-8 gap-y-7">
            <div className="flex flex-col p-5 box box--stacked">
              <div className="p-5 border rounded-[0.6rem] border-slate-200/60 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-[0.94rem] font-medium border-b border-slate-200/60 dark:border-darkmode-400">
                  <Lucide
                    icon="ChevronDown"
                    className="w-5 h-5 stroke-[1.3] mr-2"
                  />{" "}
                  Información general del Producto
                </div>
                <div className="mt-5">
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Nombre</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Requerido
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                          Ingrese el nombre del producto.
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <FormInput
                        type="text"
                        placeholder="Nombre del producto"
                        name="name" 
                        required
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                      />
                      <FormHelp>Maximo de caracteres 0/70</FormHelp>
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Categoría</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Requerido
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                          Seleccione la categoría principal de su producto.
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSelect
                      id="category"
                      value={category}
                      onChange={(e) => setCategory(e.target.value as CategoryKey)} // Cast seguro, asumiendo que los valores en el select son válidos
                      required
                    >
                      <option value="foods">Sangucheria</option>
                      <option value="drinks">Bebidas</option>
                      <option value="beers">Cervezas</option>
                    </FormSelect>
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Subcategoria</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Requerido
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                          Seleccione la subcategoría de su producto.
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <TomSelect
                        value={subcategory}
                        onChange={(e) => {
                          setSubcategory(e.target.value);
                        }}
                        options={{
                          placeholder: "",
                        }}
                        className="w-full"
                        multiple
                      >
                        {categories.fakeCategories().map((faker, fakerKey) => (
                          <option key={fakerKey} value={fakerKey}>
                            {faker.name}
                          </option>
                        ))}
                      </TomSelect>
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Estado del producto</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Requerido
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                          Seleccione si el producto esta activo o inactivo.
                          Esta opción afectará la visibilidad del producto en la tienda.
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                    <FormSwitch>
                    <FormSwitch.Input
                      id="product-status-active"
                      type="checkbox"
                      checked={isActive}
                      onChange={() => setIsActive(!isActive)}
                    />
                    <FormSwitch.Label htmlFor="product-status-active">
                      Activo
                    </FormSwitch.Label>
                  </FormSwitch>
                    </div>
                  </div>
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Precio del producto</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Requerido
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                          Ingrese el precio del producto.
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <InputGroup>
                        <InputGroup.Text className="text-xs font-medium text-slate-500 dark:text-slate-400">
                          $
                        </InputGroup.Text>
                        <FormInput
                          type="number"
                          placeholder="Precio del producto"
                          name="price"
                          required 
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </InputGroup>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col p-5 box box--stacked">
              <div className="p-5 border rounded-[0.6rem] border-slate-200/80 dark:border-darkmode-400">
                <div className="flex items-center pb-5 text-[0.94rem] font-medium border-b border-slate-200/80 dark:border-darkmode-400">
                  <Lucide
                    icon="ChevronDown"
                    className="w-5 h-5 stroke-[1.3] mr-2"
                  />{" "}
                  Cargar Imágenes del Producto
                </div>
                <div className="mt-5">
                  <div className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0">
                    <label className="inline-block mb-2 sm:mb-0 sm:mr-5 sm:text-right xl:w-60 xl:mr-14">
                      <div className="text-left">
                        <div className="flex items-center">
                          <div className="font-medium">Product Photos</div>
                          <div className="ml-2.5 px-2 py-0.5 bg-slate-100 text-slate-500 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md border border-slate-200">
                            Requerido
                          </div>
                        </div>
                        <div className="mt-1.5 xl:mt-3 text-xs leading-relaxed text-slate-500/80">
                            Cargar imágenes de su producto.
                            Las imágenes deben ser de alta calidad y mostrar el producto desde diferentes ángulos.
                        </div>
                      </div>
                    </label>
                    <div className="flex-1 w-full mt-3 xl:mt-0">
                      <div className="border border-dashed rounded-md border-slate-300/80">
                        <div className="grid grid-cols-9 gap-5 px-5 pt-5 sm:grid-cols-10">
                          {_.take(products.fakeProducts(), 5).map(
                            (faker, fakerKey) => (
                              <div
                                key={fakerKey}
                                className="relative h-24 col-span-3 cursor-pointer md:col-span-2 image-fit zoom-in"
                              >
                                <img
                                  className="rounded-lg"
                                  alt="Tailwise - Admin Dashboard Template"
                                  src={faker.images[0].path}
                                />
                                <Tippy
                                  content="Remove this image?"
                                  className="absolute top-0 right-0 w-5 h-5 -mt-2 -mr-2 bg-white rounded-full"
                                >
                                  <div className="flex items-center justify-center w-full h-full text-white border rounded-full bg-danger/80 border-danger/50">
                                    <Lucide
                                      icon="X"
                                      className="w-4 h-4 stroke-[1.3]"
                                    />
                                  </div>
                                </Tippy>
                              </div>
                            )
                          )}
                        </div>
                        <div className="relative flex items-center justify-center px-4 pb-4 mt-5 cursor-pointer">
                          <Lucide icon="Image" className="w-4 h-4 mr-2" />
                          <span className="mr-1 text-primary">
                            Cargar Imágenes
                          </span>{" "}
                          o arrastrar y soltar
                          <FormInput
                            id="horizontal-form-1"
                            type="file"
                            className="absolute top-0 left-0 w-full h-full opacity-0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-end gap-3 mt-1 md:flex-row">
              <Button
                variant="outline-secondary"
                className="w-full border-slate-300/80 bg-white/80 md:w-56 py-2.5 rounded-[0.5rem]"
              >
                <Lucide icon="XCircle" className="stroke-[1.3] w-4 h-4 mr-2" />
                Cancelar
              </Button>
              <Button
                variant="primary"
                className="w-full md:w-56 py-2.5 rounded-[0.5rem]"
              >
                <Lucide icon="PenLine" className="stroke-[1.3] w-4 h-4 mr-2" />
                Guardar Producto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Main;
