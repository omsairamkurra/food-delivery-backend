const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const db = require("./models/db");
const routes = require("./routes/priceRoute");
const path = require("path"); // Import the path module

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Define the path to the Swagger YAML file
const swaggerFilePath = path.resolve(__dirname, "./swagger.yaml");

// Load the Swagger YAML file
const swaggerDocument = YAML.load(swaggerFilePath);

// Routes
app.use("/api", routes);

// Swagger documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
