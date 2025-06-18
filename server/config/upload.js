const multer = require('multer')
const path = require('path')

// Storage config

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})

// Filter to accept only images



const upload = multer({
    storage : storage 
})


module.exports = upload