const jwt = require('jsonwebtoken');
const tokenModel = require('../models/token-model')
const Const = require("../const-keys/const");

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload,Const.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload,Const.JWT_REFRESH_SECRET, {expiresIn: '1d'});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            return jwt.verify(token, Const.JWT_ACCESS_SECRET);
        } catch (e) {
            return null;
        }
    }

    validateRefreshToken(token) {
        try {
            return jwt.verify(token, Const.JWT_REFRESH_SECRET);
        } catch (e) {
            return null;
        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await tokenModel.findOne({user: userId})
        if (tokenData) {
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await tokenModel.create({user: userId, refreshToken});
    }

    async removeToken(refreshToken) {
        return tokenModel.deleteOne({refreshToken});
    }

    async findToken(refreshToken) {
        return tokenModel.findOne({refreshToken});
    }
}


module.exports = new TokenService();