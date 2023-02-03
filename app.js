require("dotenv").config();
const dotenv = require("dotenv")
const express = require("express")
dotenv.config({path: "./CONFIG/config.env"})
const adminRoute = require('./ROUTE/adminrotue');
const user = require ('./ROUTE/UserRoute')
const Auth = require('./ROUTE/AddUser')
const importData = require("./Dataimport")
const app = express ();
const {errorHandler, notfound} = require("./middleware/errorhand");
 const orderRouter= require("./controller/orderpro");

app.use(express.json())


app.use("/api/import", importData)


app.use('/api', Auth);
app.use('/api', adminRoute);
app.use("/api", user)
app.use("/api/orders",orderRouter)
// Router.route("/import", importData )

app.use(notfound)
app.use(errorHandler)

// app.use("/", (req, res) => {
//     res.status(200).send("My Api is working fine")
// })

module.exports = app
