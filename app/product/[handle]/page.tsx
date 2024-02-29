// @/app/product/[handle]/page.tsx
// import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { GridTileImage } from "@/components/grid/tile";
import { Gallery } from "@/components/product/gallery";
import { ProductDescription } from "@/components/product/product-description";
import { getProductsPage } from "@/lib/commercetools/queries/getProductsPage";
import { Image } from "@/lib/types";
import { getProduct } from "@/lib/commercetools/queries/getProduct";
import Link from "next/link";

export const runtime = "edge";

// export async function generateMetadata({
//   params,
// }: {
//   params: { handle: string };
// }): Promise<Metadata> {
//   const product = await getProduct(params.handle);

//   if (!product) return notFound();
//   const url = product.masterData.current.masterVariant.images?.[0]?.url ?? "";
//   const alt = product.masterData.current.description;

//   // const indexable = !product.tags.includes(HIDDEN_PRODUCT_TAG);
//   const indexable = true;

//   return {
//     title: product.masterData.current.name.toString(),
//     description: product.masterData.current.description?.toString(),
//     robots: {
//       index: indexable,
//       follow: indexable,
//       googleBot: {
//         index: indexable,
//         follow: indexable,
//       },
//     },
//     openGraph: url
//       ? {
//           images: [
//             {
//               url,
//               alt: alt as unknown as string,
//             },
//           ],
//         }
//       : null,
//   };
// }

export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const product = await getProduct(params.handle); //Not GraphQL, for EZ access to full data, included inventory...

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.masterData.current.name.toString(),
    description: product.masterData.current.description,
    image: product.masterData.current.masterVariant.images?.[0]?.url ?? "",
    offers: {
      "@type": "AggregateOffer",
      availability: product.masterData.current.masterVariant.availability
        ?.isOnStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      priceCurrency: "USD", // ??? test
      highPrice: null, //No concept of high/low price in CT
      lowPrice: null,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd),
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={
                product.masterData.current.masterVariant.images?.map(
                  (image: Image) => ({
                    src: image.url.toString(),
                    altText: product.masterData.current.name.toString(),
                  })
                ) ?? []
              }
            />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts id={product.id} />
        </Suspense>
      </div>
      {/* <Suspense>
        <Footer />
      </Suspense> */}
    </>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  // const relatedProducts = await getProductRecommendations(id);
  const relatedProducts = await getProductsPage(); //Write a function to get related products instead of that ???

  if (!relatedProducts) return null; //??

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {Array.isArray(relatedProducts) &&
          relatedProducts.map((product) => (
            <li
              key={product.key}
              className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            >
              <Link
                className="relative h-full w-full"
                href={`/product/${product.key}`}
              >
                <GridTileImage
                  alt={product.title}
                  label={{
                    title: product.masterData.current.name.toString(),
                    amount: (
                      (product.masterData.current.masterVariant.prices?.[0]
                        ?.value.centAmount ?? 0) / 100
                    ).toString(),
                    currencyCode:
                      product.masterData.current.masterVariant.prices?.[0]
                        ?.value.currencyCode ?? "USD",
                  }}
                  src={
                    product.masterData.current.masterVariant.images?.[0]?.url ??
                    ""
                  }
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
                />
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
