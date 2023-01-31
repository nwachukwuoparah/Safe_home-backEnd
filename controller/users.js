const AddUser = require("../models/user");
const dotenv = require("dotenv")
dotenv.config({path: "./CONFIG/config.env"})
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailSender = require("../tils/Emails")

exports.signUpUser = async(req, res) => {
    try{
        const {name, email, password} = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);
        // console.log(process.env.JWTTOKEN);
        const data = {
            name,
            email,
            password: hash,
        }
        const createUser = await AddUser(data)
        const myToken = jwt.sign({id:createUser._id,
             password: createUser.password,
              IsAdmin:createUser.isAdmin}, 
              "mysecret", {expiresIn: "1d"})

            createUser.token = myToken,
            createUser.save()

            const VerifyLink = `${req.protocol}://${req.get("host")}/api/userVerify/${createUser._id}`
            const message = `Thank you for registering with us. please click on this link${VerifyLink}to verify`
            mailSender({
                email: createUser.email,
                subject: "Kindly verify",
                message,
                });
    
            res.status(201).json({
                message: "User created",
                data: createUser
             });


      } catch(err) {
            res.status(400).json({
            message: err.message
        });
    }
}


exports.login = async (req, res) => {
    try{
        const {email,password} = req.body;
        const check = await AddUser.findOne({email:email})
        if(!check) return res.status(404).json({
            message: "Not found"
        })
        const isPassword = await bcryptjs.compare(password, check.password)
        if(!isPassword) return res.status(404).json({message: "Email or password incorrect"})

        const myToken = jwt.sign({
            id:check._id,
            password: check.password,
            IsAdmin:check.isAdmin},  "mysecret",{expiresIn: "1d"})

            check.token = myToken 
            await check.save()
            res.status(201).json({
            message:"Successful",
            data:check
         })
    } catch(err) {
        res.status(400).json({
            message: err.message
        })
    }
}



exports.verifyUser = async(req,res)=>{
    try {
        const userId = req.params.userId;
        const user = await modelName.findById(userId);
        await modelName.findByIdAndUpdate(user._id, {
            verify: true
        },{
            new: true
        });
        res.status(200).json({
            message: "U have been verified.."
        })
    } catch (error) {
        res.status(400).json({
            message: err.message
        })
    }
};
