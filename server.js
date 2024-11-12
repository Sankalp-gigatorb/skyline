require("@babel/register");
/* eslint-disable no-console */
const chalk = require("chalk");
const dotenv = require("dotenv");
const app = require("./app");

// Load environment variables from .env file
dotenv.config({ path: ".env" });

// Define port and environment variables
const port = process.env.APP_PORT || 3000;
const environment = process.env.NODE_ENV || "development";

// Set up the Express server
const startServer = () => {
  const server = app.listen(port, () => {
    console.log(
      `App running on port ${chalk.greenBright(port)} in ${chalk.blueBright(
        environment
      )} mode...`
    );
  });

  // In case of an error
  app.on("error", (appErr, appCtx) => {
    console.error("App error", appErr.stack);
    console.error("On URL", appCtx.req.url);
    console.error("With headers", appCtx.req.headers);
  });

  // Handle unhandled promise rejections
  process.on("unhandledRejection", (err) => {
    console.log(chalk.bgRed("UNHANDLED REJECTION! 💥 Shutting down..."));
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });

  // Graceful shutdown on SIGTERM
  process.on("SIGTERM", () => {
    console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
    server.close(() => {
      console.log("💥 Process terminated!");
    });
  });
};

// Start the server
startServer();
