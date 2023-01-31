const express = require("express")
const dotenv = require("dotenv")
dotenv.config({path: "./CONFIG/config.env"})
const user = require ('./ROUTE/Adduser')

const app = express ();
app.use(express.json())

app.use("/api", user)


app.use("/", (req, res) => {
    res.status(200).send("My Api is working fine")
})

module.exports = app