// @/lib/graphqlClient.ts
import apiRoot from "@/lib/commercetools/CreateClient";
import { Product } from "@commercetools/platform-sdk";

// ??? Brute force for now... fix later
interface GraphQLResponse<T = any> {
  total: any | null;
  productProjectionSearch: any;
  product: Product | PromiseLike<Product | undefined> | undefined;
  categories: any;
  results: any;
  customers: GraphQLResponse<any> | null;
  products: any;
  data: T;
  errors?: { message: string }[];
}

/**
 * Executes a GraphQL query and returns the data.
 * @param query The GraphQL query string.
 * @param variables The variables for the query, if any.
 * @returns The data from the GraphQL query or null in case of an error.
 */
export const executeGraphQLQuery = async <T = any>(
  query: string,
  variables: Record<string, any> = {}
): Promise<GraphQLResponse<T> | null> => {
  const graphQLRequest = { query, variables };
  try {
    const graphQLResponse = await apiRoot
      .graphql()
      .post({
        body: graphQLRequest,
      })
      .execute();
    return graphQLResponse.body.data; // Return the entire data object
  } catch (error) {
    console.error("GraphQL request failed:", error);
    return null; // Return null in case of error
  }
};
