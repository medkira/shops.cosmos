import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSchedulerPlugin,
  DefaultSearchPlugin,
  VendureConfig,
} from "@vendure/core";
import {
  defaultEmailHandlers,
  EmailPlugin,
  FileBasedTemplateLoader,
} from "@vendure/email-plugin";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import { GraphiqlPlugin } from "@vendure/graphiql-plugin";
import "dotenv/config";
import path from "path";
import { DashboardPlugin } from "@vendure/dashboard/plugin";

const IS_DEV = process.env.APP_ENV === "dev";
const serverPort = +process.env.PORT || 3000;

export const config: VendureConfig = {
  apiOptions: {
    // hostname: "0.0.0.0",
    port: serverPort,
    adminApiPath: "admin-api",
    shopApiPath: "shop-api",
    trustProxy: IS_DEV ? false : 1,
    // The following options are useful in development mode,
    // but are best turned off for production for security
    // reasons.
    ...(IS_DEV
      ? {
          adminApiDebug: true,
          shopApiDebug: true,
        }
      : {}),
    // cors: {
    //   origin: ["https://shops.cosmostn.com"],
    //   credentials: true,
    // },
    // cors: {
    //   // When in development, allow requests from any origin
    //   // The logic below checks if we are NOT in production
    //   // origin: !IS_DEV
    //   //   ? ["https://shops.cosmostn.com"] // Production URL
    //   //   : ["*"], // Allow ALL origins (localhost:5173, etc.)

    //   // origin: ["http://localhost, "http://localhost:5173"],

    //   credentials: true,
    // },
  },
  authOptions: {
    tokenMethod: ["bearer", "cookie"],
    superadminCredentials: {
      identifier: process.env.SUPERADMIN_USERNAME,
      password: process.env.SUPERADMIN_PASSWORD,
    },
    cookieOptions: {
      secret: process.env.COOKIE_SECRET,
    },
  },
  dbConnectionOptions: {
    type: "postgres",
    // See the README.md "Migrations" section for an explanation of
    // the `synchronize` and `migrations` options.
    synchronize: true,
    migrations: [path.join(__dirname, "./migrations/*.+(js|ts)")],
    logging: false,
    database: process.env.DB_NAME,
    schema: process.env.DB_SCHEMA,
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  // When adding or altering custom field definitions, the database will
  // need to be updated. See the "Migrations" section in README.md.
  customFields: {},
  plugins: [
    DashboardPlugin.init({
      // Important: This must match the base path from vite.config.mts (without slashes)
      route: "dashboard",
      // Path to the Vite build output directory
      appDir: path.join(__dirname, "../dist/dashboard"),
    }),
    GraphiqlPlugin.init(),
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "../static/assets"),
      // For local dev, the correct value for assetUrlPrefix should
      // be guessed correctly, but for production it will usually need
      // to be set manually to match your production url.
      assetUrlPrefix: IS_DEV ? undefined : "https://www.my-shop.com/assets/",
    }),
    DefaultSchedulerPlugin.init(),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin.init({
      devMode: true,
      outputPath: path.join(__dirname, "../static/email/test-emails"),
      route: "mailbox",
      handlers: defaultEmailHandlers,
      templateLoader: new FileBasedTemplateLoader(
        path.join(__dirname, "../static/email/templates")
      ),
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation.
        // Here we are assuming a storefront running at http://localhost:8080.
        fromAddress: '"example" <noreply@example.com>',
        verifyEmailAddressUrl: "http://localhost:8080/verify",
        passwordResetUrl: "http://localhost:8080/password-reset",
        changeEmailAddressUrl:
          "http://localhost:8080/verify-email-address-change",
      },
    }),
    // AdminUiPlugin.init({
    //   route: "admin",
    //   //   hostname: "0.0.0.0",
    //   port: serverPort + 2,
    //   adminUiConfig: {
    //     apiHost: "https://shops.cosmostn.com",
    //     // apiPort: serverPort,
    //   },
    // }),
  ],
};
