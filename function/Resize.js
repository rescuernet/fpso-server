const sharp = require('sharp');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer,fit,width,height,name) {
        let filename = null;
        if(name){
            filename = name;
        }else{
            filename = Resize.filename();
        }
        const filepath = path.resolve(`${this.folder}/`);
        await sharp(buffer)
            .resize(width, height, {
                fit: fit,
            })
            .toFile(`${filepath}/${filename}`)
        fs.unlinkSync(buffer);
        return filename;
    }
    static filename() {
        return `${uuid.v4()}_${Date.now()}.jpg`;
    }
}
module.exports = Resize;