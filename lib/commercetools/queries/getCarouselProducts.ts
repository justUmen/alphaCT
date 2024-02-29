// @/lib/commercetools/queries/getCarouselProducts.ts
import { executeGraphQLQuery } from "@/lib/graphqlClient";
// Simplified getProducts function
export const getCarouselProducts = async () => {
  const query = `query Products($limit: Int, $randomOffset: Int) {
      products(limit: $limit, offset: $randomOffset) {
        results {
          id
          key
          masterData {
            current {
              slug(locale: "en-US")
              name(locale: "en-US")
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
  const randomOffset = Math.floor(Math.random() * 10); // Generate a random offset value
  const variables = {
    limit,
    randomOffset,
  };
  const data = await executeGraphQLQuery(query, variables); // Ensure executeGraphQLQuery can handle variables
  return data ? data.products.results : [];
};
