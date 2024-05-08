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

type Category = 'foods' | 'drinks' | 'beers';
interface ProductItem {
  name: string;
  price: number;
  discount: number;
  category: Category;
  isActive: boolean;
}

function Main() {
  const [ productName, setProductName ] = useState( '' );
  const [ category, setCategory ] = useState<Category>( 'foods' );
  const [ price, setPrice ] = useState( '' );
  const [ isActive, setIsActive ] = useState( false );
  const [ showNotification, setShowNotification ] = useState( false );
  const { addProduct } = useProductStore();
  const [ files, setFiles ] = useState<File[]>( [] );

  const resetFields = () => {
    setProductName( '' );
    setPrice( '' );
    setIsActive( false );
    setCategory( 'foods' );
    setFiles( [] );
  };

  const handleFileChange = (event: any) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setFiles(Array.from(files)); 
    }
  };
  
  const successNotification = useRef<NotificationElement>();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (!files.length) {
      alert("Please upload at least one product image.");
      return;
    }
    try {
      await addProduct({
        name: productName,
        price: parseFloat(price),
        discount: 0,
        category,
        isActive,
      }, files[0]);
      resetFields();
      setShowNotification(true);
      setTimeout(() => {
        successNotification.current?.showToast();
      }, 500);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      { showNotification && (
        <Notification getRef={ ( el ) => {
          successNotification.current = el;
        } }
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
      ) }
      <div className="col-span-12 sm:col-span-10 sm:col-start-2">
      <div className="flex flex-col lg:items-center lg:flex-row gap-y-2">
          <div
            className={ clsx( [
              "flex items-center lg:justify-center flex-1 lg:first:justify-start lg:last:justify-end group active",
              "after:hidden before:hidden after:lg:block before:lg:block",
              "first:after:content-[''] first:after:w-full first:after:bg-slate-300/60 first:after:h-[2px] first:after:ml-5 group-[.mode--light]:first:after:bg-slate-300/20",
              "last:before:content-[''] last:before:w-full last:before:bg-slate-300/60 last:before:h-[2px] last:before:mr-5 group-[.mode--light]:last:before:bg-slate-300/20",
              "last:after:hidden after:content-[''] after:w-full after:bg-slate-300/60 after:h-[2px] after:ml-5 group-[.mode--light]:after:bg-slate-300/20",
              "first:before:hidden before:content-[''] before:w-full before:bg-slate-300/60 before:h-[2px] before:mr-5 group-[.mode--light]:before:bg-slate-300/20",
            ] ) }
          >
            <div className="flex items-center">
              <div className="ml-3.5 group-[.mode--light]:!text-slate-300 font-medium whitespace-nowrap text-slate-500 group-[.active]:text-current [.group.mode--light_.group.active_&]:!text-slate-100">
                Información del Producto
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <div className="relative flex flex-col col-span-12 lg:col-span-9 xl:col-span-8 gap-y-7">
            <div className="flex flex-col p-5 box box--stacked">
              <div>
                <div className="mt-7">
                  <form className="flex-col block pt-5 mt-5 xl:items-center sm:flex xl:flex-row first:mt-0 first:pt-0" onSubmit={ handleSubmit }>
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
                        value={ productName }
                        onChange={ ( e ) => setProductName( e.target.value ) }
                      />
                      <FormHelp>Maximo de caracteres 0/70</FormHelp>
                    </div>
                  </form>
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
                        value={ category }
                        onChange={ ( e ) => setCategory( e.target.value as Category ) }
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
                          checked={ isActive }
                          onChange={ () => setIsActive( !isActive ) }
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
                          value={ price }
                          onChange={ ( e ) => setPrice( e.target.value ) }
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
                  />{ " " }
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
                          { files.map( ( file, index ) => (
                            <div key={ index } className="relative h-24 col-span-3 cursor-pointer md:col-span-2 image-fit zoom-in">
                              <img
                                className="rounded-lg"
                                src={ URL.createObjectURL( file ) }
                                alt="Preview"
                              />
                              <button
                                type="button"
                                className="absolute top-0 right-0 w-5 h-5 -mt-2 -mr-2 bg-white rounded-full"
                                onClick={ () => {
                                  const newFiles = files.filter( ( _, i ) => i !== index );
                                  setFiles( newFiles );
                                } }
                              >
                                <Lucide icon="X" className="w-4 h-4 stroke-[1.3]" />
                              </button>
                            </div>
                          ) ) }
                        </div>
                        <div className="relative flex items-center justify-center px-4 pb-4 mt-5 cursor-pointer">
                          <Lucide icon="Image" className="w-4 h-4 mr-2" />
                          <span className="mr-1 text-primary">
                            Cargar Imágenes
                          </span>{ " " }
                          o arrastrar y soltar
                          <FormInput
                            id="horizontal-form-1"
                            type="file"
                            className="absolute top-0 left-0 w-full h-full opacity-0"
                            multiple
                            onChange={ handleFileChange }
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
    </div>
  );
}

export default Main;
