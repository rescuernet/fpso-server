const Router = require('express').Router;
const authController = require('../controllers/auth-controller');
const userValidator = require('../validators/user-validator');

const router = new Router();

router.post('/registration',userValidator,authController.registration);
router.post(process.env.LOGIN_PATH_PREFIX,userValidator,authController.login);
router.post('/logout',authController.logout);
router.get('/activate/:link',authController.activate);
router.get('/refresh',authController.refresh);

module.exports = authRouter = router;