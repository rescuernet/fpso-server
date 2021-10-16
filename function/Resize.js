const sharp = require('sharp');
const uuid = require('uuid');
const path = require('path');

class Resize {
    constructor(folder) {
        this.folder = folder;
    }
    async save(buffer,w,h,name) {
        let filename = null;
        if(name){
            filename = name;
        }else{
            filename = Resize.filename();
        }
        const filepath = path.resolve(`${this.folder}/`);
        await sharp(buffer)
            .resize(w, h, {
                /*fit: sharp.fit.inside,*/
                fit: sharp.fit.cover
            })
            .toFile(`${filepath}/${filename}`)
        return filename;
    }
    static filename() {
        return `${uuid.v4()}_${Date.now()}.jpg`;
    }
}
module.exports = Resize;