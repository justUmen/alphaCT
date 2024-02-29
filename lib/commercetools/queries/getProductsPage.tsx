// @/lib/commercetools/queries/getProductsPage.tsx
import { executeGraphQLQuery } from "@/lib/graphqlClient";

// Simplified getProducts function
export const getProductsPage = async (page = 1) => {
  const query = `query Products($limit: Int, $offset: Int) {
      products(limit: $limit, offset: $offset) {
        results {
          id
          key
          masterData {
            current {
              name(locale: "en-US")
              slug(locale: "en-US")
              description(locale: "en-US")
              masterVariant {
                images {
                  url
                }
                prices {
                  value {
                    centAmount
                  }
                }
              }
            }
          }
        }
      }
    }`;
  const limit = 12;
  const offset = (page - 1) * limit; // Calculate offset based on page number
  const variables = {
    limit,
    offset,
  };
  const data = await executeGraphQLQuery(query, variables);
  return data ? data.products.results : [];
};
