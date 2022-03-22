const cloudinary = require('cloudinary').v2
const multer = require('multer')
const {CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary,
    params: (req, file) =>{
        return {
            folder: 'travelfy',
            allowedFormats: ['png', 'jpg', 'jpeg'],
            fileFilter: function(req, file, cb){
                if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
                    return cb(new Error('Archivo no válido'))
                }
                cb(null, file.originalname)
            },
            public_id: file.originalname.split('.')[0] + '-' + Date.now() // Random string to prevent duplicate file names
        }
    }
})

const uploadCloud = multer({storage})

module.exports = uploadCloud