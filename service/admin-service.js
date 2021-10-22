const NewsModel = require('../models/admin/news/news-model.js');
const fs = require("fs");


class adminService {
    async news__create(arr) {
        const err = [];
        if (!arr.avatar
            || arr.dateStart === ''
            || arr.headerFirst === ''
            || arr.headerFirst.length < 4
            || arr.textMain === ''
            || arr.textMain.length < 5) {
            err.push(`Проверьте обязательные поля!Аватар (обязательно), Заголовок (не менее 4-х символов), Текст новости (не менее 5-ти символов)`)
            return {error: err}
        }
        const candidate = await NewsModel.findOne({headerFirst: arr.headerFirst});
        if (candidate) {
            err.push('Новость с таким заголовком уже существует')
            return {error: err}
        }
        const news = await NewsModel.create(arr);
        const newsId = news._id;
        const dir = `static/news/${newsId}`;
        try {
            try {fs.mkdirSync(dir, {recursive: true})} catch (e) {err.push('не создалась директория новости');throw e}
            try {fs.mkdirSync(dir + '/avatar', {recursive: true})} catch (e) {err.push('не создалась директория avatar');throw e}
            try {fs.mkdirSync(dir + '/images', {recursive: true})} catch (e) {err.push('не создалась директория images');throw e}
            try {fs.copyFileSync(`static/tmp/${arr.avatar}`, `${dir}/avatar/${arr.avatar}`)} catch (e) {err.push('не скопировался аватар');throw e}
            const images = arr.images;
            images.map((i) => {
                try {
                    fs.copyFileSync(`static/tmp/${i}`, `${dir}/images/${i}`)
                } catch (e) {
                    err.push('не скопировалась фотография');
                    throw e
                }
                try {
                    fs.copyFileSync(`static/tmp/crop_${i}`, `${dir}/images/crop_${i}`)
                } catch (e) {
                    err.push('не скопировалась фотография');
                    throw e
                }
            })
            fs.unlinkSync(`static/tmp/${arr.avatar}`)
            images.map((i) => {
                fs.unlinkSync(`static/tmp/${i}`)
                fs.unlinkSync(`static/tmp/crop_${i}`)
            })
        } catch (e) {
            fs.rmdirSync(dir, {recursive: true})
            await NewsModel.findByIdAndDelete(newsId)
            return {error: err}
        }
        return news
    }

    async news__update(arr) {
        const err = [];
        if ((!arr.model.avatar)
            || arr.model.dateStart === ''
            || arr.model.headerFirst === ''
            || arr.model.headerFirst.length < 4
            || arr.model.textMain === ''
            || arr.model.textMain.length < 5) {
            err.push(`Проверьте обязательные поля!Аватар (обязательно), Заголовок (не менее 4-х символов), Текст новости (не менее 5-ти символов)`)
            return {error: err}
        }

        try {
            const news = await NewsModel.findOneAndUpdate({_id: arr.id}, arr.model);

            //копирование нового аватара и удаление старого
            if (arr.avatarNew) {
                try {fs.copyFileSync(`static/tmp/${arr.avatarNew}`, `static/news/${arr.id}/avatar/${arr.avatarNew}`)} catch (e) {err.push('не скопировался аватар');throw e}
                try {fs.unlinkSync(`static/news/${arr.id}/avatar/${arr.avatarOld}`)} catch (e) {err.push('не удалился старый аватар');throw e}
                try {fs.unlinkSync(`static/tmp/${arr.avatarNew}`)} catch (e) {err.push('не удалился аватар из TMP');throw e}
            }
            const dirImg = `static/news/${arr.id}/images`
            //удаление ненужных фотографий из папки с новостью
            const filesOld = fs.readdirSync(dirImg);
            const imagesOld = arr.imagesOld;
            filesOld.map((ii) => {
                if (!imagesOld.includes(ii)) {
                    if (!imagesOld.includes(ii.substr(5))) {
                        try {fs.unlinkSync(`${dirImg}/${ii}`)} catch (e) {err.push('не удалилась старая фотография');throw e}
                    }
                }
            })

            //копирование новых фотографий
            const imagesNew = arr.imagesNew;
            if(imagesNew){
                imagesNew.map((i) => {
                    try {fs.copyFileSync(`static/tmp/${i}`, `${dirImg}/${i}`)} catch (e) {err.push('не скопировалась фотография');throw e}
                    try {fs.copyFileSync(`static/tmp/crop_${i}`, `${dirImg}/crop_${i}`)} catch (e) {err.push('не скопировалась фотография crop');throw e}
                })
            }

            //удаление новых фотографий из TMP
            if(imagesNew){
                imagesNew.map((i) => {
                    try {fs.unlinkSync(`static/tmp/${i}`)} catch (e) {err.push('не удалилась фотография из TMP');throw e}
                    try {fs.unlinkSync(`static/tmp/crop_${i}`)} catch (e) {err.push('не удалилась фотография crop из TMP');throw e}
                })
            }

            return news;
        } catch (e) {
            return {error: err}
        }
    }

    async getNews() {
        const news = await NewsModel.find({}).sort({dateCreated: -1}).exec();
        return news
    }


    /*async activate(activationLink) {
        const user = await UserModel.findOne({activationLink});
        if (!user) {
            throw ApiError.BadRequest('Не коррекктная ссылка активации');
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Не верные авторизационные данные');
        }
        const isPassEquals = await bcrypt.compare(password,user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Не верные авторизационные данные');
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }


    async logout(refreshToken) {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnathorizedError();
        }
        const userData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDB = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnathorizedError();
        }
        const user = await UserModel.findById(userData.id);
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, user: userDto}
    }
    async getAllUsers() {
        const users = await UserModel.find();
        return users;
    }*/
}


module.exports = new adminService();