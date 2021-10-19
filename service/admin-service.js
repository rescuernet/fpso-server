const NewsModel = require('../models/admin/news/news-model.js');
const fs = require("fs");


class adminService {
    async news__create(arr) {
        const candidate = await NewsModel.findOne({headerFirst:arr.headerFirst});
        if (candidate) {
            return {errors:"Новость с таким заголовком уже существует"}
        }
        const news = await NewsModel.create(arr);
        const newsId = news._id;
        const dir = `static/news/${newsId}`
        const errors = [];
        try {
            console.log(errors.length)
            fs.mkdirSync(dir)
            fs.copyFileSync(`static/tmp/${arr.avatar}`, `${dir}/${arr.avatar}`,(err)=>{if(err) throw err})
            const images = arr.images;
            images.map((i)=>{
                fs.copyFile(`static/tmpa/${i}`, `${dir}/${i}`,(err)=>{if(err) errors.push('errors copy file')})
                fs.copyFile(`static/tmp/crop_${i}`, `${dir}/crop_${i}`,(err)=>{if(err) throw err})
            })
            console.log(errors.length)
        } catch (e) {
            return {errors:"ошибка сервера" + e}
        }



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