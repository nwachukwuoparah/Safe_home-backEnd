const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema ({
   quantity: {
    type: Number,
    required: [true, "quantity is required"],
   },
    customerAddress: {
        type: String,
        required: [true, "customerAddress is required"],
 
    },
    phoneNumber: {
        type: String,
        required: [true, "phoneNumber is required"],
    },
    customerName: {
        type: String,
        required: [true,"customerName is required"],
        default: 0.0,
    },
    customerEmail: {
        type: String,
        required: [true, "customerEmail is required"],
        default: 0.0,
    },
    delivery: {
        type: Boolean,
        default: false,
    },
    delivered: {
        type: Boolean,
        default: false, 
    },
    product: {
        type: Array,
        required: [true, "product is required"],
    },
   },
   
   {
    timestamps: true
   });

   const order = mongoose.model("order", orderSchema)
   module.exports = order;