import Lucide from "@/components/Base/Lucide";
import { FormInput } from "@/components/Base/Form";
import Button from "@/components/Base/Button";
import _ from "lodash";
import clsx from 'clsx';
import { useProductStore } from '@/stores/products.store';
import { useEffect } from 'react';
import Cart from '@/components/Cart';
import useCartStore from '@/stores/order.store';
import { ProductItem } from '@/types/interfaces';

function Main() {
  const { products, fetchProducts } = useProductStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="grid grid-cols-12 gap-y-10 gap-x-6">
      <div className="col-span-7">
        <div className="flex flex-col md:h-10 gap-y-3 md:items-center md:flex-row">
          <div className="text-base font-medium group-[.mode--light]:text-white">
            Products
          </div>
        </div>
        <div className="mt-3.5">
          <div className="flex flex-col box box--stacked">
            <div className="flex flex-col p-5 sm:items-center sm:flex-row gap-y-2">
              <div>
                <div className="relative">
                  <Lucide
                    icon="Search"
                    className="absolute inset-y-0 left-0 z-10 w-4 h-4 my-auto ml-3 stroke-[1.3] text-slate-500"
                  />
                  <FormInput
                    type="text"
                    placeholder="Search products..."
                    className="pl-9 sm:w-64 rounded-[0.5rem]"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-hidden">
              <div className="grid grid-cols-9 px-5 -mx-4 border-dashed border-y">
                {products.map((product: any, index: number) => (
                  <div
                    key={index}
                    className="col-span-12 sm:col-span-6 xl:col-span-3 border-dashed border-slate-300/80 [&:nth-child(4n)]:border-r-0 px-5 py-5 [&:nth-last-child(-n+4)]:border-b-0 border-r border-b flex flex-col"
                  >
                    <div className="overflow-hidden rounded-lg h-52 image-fit before:block before:absolute before:w-full before:h-full before:top-0 before:left-0 before:z-10 before:bg-gradient-to-t before:from-slate-900/90 before:to-black/20">
                      <img
                        alt="Tailwise - Admin Dashboard Template"
                        className="rounded-md"
                        src={product.imageUrl}
                      />
                      {product.isActive ? (
                        <span className="absolute top-0 z-10 px-2.5 py-1 m-5 text-xs text-white rounded-lg bg-success/80 font-medium border-white/20 border">
                          Active
                        </span>
                      ) : (
                        <span className="absolute top-0 z-10 px-2.5 py-1 m-5 text-xs text-white rounded-lg bg-pending/80 font-medium border-white/20 border">
                          Inactive
                        </span>
                      )}
                      <div className="absolute bottom-0 z-10 w-full px-5 pb-6 text-white">
                        <a
                          href="#"
                          className="block text-lg font-medium truncate"
                        >
                          {product.name}
                        </a>
                        <span className="mt-3 text-xs text-white/80">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    <div className="pt-5">
                      <div className="flex flex-col gap-3.5 mb-5 pb-5 mt-auto border-b border-dashed border-slate-300/70">
                        <div className="flex items-center">
                          <div className="text-slate-500">Categoria:</div>
                          <div className="ml-auto">
                            <div className="flex items-center text-xs font-medium rounded-md text-success bg-success/10 border border-success/10 px-1.5 py-px">
                              <span className="-mt-px">
                                {product.category}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="text-slate-500">Precio:</div>
                        <div className="ml-auto font-medium text-lg">
                          ${product.price}
                        </div>
                      </div>
                      <div className="flex items-center justify-end">
                        <Button
                          variant="primary"
                          className="mt-2"
                          onClick={() => addToCart({ ...product, quantity: 1 })}
                        >
                          <Lucide icon="ShoppingCart" className="mr-2" />
                          Agregar a la orden
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-5">
        <div className="sticky top-[100px] p-4 bg-white rounded-md shadow">
          <Cart />
        </div>
      </div>
    </div>
  );
}

export default Main;
