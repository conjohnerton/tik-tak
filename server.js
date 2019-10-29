const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./swaggerConfig");
const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

// Inits swagger doc generation
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

// test api route
/**
 * @swagger
 *
 * /test:
 *   get:
 *     description: Use to get a nice, fluffy message!
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: A successful response
 */
/**
 * @swagger
 *
 * /test:
 *    get:
 *       description: Use to get a nice message!
 *       produces:
 *          - application/json
 *       responses:
 *          200:
 *             description: A successful response
 */

app.get("/test", (req, res) => res.send("Hello, world"));

// Connect to DB

// Initializes server listener
app.listen(port, () => console.log(`Server listening on port ${port}`));
