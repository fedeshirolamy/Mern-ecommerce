const { Schema, default: mongoose } = require("mongoose");

const ProductSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    price: {
      type: String,
      required: [true, "price is required"],
    },
    category: {
      type: String,
      required: [true, "category is required"],
    },
    pictures: {
      type: Array,
      required: true,
    },
  },
  { minimize: false }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
