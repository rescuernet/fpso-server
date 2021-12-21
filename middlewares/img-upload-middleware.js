const multer = require('multer');
const uuid = require('uuid');
const fs = require('fs')


const storage = multer.diskStorage({
    destination(req,file,cb){
        cb(null,'static/tmp/')
    },
    filename(req,file,cb){
        cb(null,'tmp__' + uuid.v4() + '-' + file.originalname)
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

module.exports = multer({storage,fileFilter,limits});