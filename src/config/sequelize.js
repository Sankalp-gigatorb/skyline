require("dotenv").config();
const Sequelize = require("sequelize");
const config = require("./config"); // Import config.js file

const env = process.env.NODE_ENV || "development"; // Defaults to 'development'
const dbConfig = config[env]; // Select the config based on environment

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: dbConfig.dialect,
    logging: false, // Optional: set to `console.log` to enable SQL logging
  }
);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

connectToDatabase();

module.exports = sequelize;
