require("dotenv").config();
const dotenv = require("dotenv")
const express = require("express")
dotenv.config({path: "./CONFIG/config.env"})
const adminRoute = require('./ROUTE/adminrotue');
const user = require ('./ROUTE/UserRoute')
const Auth = require('./ROUTE/Adduser')
const Authen = require("./ROUTE/addAdmin")
const importData = require("./Dataimport")
const {errorHandler, notfound} = require("./middleware/errorhand");
 const orderRouter= require("./controller/orderpro");
 const cors = require("cors")
 const fileUpload = require('express-fileupload');


const app = express ();

app.use( cors ());
app.use(express.json());
app.use(fileUpload({
    useTempFiles:true
}))


app.use("/api/import", importData)


app.use('/api', Auth);
app.use("/api", Authen)
app.use('/api', adminRoute);
app.use("/api", user)

app.use("/api/orders",orderRouter)
// Router.route("/import", importData )

app.use(notfound)
app.use(errorHandler)

app.use("/", (req, res) => {
    res.status(200).send("My Api is working fine")
})

module.exports = app
