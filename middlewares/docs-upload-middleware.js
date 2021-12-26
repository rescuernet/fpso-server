const multer = require('multer');
const uuid = require('uuid');


const storage = multer.memoryStorage({
    destination: function(req,file,cb){
        cb(null,'')
    }
})


module.exports = multer({storage});
