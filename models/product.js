const mongoose = require('mongoose')

const reviewsSchema = mongoose.Schema({
    title:{ 
        type: String,
         required: [true, "title is required"],
      },
      rating:{ 
        type: Number,
         required: [true, "rating is required"],
      },
      comment:{ 
        type: Number,
         required: [true, "comment is required"],
      },
      user:{ 
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "user is required"],
        ref: "user",
      },
})
const productSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: [true, "Fullname is required"]
    },
    details: {
        type: String,
        required: [true, "dec is required"],
    },
    image:{ 
        type: String,
         required: [true, "image is required"],
      },
    reviews:[reviewsSchema],
    price: {
        type: String,
        required: [true, "price is required"],
    },
     rating:{ 
        type: Number,
         required: [true, "image is required"],
         default: 0,
      },
      numReview:{ 
        type: String,
         required: [true, "image is required"],
      },
      stockQuantity:{ 
        type: String,
         required: [true, "image is required"],
      },
      type:{ 
        type: String,
         required: [true, "image is required"],
      },
     cloudId:{ 
        type: String,
         required: [true, "cloudId is required"],
      },

},
{
    timestamps: true
})

const product = mongoose.model('product', productSchema)
module.exports= product