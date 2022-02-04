const multer = require('multer');
const uuid = require("uuid");

const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'static/tmp/')
    },
    filename(req,file,cb){
        cb(null,uuid.v4() + file.originalname.slice(file.originalname.lastIndexOf(".")))
    }
})

const limits = {
    fileSize: 4 * 1024 * 1024
}

const imgTypes = ['image/png','image/jpeg','image/jpg']

const fileFilter = (req,file,cb) => {
    if(imgTypes.includes(file.mimetype)) {
        cb(null,true)
    }else{
        cb(null,false)
    }
}

module.exports = multer({limits,fileFilter,storage});