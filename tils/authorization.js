require("dotenv").config();
const User = require('../models/user')
const jwt = require('jsonwebtoken');
 const dotenv = require('dotenv')
 dotenv.config({path: './CONFIG/config.env'})

const isSignIn = async (req, res, next) => {
       const userId = req.params.userId;
       const user = await User.findById(userId);
       if(!user){
        res.status(404).json({
            message: "You are not authorized.."
        })
       }else{
        const authToken = user.token;
        if(!authToken){
            res.status(404).json({
                message: "You are not authorized to use.."
            })
        }else{
            jwt.verify(authToken, process.env.JWT_TOKEN, (err, payLoad)=>{
                if(err){
                    return err.message
                }else{
                    req.user = payLoad;
                    next()
                }
            })
        }
       }
};

const IsAdminAuth = (req, res, next)=>{
    isSignIn(req, res, ()=>{
        // console.log("lookig", req.user);
        if(req.user.IsAdmin){
            next()
        }else{
            res.status(404).json({message: "You are not an admin"})
        }
    })
}

module.exports = {IsAdminAuth}

