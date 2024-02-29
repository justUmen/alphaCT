// @/lib/commercetools/queries/getProductRecommendations.ts
import { executeGraphQLQuery } from "@/lib/graphqlClient";
import { Product } from "@commercetools/platform-sdk";

export const getProductRecommendations = async (handle: string): Promise<Product | undefined>  => {
  const query = `query GetProductRecommendations($productId: String!) {
    getProductRecommendations(productId: $productId) {
      id
      name
      description
      imageUrl
    }
  }`;
  const variables = {
    key: handle,
    // limit: 12,
    // offset: 0,
  };
  const data = await executeGraphQLQuery(query, variables);
  return data ? data.product : undefined;
};