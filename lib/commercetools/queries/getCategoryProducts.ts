// @/lib/commercetools/queries/getCategoryProducts.ts
import { executeGraphQLQuery } from "@/lib/graphqlClient";

export const getCategoryProducts = async ({
  categoryKey,
  limit = 12,
  offset = 0,
}: {
  categoryKey: string;
  limit?: number;
  offset?: number;
}) => {
  // Query to get category ID from key
  console.log("categoryKey = " + categoryKey);
  const categoryQuery =
    `
  query GetCategoryId {
    categories(where: "key=\\"` +
    categoryKey +
    `\\"") {
      results {
        id
      }
    }
  }
`;

  // // Execute query to get category ID
  const categoryData = await executeGraphQLQuery(categoryQuery);
  const categoryId = categoryData?.categories?.results[0]?.id;
  console.log("(Recovered from GraphQL) categoryId = " + categoryId);

  const productsQuery =
    `
  query GetProductsByCategory($limit: Int, $offset: Int) {
    products(where: "masterData(current(categories(id=\\\"` +
    categoryId +
    `\\\")))", limit: $limit, offset: $offset) {
    	total
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
    }
  `;
  const variables = {
    limit,
    offset,
  };
  const productsData = await executeGraphQLQuery(productsQuery, variables);
  return productsData?.products ?? []; //Return .products instead to have access to products.total
};
