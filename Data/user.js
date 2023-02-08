const bcryptjs = require ("bcryptjs");
const users = [
{
    name: "admin",
    email: "destiny@gmail.com,",
    password: bcryptjs.hashSync("123456", 10),
    isAdmin: true
},
{
    name: "user",
    email: "ikeadighim@gmail.com,",
    password: bcryptjs.hashSync("12345", 10)
}

]

module.exports = users;