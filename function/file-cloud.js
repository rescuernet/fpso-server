const path = require("path");
const fs = require('fs');

class FileCloud {

    async Upload (filename) {
        fs.rename(path.resolve('static/tmp/', filename), path.resolve('static/storage/', filename), (err) => {
            if (err) throw err;
        });
    }

    Delete (fileArr) {
        fileArr.map(async (i)=>{
            if(fs.existsSync(path.resolve('static/storage/', i))){
                fs.unlinkSync(path.resolve('static/storage/', i))
            }
            if(fs.existsSync(path.resolve('static/storage/', 'crop_' + i))){
                fs.unlinkSync(path.resolve('static/storage/', 'crop_' + i))
            }
        })
        return 200
    }
}

module.exports = new FileCloud();