require("dotenv").config();
const User = require('../models/user')
const jwt = require('jsonwebtoken');
 const dotenv = require('dotenv');
const { json } = require("express");
 dotenv.config({path: './CONFIG/config.env'})

const isSignIn = async (req, res, next) => {
       const adminId = req.params.adminId;
       const user = await User.findById(adminId);
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
            jwt.verify(authToken, process.env.JWT_TOKEN, (err, payload)=>{
                if(err){
                    return err.message
                }else{
                    req.user = payload;
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

const IsSuperAdminAuth = (req, res, next)=>{
    isSignIn(req, res, ()=>{
        // console.log("lookig", req.user);
        if(req.user.isSuperAdminAuth){
            next()
        }else{
            res.status(404).json({message: "You are not a superAdmin"})
        }
    })
}

// const authMiddleware = async(req, res, next) =>{
//     const authHeader = req.headers.authorization;
//     if(!authHeader){
//         return res.json({
//             message: "Missing authorization token"
//         })
//     }
//     const token = authHeader.split(" ")[1];
//     try{
//         const decodeToken = jwt.verify(token, process.env.JWT_TOKEN);
//         req.user = JSON.stringify(decodeToken);
//         req.userRole = decodeToken.role;
//         req.userId = decodeToken.id;

//         next();
//     }catch(error){
//         return res.json({
//             message: error.message
//         })
//     }
// }

// // for admin
// const adminMiddleware = (req, res, next) =>{
//     if(req.userRole !== "admin"){
//         return res.status(402).json({
//             message: "You are not an admin"
//         })
//     }
// }

// const superadminMiddleware = (req, res, next) =>{
//     if(req.userRole !== "superadmin"){
//         return res.status(402).json({
//             message: "You are not a superadmin"
//         })
//     }
// }

module.exports = {
    IsAdminAuth,  
    // authMiddleware,
    // adminMiddleware,
    // superadminMiddleware,
}

