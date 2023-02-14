const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    image: {
        type: String
    },
    cloudId: {
        type: String,
      },
    text: {
        type: String,
        require: [true, "text is required"],
    }

},
{
    timestamps: true
    
})
const comment = mongoose.model('comment', commentSchema)
module.exports = comment;
