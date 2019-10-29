const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const YakSchema = new Schema({
   // put some other stuff here!

   // This may need a different expiration time for testing purpose
   createdAt: { type: Date, expires: 3600, default: Date.now }, // one of these
   expire_at: { type: Date, default: Date.now, expires: 3600 } // should work
});
