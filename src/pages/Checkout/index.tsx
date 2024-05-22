import React from 'react';
import useCartStore from '@/stores/order.store';
import { CartItem } from '@/types/interfaces';

const Checkout: React.FC = () => {
  const { cart, createOrder, clearCart } = useCartStore();

  const handleCheckout = async () => {
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const order = await createOrder(cart, total);
    console.log('Order created:', order);
    printReceipt(order);
    clearCart();
  };

  const printReceipt = (order: { id: number; items: CartItem[]; date: Date; total: number }) => {
    const receiptWindow = window.open('', 'PRINT', 'height=400,width=600');
    if (receiptWindow) {
      receiptWindow.document.write('<html><head><title>Receipt</title>');
      receiptWindow.document.write('</head><body>');
      receiptWindow.document.write('<h1>Receipt</h1>');
      receiptWindow.document.write(`<p>Order ID: ${order.id}</p>`);
      receiptWindow.document.write(`<p>Date: ${order.date.toLocaleString()}</p>`);
      receiptWindow.document.write('<table>');
      receiptWindow.document.write('<tr><th>Item</th><th>Quantity</th><th>Price</th></tr>');
      order.items.forEach(item => {
        receiptWindow.document.write(`<tr><td>${item.name}</td><td>${item.quantity}</td><td>$${item.price.toFixed(2)}</td></tr>`);
      });
      receiptWindow.document.write('</table>');
      receiptWindow.document.write(`<p>Total: $${order.total.toFixed(2)}</p>`);
      receiptWindow.document.write('</body></html>');
      receiptWindow.document.close();
      receiptWindow.print();
    }
  };

  return (
    <button
      className="w-full mt-4 bg-blue-500 text-white py-2 rounded-lg text-lg font-semibold shadow-md hover:bg-blue-600"
      onClick={handleCheckout}
    >
      Checkout
    </button>
  );
};

export default Checkout;
