const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    image: {
        type: String
    },
    cloudId: {
        type: String,
      },
    text: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "text is required"],
    }

},
{
    timestamps: true
    
})
const comment = mongoose.model('comment', commentSchema)
module.exports = comment;
