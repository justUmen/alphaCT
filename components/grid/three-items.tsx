// @/components/grid/three-items.tsx
import { GridTileImage } from "@/components/grid/tile";
import { getThreeProducts } from "@/lib/commercetools/queries/getThreeProducts";
import Link from "next/link";
import { Product } from "@commercetools/platform-sdk";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.key}`}
      >
        <GridTileImage
          src={item.masterData.current.masterVariant.images?.[0]?.url ?? ""}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.masterData.current.name.toString()}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.masterData.current.name.toString(),
            amount: (
              (item.masterData.current.masterVariant.prices?.[0]?.value
                .centAmount ?? 0) / 100
            ).toString(),
            currencyCode:
              item.masterData.current.masterVariant.prices?.[0]?.value
                .currencyCode ?? "USD",
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  // const homepageItems = await getCollectionProducts({
  //   collection: 'hidden-homepage-featured-items',
  // });
  const homepageItems = await getThreeProducts();

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
