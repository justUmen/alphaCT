// import Cart from '@/components/cart';
import Cart from '@/components/Cart';
import OpenCart from '@/components/cart/open-cart';
// import LogoSquare from 'components/logo-square';
// import { getMenu } from 'lib/shopify';
// import { Menu } from 'lib/shopify/types';

import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
// import MobileMenu from './mobile-menu';
import Search from "./search";

export default async function Navbar() {
  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">MINIMENU</div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link
            href="/"
            className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6"
          >
            <Image src="/skull.png" alt="logo" width={50} height={50} />
            {/* <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              SITENAME
            </div> */}
          </Link>
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            <li>
              <Link
                href="/search"
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                All categories
              </Link>
            </li>
            <li>
              <Link
                href="/search/beds"
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                Beds
              </Link>
            </li>
            <li>
              <Link
                href="/search/furniture"
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                Furniture
              </Link>
            </li>
            <li>
              <Link
                href="/search/kitchen"
                className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
              >
                Kitchen
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
        <Suspense fallback={<div>Loading...</div>}>
          <Search />
        </Suspense>
        </div>
        <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
