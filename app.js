require("dotenv").config();
const dotenv = require("dotenv")
const express = require("express")
dotenv.config({path: "./CONFIG/config.env"})
const adminRoute = require('./ROUTE/product');
const user = require ('./ROUTE/UserRoute')
const Auth = require('./ROUTE/Adduser')
const Authen = require("./ROUTE/addAdmin")
const commentRouter= require("./ROUTE/commentRoute")
const importData = require("./Dataimport")
const {errorHandler, notfound} = require("./middleware/errorhand");
const orderRouter = require("./ROUTE/orderRoute")
const stockRouter = require("./ROUTE/InStock")
//const cateRouter = require("./ROUTE/CateRoute")
const router = require("./ROUTE/rating")
 const cors = require("cors")
 const fileUpload = require('express-fileupload');


const app = express ();

app.use( cors ());
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true
}))

app.get("/", (req, res) => {
    res.status(200).send("WELCOME TO SAFE HOME FURNITURE")
})


// app.use(notfound)
app.use(errorHandler)


app.use("/api/import", importData)


app.use('/api', Auth);
app.use("/api", Authen)
app.use('/api', adminRoute);
app.use("/api", user)
app.use("/api", commentRouter)
app.use("/api",orderRouter)
app.use("/api",router)
app.use("/api",stockRouter)
//app.use("/api",cateRouter)


 

module.exports = app
