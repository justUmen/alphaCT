'use client';

import { Dialog, Transition } from '@headlessui/react';
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import Price from '@/components/price';
// import type { Cart } from '@/lib/commercetools/types';
import type { Cart } from '@commercetools/platform-sdk';
import { DEFAULT_OPTION } from '@/lib/constants';
import { createUrl } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useEffect, useRef, useState } from 'react';
import CloseCart from './close-cart';
// import { DeleteItemButton } from './delete-item-button';
// import { EditItemQuantityButton } from './edit-item-quantity-button';
import OpenCart from './open-cart';

type MerchandiseSearchParams = {
  [key: string]: string;
};

export default function CartModal({ cart , cartId }: { cart: Cart | undefined; cartId: string | undefined }) {
  const [isOpen, setIsOpen] = useState(false);
  // const quantityRef = useRef(cart?.lineItems);
  const quantityRef = useRef(cart?.lineItems);
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    // Open cart modal when quantity changes.
    if (cart?.lineItems !== quantityRef.current) {
      // But only if it's not already open (quantity also changes when editing items in cart).
      if (!isOpen) {
        setIsOpen(true);
      }

      // Always update the quantity reference
      quantityRef.current = cart?.lineItems;
    }
  }, [isOpen, cart?.lineItems, quantityRef]);

  return (
    <>
      <button title={`Cart ID: ${cartId}`} aria-label={`Open cart`} onClick={openCart}>
        <OpenCart quantity={cart?.lineItems.length} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>

                <button aria-label="Close cart" onClick={closeCart}>
                  <CloseCart />
                </button>
              </div>

              {!cart || cart.lineItems.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
   {/* "lineItems": [
        {
            "id": "05c65eeb-d8c4-48c0-aa0f-08194bf416c4",
            "productId": "653c613f-b6f2-4633-8236-821b73fb5233",
            "productKey": "rustic-country-queen-bed",
            "name": {
                "en-US": "Rustic Country Queen Bed",
                "en-GB": "Rustic Country Queen Bed",
                "de-DE": "Rustikales Queensize-Bett im Landhausstil"
            },
            "productType": {
                "typeId": "product-type",
                "id": "6d8f3c1b-38c8-47d7-8c49-0a00c6852245",
                "version": 1
            },
            "productSlug": {
                "en-US": "rustic-country-queen-bed",
                "en-GB": "rustic-country-queen-bed",
                "de-DE": "rustikales-country-queen-bett"
            },
            "variant": {
                "id": 1,
                "sku": "RCQB-01",
                "prices": [
                    {
                        "id": "5bb4f1ab-ef07-45cb-80f2-46488455724b",
                        "value": {
                            "type": "centPrecision",
                            "currencyCode": "EUR",
                            "centAmount": 329900,
                            "fractionDigits": 2
                        },
                        "country": "DE"
                    }, */}
                    {cart.lineItems.map((item, i) => {
                      // cart.lineItems.forEach((item) => {
                        let merchandiseSearchParams = new URLSearchParams();
                      
                        // Check if attributes exist before iterating
                        if (item.variant.attributes) {
                          item.variant.attributes.forEach(({ name, value }) => {
                            // Handling potentially localized value structures
                            if (typeof value === 'object' && value.label) {
                              Object.keys(value.label).forEach(lang => {
                                const localizedValue = value.label[lang];
                                if (localizedValue !== DEFAULT_OPTION) {
                                  merchandiseSearchParams.append(name.toLowerCase(), localizedValue);
                                }
                              });
                            } else {
                              // For non-localized simple values
                              if (value !== DEFAULT_OPTION) {
                                merchandiseSearchParams.append(name.toLowerCase(), value);
                              }
                            }
                          });
                        }
                      
                        // Assuming the presence and structure of item.productSlug for URL construction
                        const slug = item.productSlug?.['en-US']; // Example locale selection
                        const merchandiseUrl = createUrl(`/product/${slug}`, merchandiseSearchParams);
                      
                        // Use merchandiseUrl as needed
                      // });

                      return (
                        <li
                          key={i}
                          className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                        >
                          <div className="relative flex w-full flex-row justify-between px-1 py-4">
                            <div className="absolute z-40 -mt-2 ml-[55px]">
                              {/* <DeleteItemButton item={item} /> */}
                            </div>
                            <Link
                              href={merchandiseUrl}
                              onClick={closeCart}
                              className="z-30 flex flex-row space-x-4"
                            >
                              <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                                {/* <Image
                                  className="h-full w-full object-cover"
                                  width={64}
                                  height={64}
                                  alt={
                                    item.merchandise.product.featuredImage.altText ||
                                    item.merchandise.product.title
                                  }
                                  src={item.merchandise.product.featuredImage.url}
                                /> */}
                              </div>

                              <div className="flex flex-1 flex-col text-base">
                                {/* <span className="leading-tight">
                                  {item.merchandise.product.title}
                                </span>
                                {item.merchandise.title !== DEFAULT_OPTION ? (
                                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                    {item.merchandise.title}
                                  </p>
                                ) : null} */}
                              </div>
                            </Link>
                            <div className="flex h-16 flex-col justify-between">
                              <Price
                                className="flex justify-end space-y-2 text-right text-sm"
                                // amount={item.cost.totalAmount.amount}
                                amount={cart.id}
                                // currencyCode={item.cost.totalAmount.currencyCode}
                                currencyCode={cart.id}
                              />
                              <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                                {/* <EditItemQuantityButton item={item} type="minus" /> */}
                                <p className="w-6 text-center">
                                  <span className="w-full text-sm">{item.quantity}</span>
                                </p>
                                {/* <EditItemQuantityButton item={item} type="plus" /> */}
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                      <p>Taxes</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        // amount={cart.cost.totalTaxAmount.amount}
                        amount={cart.id}
                        // currencyCode={cart.cost.totalTaxAmount.currencyCode}
                        currencyCode={cart.id}
                      />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Shipping</p>
                      <p className="text-right">Calculated at checkout</p>
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                      <p>Total</p>
                      <Price
                        className="text-right text-base text-black dark:text-white"
                        // amount={cart.cost.totalAmount.amount}
                        amount={cart.id}
                        // currencyCode={cart.cost.totalAmount.currencyCode}
                        currencyCode={cart.id}
                      />
                    </div>
                  </div>
                  <a
                    // href={cart.checkoutUrl}
                    href={cart.id}
                    className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
                  >
                    Proceed to Checkout
                  </a>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
