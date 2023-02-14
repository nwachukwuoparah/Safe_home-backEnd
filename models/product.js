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
      type: String,
      required: [true, "price is required"],
    },
    rating: {
      type: Number,
      required: [true, "rating is required"],
    },
    stockQuantity: {
      type: String,
      required: [true, "stockQuantity is required"]
    },
    brandName: {
      type: String,
      required: [true, "brandName is required"]
    },
    
    categories:[{
      beds: {
        type: String,
        default: "beds"
      },
      cabinets: {
        type: String,
        default: "cabinets"
      },
      chairs: {
        type: String,
        default: "chairs"
      },
      chests: {
        type: String,
        default: "chests"
      },
      desks: {
        type: String,
        default: "desks"
      },
      tables: {
        type: String,
        default: "tables"
      },
   }]
  },
  {
    timestamps: true
  })

const product = mongoose.model('product', productSchema)
module.exports = product

