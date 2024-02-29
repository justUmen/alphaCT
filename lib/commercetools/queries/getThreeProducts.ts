// @/lib/commercetools/queries/getThreeProducts.ts
import { executeGraphQLQuery } from "@/lib/graphqlClient";
// Simplified getProducts function
export const getThreeProducts = async () => {
  const limit = 3;
  const randomOffset = Math.floor(Math.random() * 10); // Generate a random offset value
  const query = `query Products($limit: Int, $randomOffset: Int) {
      products(limit: $limit, offset: $randomOffset) {
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
  const variables = {
    limit,
    randomOffset,
  };
  const data = await executeGraphQLQuery(query, variables); // Ensure executeGraphQLQuery can handle variables
  return data ? data.products.results : [];
};
