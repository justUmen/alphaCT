// @/app/search/[categories]/page.tsx
import { getCategoryProducts } from "@/lib/commercetools/queries/getCategoryProducts";
import { LIMIT } from "@/lib/constants";

import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "Categories",
  description: "Search for products in the store.",
};

export const runtime = "edge";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: { categories: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Determine the current page; default to 1 if not specified
  const page = parseInt(searchParams?.page as string) || 1;
  const limit = LIMIT; // Define how many items per page
  const offset = (page - 1) * limit; // Calculate offset based on the current page

  const products = await getCategoryProducts({
    categoryKey: params.categories,
    limit,
    offset,
  });
  const totalPages = Math.ceil(products.total / limit);

  return (
    <section>
      {products.total === 0 ? (
        <p className="py-3 text-lg">{`No products found in this categories`}</p>
      ) : (
        <>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            categories={params.categories}
          />
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products.results} />
          </Grid>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            categories={params.categories}
          />
        </>
      )}
    </section>
  );
}
