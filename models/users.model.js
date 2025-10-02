const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true, // ✅ must explicitly set true
    trim: true,
    unique: true,
    lowercase: true,
    minLength: [3, "Username must be at least 3 characters"],
  },
  email: {
    type: String,
    required: true, // ✅ fixed
    trim: true,
    unique: true,
    lowercase: true,
    minLength: [3, "Email must be at least 3 characters"],
  },
  password: {
    type: String,
    required: true, // ✅ fixed
    trim: true,
    minLength: [6, "Password must be at least 6 characters"],
  },
});

module.exports = mongoose.model("user", userSchema);
