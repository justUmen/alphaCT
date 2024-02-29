// @/lib/commercetools/queries/getCollection.ts
import { executeGraphQLQuery } from "@/lib/graphqlClient";

// Simplified getProducts function
export const getCollection = async () => {
  const query = `query Categories{
    categories {
      results {
        key
      }
    }
  }`;
  const data = await executeGraphQLQuery(query);
  return data?.categories?.results ?? [];
};
