import React from 'react';
import useCartStore from '@/stores/order.store';
import { CartItem } from '@/types/interfaces';
import Checkout from '@/pages/Checkout';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Carrito de Compras</h2>
      <div className="space-y-4">
        {cart.map((item: CartItem) => (
          <div key={item.id} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
            <img src={item.imageUrl} alt={item.name} className="w-16 h-16 rounded-lg" />
            <div className="ml-4 flex-grow">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-sm text-gray-600">x{item.quantity}</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md"
                onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
              >
                -
              </button>
              <span className="px-2 text-lg font-medium">{item.quantity}</span>
              <button
                className="px-3 py-1 bg-blue-500 text-white rounded-md"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </button>
              <span className="ml-4 text-lg font-medium">${item.price.toFixed(2)}</span>
              <button
                className="ml-2 px-3 py-1 bg-red-500 text-white rounded-md"
                onClick={() => removeFromCart(item.id)}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-inner">
        <div className="flex justify-between items-center text-xl font-bold">
          <span>Total</span>
          <span>${(total).toFixed(2)}</span> {/* Incluye el servicio de $1 */}
        </div>
      </div>
      <Checkout />
    </div>
  );
};

export default Cart;
