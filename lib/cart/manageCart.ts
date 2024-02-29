import { Cart } from '@commercetools/platform-sdk';

// const reshapeCart = (cart: Cart): Cart => {
//     if (!cart.cost?.totalTaxAmount) {
//       cart.cost.totalTaxAmount = {
//         amount: '0.0',
//         currencyCode: 'USD'
//       };
//     }
  
//     return {
//       ...cart,
//       lines: removeEdgesAndNodes(cart.lines)
//     };
//   };
//   export async function createCart(): Promise<Cart> {
//     const res = await shopifyFetch<ShopifyCreateCartOperation>({
//       query: createCartMutation,
//       cache: 'no-store'
//     });
  
//     return reshapeCart(res.body.data.cartCreate.cart);
//   }
  
//   export async function addToCart(
//     cartId: string,
//     lines: { merchandiseId: string; quantity: number }[]
//   ): Promise<Cart> {
//     const res = await shopifyFetch<ShopifyAddToCartOperation>({
//       query: addToCartMutation,
//       variables: {
//         cartId,
//         lines
//       },
//       cache: 'no-store'
//     });
//     return reshapeCart(res.body.data.cartLinesAdd.cart);
//   }
  
//   export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
//     const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
//       query: removeFromCartMutation,
//       variables: {
//         cartId,
//         lineIds
//       },
//       cache: 'no-store'
//     });
  
//     return reshapeCart(res.body.data.cartLinesRemove.cart);
//   }
  
//   export async function updateCart(
//     cartId: string,
//     lines: { id: string; merchandiseId: string; quantity: number }[]
//   ): Promise<Cart> {
//     const res = await shopifyFetch<ShopifyUpdateCartOperation>({
//       query: editCartItemsMutation,
//       variables: {
//         cartId,
//         lines
//       },
//       cache: 'no-store'
//     });
  
//     return reshapeCart(res.body.data.cartLinesUpdate.cart);
//   }
  
//   export async function getCart(cartId: string): Promise<Cart | undefined> {
//     const res = await shopifyFetch<ShopifyCartOperation>({
//       query: getCartQuery,
//       variables: { cartId },
//       tags: [TAGS.cart],
//       cache: 'no-store'
//     });
  
//     // Old carts becomes `null` when you checkout.
//     if (!res.body.data.cart) {
//       return undefined;
//     }
  
//     return reshapeCart(res.body.data.cart);
//   }