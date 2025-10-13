import { vendureDashboardPlugin } from "@vendure/dashboard/vite";
import { pathToFileURL } from "url";
import { defineConfig } from "vite";
import { resolve, join } from "path";
const IS_DEV = process.env.APP_ENV === "dev";
export default defineConfig({
  base: "/dashboard/",
  build: {
    outDir: join(__dirname, "dist/dashboard"),
  },
  plugins: [
    vendureDashboardPlugin({
      // The vendureDashboardPlugin will scan your configuration in order
      // to find any plugins which have dashboard extensions, as well as
      // to introspect the GraphQL schema based on any API extensions
      // and custom fields that are configured.
      vendureConfigPath: pathToFileURL("./src/vendure-config.ts"),
      // Points to the location of your Vendure server.
      api: {
        host: IS_DEV ? "http://localhost" : "https://shops.cosmostn.com",
        port: IS_DEV ? 3000 : undefined,
      },
      // api: {
      //   host: "https://shops.cosmostn.com",
      //   // port: 3000,
      // },
      // When you start the Vite server, your Admin API schema will
      // be introspected and the types will be generated in this location.
      // These types can be used in your dashboard extensions to provide
      // type safety when writing queries and mutations.
      gqlOutputPath: "./src/gql",
    }),
  ],
  resolve: {
    alias: {
      // This allows all plugins to reference a shared set of
      // GraphQL types.
      "@/gql": resolve(__dirname, "./src/gql/graphql.ts"),
    },
  },
});
