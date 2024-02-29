// @/app/api/create-cart/route.ts
// test cartid : 511ec978-da58-4f40-8d6b-cb1b0da690ac
import { Product, Cart } from "@commercetools/platform-sdk";
import apiRoot from "@/lib/commercetools/CreateClient";

export async function POST() {
  try {
    // Attempt to create an anonymous cart using commercetools
    const response = await apiRoot
      .carts()
      .post({
        body: {
          currency: "EUR", // Adjust currency as needed
          // Optionally add more cart details here
        },
      })
      .execute();

    const cart: Cart = response.body;

    // Respond with the created cart
    return new Response(JSON.stringify(cart), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error creating anonymous cart:", error);
    return new Response(
      JSON.stringify({ error: "Failed to create anonymous cart" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
