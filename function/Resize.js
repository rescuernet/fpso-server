const sharp = require('sharp');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }

    async save(file,fit,width,height,name,del) {
        const tmpFile = path.resolve(file.destination,file.filename)
        let filename = null;
        if(name){
            filename = name;
        }else{
            filename = Resize.filename();
        }
        await sharp(tmpFile)
            .rotate()
            .resize(width, height, {
                fit: fit,
                background: { r: 229, g: 229, b: 229, alpha: 1 }
            })
            .toFile(path.resolve('static/storage/',filename))
        if(del){fs.unlinkSync(tmpFile)}
        return filename;
    }
    static filename() {
        return `${uuid.v4()}-${Date.now()}.jpg`;
    }
}
module.exports = Resize;