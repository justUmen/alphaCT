// @/lib/commercetools/queries/getProduct.ts
import { Product } from "@commercetools/platform-sdk";
import apiRoot from "@/lib/commercetools/CreateClient";

// Simplified getProduct function
export const getProduct = async (handle: string): Promise<Product | undefined>  => {
  const response = await apiRoot.products().withKey({ key: handle }).get().execute();
  return response.body;
};
