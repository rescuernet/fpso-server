const multer = require('multer');
const uuid = require('uuid');


const storage = multer.memoryStorage({
    destination: function(req,file,cb){
        cb(null,'')
    }
})

const limits = {
    fileSize: 10 * 1024 * 1024
}

const docsTypes = [
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

const fileFilter = (req,file,cb) => {
    if(docsTypes.includes(file.mimetype)) {
        cb(null,true)
    }else{
        cb(null,false)
    }
}

module.exports = multer({storage,fileFilter,limits});
