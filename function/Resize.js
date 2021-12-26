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
        await sharp(buffer)
            .rotate()
            .resize(width, height, {
                fit: fit,
            })
            .toFile('./static/tmp/' + filename)
        return filename;
    }
    static filename() {
        return `${uuid.v4()}-${Date.now()}.jpg`;
    }
}
module.exports = Resize;