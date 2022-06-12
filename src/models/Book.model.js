const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const bookSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nameAscii: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    priceSale: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      required: true,
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
      },
    ],
    description: {
      type: String,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
    publisher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Publisher",
    },
    year: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

bookSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("Book", bookSchema);
