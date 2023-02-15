const AddAdmin = require("../models/user");
const dotenv = require("dotenv")
dotenv.config({ path: "../CONFIG/config.env" })
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const mailSender = require("../tils/Emails")


exports.AdminSignUp = async (req, res) => {
    try {
        const { name, email, password, brandname } = req.body
        const salt = bcryptjs.genSaltSync(10);
        const hash = bcryptjs.hashSync(password, salt);

        const data = {
            name,
            email,
            password: hash,
            brandname,
        }
        const createUser = await AddAdmin(data)
        createUser.isAdmin = true;
        const myToken = jwt.sign({
            id: createUser._id,
            password: createUser.password,
            isAdmin: createUser.isAdmin
        },
            process.env.JWT_TOKEN, { expiresIn: "1d" })

        createUser.token = myToken
        const checker = await AddAdmin.findOne({ email });
        if (checker) {
            res.status(400).json({
                message: "Email already taken.."
            })
        } else {
            createUser.save()
            // const userVerify = `${req.protocol}://${req.get("host")}/api/adminVerify/${createUser._id}`
            const VerifyLink = `${req.protocol}://safehome.onrender.com/#/verify/${createUser._id}`
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
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}

exports.Adminlogin = async (req, res) => {
    try {
        const { email } = req.body;
        const check = await AddAdmin.findOne({ email: email })
        if (!check) return res.status(404).json({
            message: "Not a user"
        })
        const isPassword = await bcryptjs.compare(req.body.password, check.password)
        if (!isPassword) return res.status(404).json({ message: "Email or password incorrect" })

        const myToken = jwt.sign({
            id: check._id,
            password: check.password,
            IsAdmin: check.isAdmin
        }, process.env.JWT_TOKEN, { expiresIn: "1d" })

        check.token = myToken
        await check.save()
        const { password, ...others } = check._doc
        res.status(201).json({
            message: "Successful",
            data: others
        })
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.AdminVerify = async (req, res) => {
    try {
        const adminId = req.params.Id
        const user = await AddAdmin.findById(adminId)
        await AddAdmin.findByIdAndUpdate(
            user._id,
            {
                verify: true
            },
            {
                new: true
            }
        )
        
        // user.Verify = true,
        // await user.save()

        res.status(200).json({
            message: "you have been verified"
        })

    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}

exports.Forgotpassword = async (req, res) => {
    try {
        const { email } = req.body
        const userEmail = await AddAdmin.findOne({ email })
        if (!userEmail){ 
             res.status(404).json({ message: "No Email" })
    }else{
        const myToken = jwt.sign({
            id: userEmail._id,
            IsAdmin: userEmail.isAdmin
        }, process.env.JWT_TOKEN, { expiresIn: "1m" })

        const VerifyLink = `${req.protocol}://safehome.onrender.com/#/resetpassword/${userEmail._id}`
        const message = `Use this link ${VerifyLink} to change your password`;
        mailSender({
            email: userEmail.email,
            subject: "Reset Pasword",
            message,
        })

        res.status(202).json({
            message: "email have been sent"
        })

        // console.log(userEmail);
    }
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
}


exports.passwordchange = async (req, res) => {
    try {
        const { password } = req.body;
        const id = req.params.id;
        const users = await AddAdmin.findById(id);
        const saltPwd = await bcryptjs.genSalt(10);
        const hassPwd = await bcryptjs.hash(password, saltPwd);
        await AddAdmin.findByIdAndUpdate(users._id, {
            password: hassPwd
        },
            {
                new: true
            })
        res.status(200).json({
            message: "Successfully changed..."
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        })
    }
};

exports.isAdminVerify = async (req, res) => {
    try {
        const userid = req.params.userid
        const user = await AddAdmin.findById(userid)
        await AddAdmin.findByIdAndUpdate(
            user._id,
            {
                isAdmin: true
            },
            {
                new: true
            }
        )

        res.status(200).json({
            message: "isAdmin Confirmed"
        })
    } catch (e) {
        res.status(401).json({
            message: e.message
        })
    }
}

exports.UpdateUsers = async (req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
        const id = req.params.id;
        const Id = await AddAdmin.findById(id)
        const newUpdate = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            image: result.secure_url,
            cloudId: result.public_id,
        }
        const Update = await Addfurni.findByIdAndUpdate(Id, newUpdate);
        res.status(201).json({
            message: "update was successful",
            data: Update
        });
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
}


