// @/lib/commercetools/queries/getProductsSearch
import { executeGraphQLQuery } from "@/lib/graphqlClient";

export const getProductsSearch = async ({
  searchValue = "",
  limit = 12,
  offset = 0,
}: {
  searchValue: string;
  limit?: number;
  offset?: number;
}) => {
  const query = `query ProductSearch($searchValue: String!, $limit: Int, $offset: Int, $locale: Locale) {
    productProjectionSearch(text: $searchValue, limit: $limit, offset: $offset, locale: $locale) {
      total
      results {
        id
        key
        name(locale: $locale)
        description(locale: $locale)
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
  }`;
  const variables = {
    searchValue, // The word Master wants to search for
    limit,
    offset,
    locale: "en-US",
  };
  const data = await executeGraphQLQuery(query, variables);
  // return data ? data.products.results : [];
  // return data && data.productProjectionSearch ? data.productProjectionSearch.results : [];
  return data ? data.productProjectionSearch : []; //Do not returns .results, to get total
}

// Simplified getProducts function
// export async function getProductsSearch({
//   query,
//   reverse,
//   sortKey
// }: {
//   query?: string;
//   reverse?: boolean;
//   sortKey?: string;
// }): Promise<Product[]> {
//Can't sort by price with GraphQL, use HTTP API for that :( or client sorting...
// console.log("==========================================> query = " + query);
// console.log("==========================================> reverse = " + reverse);
// console.log("==========================================> sortKey = " + sortKey);

// THis works, but can't sort by price
// query Products($limit: Int, $offset: Int, $sort: [String!]) {
//   products(limit: $limit, offset: $offset, sort: $sort) {
//     results {
//       key
//       masterData {
//         current {
//           masterVariant {
//             prices {
//               value {
//                 centAmount
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }
// {
//   "limit": 10,
//   "offset": 0,
//   "sort": ["createdAt asc"]
// }
