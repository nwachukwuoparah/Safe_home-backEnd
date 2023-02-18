const mongoose = require("mongoose")
const StockSchema = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'product'
    },
    stock: {
      type: Number,
      default: 0,
    },

  })
  
  // Product Model
  const InStock = mongoose.model("InStock", StockSchema);
  module.exports= InStock

  