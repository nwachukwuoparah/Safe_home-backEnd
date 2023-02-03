const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
    title: {
        type: String,
        required: [true, "title is required"]
    },
    description: {
        type: String,
        required: [true, "details is required"],
    },
    image:{ 
        type: String,
         required: [true, "image is required"],
      },
    price: {
        type: String,
        required: [true, "price is required"],
    },
     rating:{ 
        type: String,
         required: [true, "rating is required"],
        //  default: 0,
      },
      numReview:{ 
        type: String,
         required: [true, "numReview is required"],
      },
      stockQuantity:{ 
        type: String,
         required: [true, "stockQuantity is required"],
      },
},
{
    timestamps: true
})

const product = mongoose.model('product', productSchema)
module.exports= product

// const mongoose = require('mongoose')

// const reviewSchema =  mongoose.Schema({
//     title: {
//         type: String,
//         required: true,
//     },
//     rating: {
//         type: String,
//         required: true,
//     },
//     comment: {
//         type: String,
//         required: true,
//     },
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "user"
//     },
// })
// const productSchema =  mongoose.Schema(
//     {
//     title: {
//         type: String,
//         required: true,
//     },
//     details: {
//         type: String,
//         required: true,
//     },
//     image:{ 
//         type: String,
//          required: true,
//       },
//     price: {
//         type: String,
//         required: true,
//     },
//     review: [reviewSchema],
//      rating:{ 
//         type: String,
//          required: true,
//          default: 0,
//       },
//       numReview:{ 
//         type: String,
//          required:true ,
//          default: 0,
//       },
//       stockQuantity:{ 
//         type: String,
//          required: true,
//          default:0,
//       },
// },
// {
//     timestamps: true
// })

// const product = mongoose.model('product', productSchema)
// module.exports= product