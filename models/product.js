const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "title is required"]
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  image: {
    type: String,
  },
  cloudId: {
    type: String,
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  categories: {
    type: Array,
    required: [true, "Enter a category"]
  },
  // categories: [String],
  stockQuantity: {
    type: Number,
    required: [true, "stockQuantity is required"]
  },
  brandName: {
    type: String,
    required: [true, "brandName is required"]
  },
},
  {
    timestamps: true
  })

const product = mongoose.model('product', productSchema)
module.exports = product

