const mongoose = require("mongoose");

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        require: [true, "name is required"]
    },
    email: {
        type: String,
        require: [true, "name is required"],
        unique: true
    },
    password: {
        type: String,
        require: [true, "password is require"]
    },
    order: {
        type: String,
        require: [true, "password is require"]
    },
    verify: { 
        type: Boolean,
        default: false
     },

    isAdmin: {  
        type: Boolean,
        default: false
    },

    token: {
        type: String,
    }
 
   },

   {
    timestamps: true,
   });

   const AddUser = mongoose.model("AddUser", userSchema)
   module.exports = AddUser;
