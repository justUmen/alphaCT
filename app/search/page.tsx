// @/app/search/page.tsx
import Grid from "@/components/grid";
import ProductGridItems from "@/components/layout/product-grid-items";
// import { LIMIT, defaultSort, sorting } from '@/lib/constants';
import { LIMIT } from "@/lib/constants";
import { getProductsSearch } from "@/lib/commercetools/queries/getProductsSearch";
import Pagination from "@/components/Pagination";

export const metadata = {
  title: "Search",
  description: "Search for products in the store.",
};

export const runtime = "edge";

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  // Determine the current page; default to 1 if not specified
  const page = parseInt(searchParams?.page as string) || 1;
  const limit = LIMIT;
  const offset = (page - 1) * limit;

  const { q: searchValue } = searchParams as { [key: string]: string }; // Add sort later
  // const { sort, q: searchValue } = searchParams as { [key: string]: string };
  // Assuming sorting logic is handled within getProductsSearch
  const products = await getProductsSearch({
    searchValue: searchValue,
    limit,
    offset,
  });
  const totalPages = products ? Math.ceil(products.total / limit) : 0;
  return (
    <section>
      {searchValue ? (
        <p className="mb-4">
          {products.total === 0
            ? `There are no products that match "${searchValue}"`
            : `Showing ${products.total} ${
                products.total > 1 ? "results" : "result"
              } for "${searchValue}"`}
        </p>
      ) : null}
      {products.total > 0 ? (
        <>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            searchValue={searchValue}
          />
          <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={products.results} />
          </Grid>
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            searchValue={searchValue}
          />
        </>
      ) : null}
    </section>
  );
}
