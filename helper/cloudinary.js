const cloudinary = require( 'cloudinary' ).v2

cloudinary.config({
  cloud_name: 'dcjhdnm3y',
  api_key:'298829313587928',
  api_secret:'knmhs9UqyoPclmCRiCC8DdOvwe4',
  secure: true
})
  


module.exports = cloudinary;