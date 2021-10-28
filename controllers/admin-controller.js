const adminService = require('../service/admin-service');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

const Resize = require("../function/Resize");


class adminController {

    async news__avatarCreate(req, res, next) {
        try {
            const imagePath = './static/tmp';
            const fileUpload = new Resize(imagePath);
            if (!req.file) {
                return res.status(401).json({error: 'Please provide an image'});
            }
            const filename = await fileUpload.save(req.file.path,'cover',200,200,null,true);
            return res.status(200).json({ name: filename });
        } catch (e) {
            next(e);
        }
    }

    async news__imageCreate(req, res, next) {
        try {
            const imagePath = './static/tmp';
            const fileUpload = new Resize(imagePath);
            if (!req.file) {
                return res.status(401).json({error: 'Please provide an image'});
            }
            const filename = await fileUpload.save(req.file.path,'inside',1000,1000,null,false);
            await fileUpload.save(req.file.path,'cover',120,120,'crop_' + filename,true);
            return res.status(200).json({ name: filename });
        } catch (e) {
            next(e);
        }
    }

    async news__docsCreate(req, res, next) {
        return res.json({doc: req.file.filename});
    }

    async news__create(req, res, next) {
        try {
            const newsData = await adminService.news__create(req.body);
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

    async news__update(req, res, next) {
        try {
            const newsData = await adminService.news__update(req.body);
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

    async news__delete(req, res, next) {
        try {
            const newsData = await adminService.news__delete(req.body.id);
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

    async getNews(req, res, next) {
        try {
            const newsData = await adminService.getNews();
            return res.json(newsData);
        } catch (e) {
            next(e);
        }
    }

    /*async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest(errors.array()[0].msg, errors.array()));
            }
            const {email,password} = req.body;
            const userData = await authService.login(email,password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await authService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await authService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await authService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next) {
        try {
            const users = await authService.getAllUsers();
            console.log(users)
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }*/
}

module.exports = new adminController();