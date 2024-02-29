// @/app/components/Cart.tsx
'use client'
import { useEffect, useState } from 'react';
import { getCart } from '@/lib/cart/getCart';
import CartModal from '@/components/cart/modal';
// import { cookies } from 'next/headers';
// ??? use cookies for cart, instead of localStorage + apollo client

const Cart = () => {
  const [cartId, setCartId] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrCreateCart = async () => {
      let existingCartId = localStorage.getItem('cartId');
      
    if (!existingCartId) {
        // No existing cart ID found, so create a new cart
        try {
            const response = await fetch('/api/create-cart', { method: 'POST' });
            const data = await response.json();
            existingCartId = data.id; // Assuming the response contains the cart ID as 'id'
            localStorage.setItem('cartId', existingCartId as string); // Store the new cart ID with type assertion
            console.log('New cart created:', data);
        } catch (error) {
            console.error('Failed to create cart:', error);
        }
    } else {
        console.log('Existing cart ID found:', existingCartId);
    }
      
      setCartId(existingCartId);
    };

    fetchOrCreateCart();
  }, []);

  return (
    <div>
      {cartId ? <CartModal cart={undefined} cartId={cartId} /> : <p>Creating cart...</p>}
    </div>
  );
};

export default Cart;

// import { cookies } from 'next/headers';
// import CartModal from './modal';

// export default async function Cart() {
//   // const cartId = cookies().get('cartId')?.value;
//   const cartId = localStorage.getItem('cartId');
//   let cart;

//   if (cartId) {
//     cart = await getCart(cartId);
//   }

//   return <CartModal cart={cart} cartId={undefined} />;
// }
