// @/lib/commercetools/CreateClient.ts
import { ctpClient } from "./BuildClient";
import { createApiBuilderFromCtpClient } from "@commercetools/platform-sdk";
const projectKey = process.env.CTP_PROJECT_KEY as string;

// Create apiRoot from the imported ClientBuilder and include your Project key
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({
  projectKey: projectKey,
});

// Usage of Singleton pattern to create a single instance of the ApiRoot !!!!
export default apiRoot;
