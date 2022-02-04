const multer = require('multer');
const uuid = require('uuid');

const maxSize = 15 * 1024 * 1024;

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'static/tmp/')
    },
    filename(req,file,cb){
        cb(null,uuid.v4() + file.originalname.slice(file.originalname.lastIndexOf(".")))
    }
})

const docsTypes = [
    'application/pdf',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'application/vnd.ms-excel',
    'application/octet-stream',
]

const fileFilter = (req,file,cb) => {
    if(docsTypes.includes(file.mimetype)) {
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const limits = { fileSize: maxSize }

module.exports = multer({limits,fileFilter,storage});
