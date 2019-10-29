const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./swaggerConfig");
const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

// Inits document generation for all that Swagger that we've got
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));

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
 *             description: Hello, world
 */
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// That is a swagger annotation, it is how we document our API. I'll explain later. Just know that it documents what the route below does.
// Run the server file : node server.js
// Then open up the URL localhost:3001/api-docs in your browser to see what the annotation does for us!

app.get("/test", (req, res) => res.send("Hello, world"));
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// This is a test api route, it should be moved elsewhere.
// Where would we move a route, if we wanted it out of the server file?
// If you had your routes elsewhere, how could you use them here?

// Connect to the DB through a super secret thingy doohickey!

// Makes the server listen, like a creep!
app.listen(port, () => console.log(`Server listening on port ${port}`));
