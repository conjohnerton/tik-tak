const express = require("express");
const swaggerUI = require("swagger-ui-express");
const swaggerConfig = require("./swaggerConfig");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

//const url = process.env.MONGODB_URI;
const url = config.get("mongoURI");

// Connect to the DB through a super secret thingy doohickey!
mongoose
   .connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
   })
   .then((result) => {
      console.log(`Connected to MongoDB url: ${url}`);
   })
   .catch((error) => {
      console.log("error connecting to MongoDB:", error.message);
   });

// app.use("/api/contacts", require("./routes/api/contacts"));
// app.use("/api/users", require("./routes/api/users"));
// app.use("/api/auth", require("./routes/api/auth"));

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
// Run the server file : nodemon server.js
// Then open up the URL localhost:3001/api-docs in your browser to see what the annotation does for us!

app.get("/test", (req, res) => res.send("Hello, world"));
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// This is a test api route, it should be moved elsewhere.
// Where would we move a route, if we wanted it out of the server file?
// If you had your routes elsewhere, how could you use them here?

app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.use(cors());

// Makes the server listen for requests... creepy!
app.listen(port, () => console.log(`Server listening on port ${port}`));
