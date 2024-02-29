// @/app/components/carousel.tsx
import { getCarouselProducts } from '@/lib/commercetools/queries/getCarouselProducts';
import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // const products = await getCollectionProducts({ collection: 'hidden-homepage-carousel' });
  const products = await getCarouselProducts(); //Later can remove some items from carousel

  if (!products?.length) return null;

  // Purposefully duplicating products to make the carousel loop and not run out of products on wide screens.
  const carouselProducts = [...products, ...products, ...products];

  return (
    <div className=" w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((item, i) => (
          <li
            key={`${item.id}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${item.key}`} className="relative h-full w-full">
              <GridTileImage
                alt={item.masterData.current.name.toString()}
                label={{
                  title: item.masterData.current.name.toString(),
                  amount: ((item.masterData.current.masterVariant.prices?.[0]?.value.centAmount ?? 0) / 100).toString(),
                  currencyCode: item.masterData.current.masterVariant.prices?.[0]?.value.currencyCode ?? 'USD',
                }}
                src={item.masterData.current.masterVariant.images?.[0]?.url ?? ''}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
