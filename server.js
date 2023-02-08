const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config({path: "./CONFIG/config.env"})
const app = require("./app");
mongoose.set("strictQuery", true)

const Db = process.env.DATABASE
mongoose.connect(Db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log(`Mongoose is connected`)
})

const PORT =  process.env.PORT

app.listen(PORT || 7079,() => {
    console.log(`listening on port`+PORT)
})
