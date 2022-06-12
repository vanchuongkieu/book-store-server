const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    books: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Book",
        },
        quantity: {
          type: Number,
        },
        price: {
          type: Number,
        },
      },
    ],
    total: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "new", "done", "remove"],
      default: "new",
    },
    orderInfo: {
      name: {
        type: String,
      },
      email: {
        type: String,
      },
      address: {
        type: String,
      },
      phone: {
        type: String,
      },
      note: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
