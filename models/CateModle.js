const mongoose = require("mongoose");
const cateSchema = new mongoose.Schema ({
   chairs: {
    type: Number,
    required: [true, "chairs is required"],
   },
    beds: {
        type: String,
        required: [true, "beds is required"],
 
    },
    cabinets: {
        type: Number,
        required: [true, "cabinets is required"],
    },
    chests: {
        type: String,
        required: [true,"chests is required"],
        default: 0.0,
    },
    desks: {
        type: String,
        required: [true, "desks is required"],
        default: 0.0,
    },
    tables: {
        type: Array,
        required: [true, "tables is required"],
    },
   },
   
   {
    timestamps: true
   });

   const cates = mongoose.model("cates", cateSchema)
   module.exports = cates;
   