const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  profileImage: String,
  bio: { type: String, max_length: 200 },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
  const user = this;
  // If the password hasn't been modified, skip hashing
  if (!user.isModified("password")) return next();

  // Hash the password
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  // Continue with the save
  next();
});

const User = model("User", userSchema);

module.exports = User;
