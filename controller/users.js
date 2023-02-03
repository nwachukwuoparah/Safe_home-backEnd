const AddUser = require("../models/user");
const dotenv = require("dotenv")
dotenv.config({path: "../CONFIG/config.env"})
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailSender = require("../tils/Emails")


exports.signUpUser = async(req, res) => {
    try{
        const {fullname, email, password} = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            fullname,
            email,
            password: hash,
        }
        const createUser = await AddUser(data)
        const myToken = jwt.sign({id:createUser._id,
             password: createUser.password,
              IsAdmin:createUser.isAdmin},
              process.env.JWTSCRET,{expiresIn: "1d"})
              
            createUser.token = myToken,
            createUser.save()

            const VerifyLink = `${req.protocol}://${req.get("host")}/api/userVerify/${createUser._id}`
            const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
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
            IsAdmin:check.isAdmin},  process.env.JWTSCRET ,{expiresIn: "1d"})

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

exports.UserVerify = async (req, res) => {
    try{    
        const userid = req.params.userid
        const user = await AddUser.findById(userid)
        await AddUser.findByIdAndUpdate(
            user._id,
            {
                verify: true
            },
            {
                new : true
            }
        )

        res.status(200).json({
            message: "you have been verified"
        })

    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}

exports.Forgotpassword = async (req, res) => {
    try{
        const {email} = req.body
        const userEmail = await AddUser.findOne({email})
        if(!userEmail) return  res.status(404).json({ message: "No Email" })
        const myToken = jwt.sign({
            id:userEmail._id,
            IsAdmin:userEmail.isAdmin}, process.env.JWTTOKEN, {expiresIn: "1m"})

        const VerifyLink = `${req.protocol}://${req.get("host")}/api/changepassword/${userEmail._id}/${myToken}`
        const message = `Use this link ${VerifyLink} to change your password`;
        sendEmail({
          email: userEmail.email,
          subject: "Reset Pasword",
          message,
        })
        
        res.status(202).json({
            message:"email have been sent"
        })

        // console.log(userEmail);
    }catch(err){
        res.status(400).json({
            message:err.message
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


exports.Forgotpassword = async (req, res) => {
    try{
        const {email} = req.body
        const userEmail = await AddUser.findOne({email})
        if(!userEmail) return  res.status(404).json({ message: "incorrect email" })
        const myToken = jwt.sign({
            id:userEmail._id,
            IsAdmin:userEmail.isAdmin}, process.env.JWTSCRET, {expiresIn: "1m"})
            superAdmin: checkEmail.superAdmin

        const VerifyLink = `${req.protocol}://${req.get("host")}/api/changepassword/${userEmail._id}/${myToken}`
        const message = `Use this link ${VerifyLink} to change your password`;
        sendEmail({
          email: userEmail.email,
          subject: "Reset Pasword",
          message,
        })
        
        res.status(202).json({
            message:"email have been sent"
        })

        // console.log(userEmail);
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
}


exports.forgotPassWrd = async(req,res)=>{
    try{
        const { email } = req.body;
        const checkEmail = await modelName.findOne({email});
        if(!checkEmail){
            res.status(404).json({
                message: "Sorry email is not correct.."
            })
        }else{
            const genToken = jwt.sign({
                id: checkEmail._id,
                isAdmin: checkEmail.isAdmin,
                superAdmin: checkEmail.superAdmin
            }, process.env.JWTSCRET, {expiresIn: "5m"});
            const verifyUser = `${req.protocol}://${req.get("host")}/api/changePaswrd/${checkEmail._id}/${genToken}`;
            const message = `Use this link ${verifyUser} to change your password `;
            mailSender({
            email: checkEmail.email,
            subject: "Change of password",
            message
        });
        res.status(200).json({
            message: "A link has been sent to your email please check.."
        })
        }
    }catch(err){
        res.status(400).json({
            message: err.message
        })
    }
};


exports.passwordchange= async(req,res)=>{
    try {
        const {password} = req.body;
        const userId = req.params.userId;
        const saltPwd = await bcrypt.genSalt(10);
        const hassPwd = await bcrypt.hash(password, saltPwd);
        const users = await modelName.findById(userId);
        await modelName.findByIdAndUpdate(users._id,{
            password: hassPwd
        },
        {
            new: true
        } )
        res.send("Successfully changed...")
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};
