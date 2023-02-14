const mongoose = require("mongoose")
const RatingSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    },
    rating: {
      type: Number,
      default: 0,
    },

  })
  
  // Product Model
  const Rating = mongoose.model("Rating", RatingSchema);
  module.exports= Rating
  
  