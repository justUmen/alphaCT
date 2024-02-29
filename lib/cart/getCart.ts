// @/lib/cart/getCart.ts
import { Cart } from "@commercetools/platform-sdk";
import apiRoot from "../commercetools/CreateClient";

export async function getCart(cartId: string): Promise<Cart | undefined> {
    const response = await apiRoot.carts().withId({ ID: cartId }).get().execute();
    console.log(response);
    return response.body;
}
