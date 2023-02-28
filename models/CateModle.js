const mongoose = require("mongoose");
const cateSchema = new mongoose.Schema ({
   categoryName: {
    type: String,
    required: [true, "categoryName is required"],
   },
    products: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
   },
   
   {
    timestamps: true
   });

   const cates = mongoose.model("cates", cateSchema)
   module.exports = cates;
   