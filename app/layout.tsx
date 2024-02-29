// @/app/layout.tsx
import "./globals.css";
import Navbar from "@/components/layout/navbar";

// import {
//   ApolloClient,
//   InMemoryCache,
//   ApolloProvider,
//   gql,
// } from "@apollo/client";
// const apolloClient = new ApolloClient({
//   uri: "https://flyby-router-demo.herokuapp.com/",
//   cache: new InMemoryCache(),
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-50 text-black selection:bg-teal-300 dark:bg-neutral-900 dark:text-white dark:selection:bg-pink-500 dark:selection:text-white">
        <Navbar />
        <main>
          {/* <ApolloProvider client={apolloClient}> */}
            {children}
          {/* </ApolloProvider> */}
        </main>
      </body>
    </html>
  );
}
