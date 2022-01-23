const multer = require('multer');


const maxSize = 4 * 1024 * 1024;

const storage = multer.memoryStorage({
    destination: function(req,file,cb){
        cb(null,'')
    }
})

const limits = { fileSize: maxSize }

module.exports = multer({storage,limits});