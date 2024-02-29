// @/lib/commercetools/queries/getProductsPage.ts
import { executeGraphQLQuery } from "@/lib/graphqlClient";

// Simplified getProducts function
export const getCategories = async () => {
  const query = `query Categories{
    categories {
      results {
        key
        name(locale: "en-US")
      }
    }
  }`;
  const data = await executeGraphQLQuery(query); // Ensure executeGraphQLQuery can handle variables
  return data?.categories?.results ?? [];
};
