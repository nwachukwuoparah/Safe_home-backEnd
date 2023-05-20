const AddAdmin = require("../models/user");
const dotenv = require("dotenv");
dotenv.config({ path: "../CONFIG/config.env" });
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mailSender = require("../tils/Emails");
const cloudinary = require("../helper/cloudinary");

exports.AdminSignUp = async (req, res) => {
  try {
    const { name, email, password, brandname } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    const data = {
      name,
      email,
      password: hash,
      brandname,
    };

    const createUser = await AddAdmin(data);

    const { isSuperAdmin, ...others } = createUser._doc;

    createUser.isAdmin = true;
    const myToken = jwt.sign(
      {
        id: createUser._id,
        password: createUser.password,
        IsAdmin: createUser.isAdmin,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );

    createUser.token = myToken;
    const checker = await AddAdmin.findOne({ email });
    if (checker) {
      res.status(400).json({
        message: "Email already taken..",
      });
    } else {
      createUser.save();
      const VerifyLink = `${req.protocol}://safehome.onrender.com/#/verify/${createUser._id}`;
      const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
      mailSender({
        email: createUser.email,
        subject: "Kindly verify",
        message,
      });
      res.status(201).json({
        message: "User created",
        data: others,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email } = req.body;
    const check = await AddAdmin.findOne({ email: email });
    if (!check)
      return res.status(404).json({
        message: "Not a user",
      });
    const isPassword = await bcryptjs.compare(
      req.body.password,
      check.password
    );
    if (!isPassword)
      return res.status(404).json({ message: "Email or password incorrect" });

    const myToken = jwt.sign(
      {
        id: check._id,
        password: check.password,
        IsAdmin: check.isAdmin,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );

    check.token = myToken;
    await check.save();
    const { password, ...others } = check._doc;
    res.status(201).json({
      message: "Successful",
      data: others,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.AdminVerify = async (req, res) => {
  try {
    const adminId = req.params.Id;
    const user = await AddAdmin.findById(adminId);
    await AddAdmin.findByIdAndUpdate(
      user._id,
      {
        verify: true,
      },
      {
        new: true,
      }
    );

    // user.Verify = true,
    // await user.save()

    res.status(200).json({
      message: `thanks ${user.name} for verifying your account`,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.Forgotpassword = async (req, res) => {
  try {
    const { email } = req.body;
    const userEmail = await AddAdmin.findOne({ email });
    if (!userEmail) {
      res.status(404).json({ message: "No Email" });
    } else {
      const myToken = jwt.sign(
        {
          id: userEmail._id,
          IsAdmin: userEmail.isAdmin,
          //isSuperAdmin: createUser.isSuperAdmin
        },
        process.env.JWT_TOKEN,
        { expiresIn: "1m" }
      );

      const VerifyLink = `${req.protocol}://safehome.onrender.com/#/resetpassword/${userEmail._id}`;
      const message = `Use this link ${VerifyLink} to change your password`;
      mailSender({
        email: userEmail.email,
        subject: "Reset Pasword",
        message,
      });

      res.status(202).json({
        message: "email have been sent",
      });

      // console.log(userEmail);
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.passwordchange = async (req, res) => {
  try {
    const { password } = req.body;
    const id = req.params.id;
    const users = await AddAdmin.findById(id);
    const saltPwd = await bcryptjs.genSalt(10);
    const hassPwd = await bcryptjs.hash(password, saltPwd);
    await AddAdmin.findByIdAndUpdate(
      users._id,
      {
        password: hassPwd,
      },
      {
        new: true,
      }
    );
    res.status(200).json({
      message: "Successfully changed...",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.isAdminVerify = async (req, res) => {
  try {
    const userid = req.params.userid;
    const user = await AddAdmin.findById(userid);
    await AddAdmin.findByIdAndUpdate(
      user._id,
      {
        isAdmin: true,
      },
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "isAdmin Confirmed",
    });
  } catch (e) {
    res.status(401).json({
      message: e.message,
    });
  }
};

exports.UpdateUsers = async (req, res) => {
  try {
    const id = req.params.userid;
    const userid = await AddAdmin.findById(id);
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath
    );
    const { name, email, password, brandname } = req.body;
    const newUpdate = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: result.secure_url,
      brandname: req.body.brandname,
      cloudId: result.public_id,
    };
    const Update = await AddAdmin.findByIdAndUpdate(id, newUpdate);
    res.status(201).json({
      message: "update was successful",
      data: Update,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

exports.SuperASignUp = async (req, res) => {
  try {
    const { name, email, password, brandname } = req.body;
    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    const data = {
      name,
      email,
      password: hash,
      brandname,
    };
    const createUser = await AddAdmin(data);

    createUser.verify = true;
    createUser.isSuperAdmin = true;
    const myToken = jwt.sign(
      {
        id: createUser._id,
        password: createUser.password,
        isAdmin: createUser.isAdmin,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );

    const { isAdmin, ...others } = createUser._doc;
    createUser.token = myToken;
    const checker = await AddAdmin.findOne({ email });
    if (checker) {
      res.status(400).json({
        message: "Email already taken..",
      });
    } else {
      createUser.save();
      // const userVerify = `${req.protocol}://${req.get("host")}/api/adminVerify/${createUser._id}`
      // const VerifyLink = `${req.protocol}://safehome.onrender.com/#/verify/${createUser._id}`
      // const message = `Thank you for registering with us. Please click on this link ${VerifyLink} to verify`;
      // mailSender({
      //     email: createUser.email,
      //     subject: "Kindly verify",
      //     message,
      // });
      res.status(201).json({
        message: "User created",
        data: others,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// get all users
exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await AddAdmin.find();
    res.status(200).json({
      message: "All Users" + allUsers.length,
      data: allUsers,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// get only user
exports.getAllAdmin = async (req, res) => {
  try {
    const allAdmin = await AddAdmin.find().where({ isAdmin: true });
    res.status(200).json({
      message: "All Admin" + allAdmin.length,
      data: allAdmin,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// delete all users
exports.DelUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await AddAdmin.deleteOne({ _id: userId });
    res.status(200).json({
      message: "Deleted successfully...",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
