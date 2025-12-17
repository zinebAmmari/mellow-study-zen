// server/models/User.js (Exemple Mongoose)
const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Le mot de passe HACHÉ
    refreshToken: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
