const mongoose = require("mongoose");
const config = require("config");
const path = require("path");
const cors = require("cors");
const express = require("express");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "client/build")));

// Connect to the DB through a super secret thingy doohickey!
const url = process.env.mongoURI;
mongoose
  .connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log(`Connected to MongoDB url: ${url}`);
  })
  .catch((error) => {
    console.log("error connecting to MongoDB:", error.message);
  });

app.use("/api/yaks", require("./routes/api/yaks"));
app.use("/api/comments", require("./routes/api/comments"));
app.use("/api/users", require("./routes/api/users"));
app.use("/api/login", require("./routes/api/login"));

// Delivers the initial index.html for React to manipulate
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

// Makes the server listen for requests... creepy!
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server listening on port ${port}`));
