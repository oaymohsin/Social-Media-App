const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: {
      currentTime: () => new Date().toLocaleString(),
    },
  }
//   The toLocaleString() method is suitable for formatting
//   the date when retrieving it for display purposes, but 
//   it won't affect how the date is stored in the database.
//    MongoDB stores dates in a standardized format, and the
//     timestamps option in Mongoose is responsible for this
//      formatting.
);
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("users", userSchema);
