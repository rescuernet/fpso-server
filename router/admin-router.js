const Router = require('express').Router;
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();


router.post(`${process.env.ADMIN_PATH_PREFIX}/news/create`,authMiddleware,adminController.news__create);

module.exports = adminRouter = router;