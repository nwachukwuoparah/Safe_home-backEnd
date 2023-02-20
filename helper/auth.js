require("dotenv").config();
const modelName = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
 dotenv.config({path: './CONFIG/config.env'})

exports.checkUser = async(req,res,next)=>{
    try {
        const userId = req.params.userId;
        const user = await modelName.findById(userId);
        const authToken = user.token;
        if(!authToken){
            res.status(400).json({
                message: "Not authorized.."
            })
        }else{
            jwt.verify(authToken,JWT_TOKEN, (err, payLoad)=>{
                if(err){
                    res.status(400).json({
                        message: err.message
                    })
                }else{
                    req.user = payLoad;
                    next();
                }
            } )
        }
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.isAdmin = (req,res,next)=>{
    checkUser(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            res.status(400).json({
                message: "you are not authorized"
            })
        }
    })
};

exports.SuperAdmin= (req,res,next)=>{
    checkUser(req,res,()=>{
        if(req.user.isSuperAdmin){
            next()
        }else{
            res.status(400).json({
                message: "you are not authorized"
            })
        }
    })
};

exports.isUser = (req,res,next)=>{
    checkUser(req,res,()=>{
        if(!req.user.isAdmin){
            next()
        }else{
            res.status(400).json({
                message: "sorry you are not authorized"
            })
        }
    })
};



module.exports = isAdmin;