const mongoose = require("mongoose");
const uuid4 = require("uuid").v4;
const { createHmac } = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      default: true,
    },
    address: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    salt: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.methods = {
  encrytPassword(password) {
    if (!password) return;
    try {
      return createHmac("sha256", this.salt).update(password).digest("hex");
    } catch (error) {
      console.log(error);
    }
  },
  authenticate(password) {
    return this.encrytPassword(password) == this.password;
  },
};

userSchema.pre("save", async function save(next) {
  try {
    this.salt = uuid4();
    this.password = this.encrytPassword(this.password);
    return next();
  } catch (err) {
    return next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
