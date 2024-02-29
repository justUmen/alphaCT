// @/lib/commercetools/BuildClient.ts
import {
  ClientBuilder,
  type AuthMiddlewareOptions,
  type HttpMiddlewareOptions,
} from "@commercetools/sdk-client-v2";

const projectKey = process.env.CTP_PROJECT_KEY as string;
const clientSecret = process.env.CTP_CLIENT_SECRET as string;
const clientId = process.env.CTP_CLIENT_ID as string;
const authUrl = process.env.CTP_AUTH_URL as string;
const apiUrl = process.env.CTP_API_URL as string;
const scopes = (
  process.env.CTP_SCOPES ? process.env.CTP_SCOPES.split(" ") : []
) as string[];

// Configure authMiddlewareOptions
const authMiddlewareOptions: AuthMiddlewareOptions = {
  host: authUrl,
  projectKey: projectKey,
  credentials: {
    clientId: clientId,
    clientSecret: clientSecret,
  },
  scopes: scopes,
  fetch,
};

// Configure httpMiddlewareOptions
const httpMiddlewareOptions: HttpMiddlewareOptions = {
  host: apiUrl,
  fetch,
};

// Export the ClientBuilder (Can add other middleware here if needed)
export const ctpClient = new ClientBuilder()
  .withClientCredentialsFlow(authMiddlewareOptions)
  .withHttpMiddleware(httpMiddlewareOptions)
  // .withLoggerMiddleware()
  .build();
