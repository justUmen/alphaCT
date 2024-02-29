// @/lib/commercetools/getProject.ts
import apiRoot from "@/lib/commercetools/CreateClient";

export const getProject = () => {
  return apiRoot.get().execute();
};
