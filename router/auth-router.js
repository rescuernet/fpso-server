const Router = require('express').Router;
const authController = require('../controllers/auth-controller');
const userValidator = require('../validators/user-validator');
const authMiddleware = require('../middlewares/auth-middleware');

const router = new Router();



router.post('/registration',userValidator,authController.registration);
router.post('/login',userValidator,authController.login);
router.post('/logout',authController.logout);
router.get('/activate/:link',authController.activate);
router.get('/refresh',authController.refresh);
router.get('/users',authMiddleware,authController.getUsers);

module.exports = authRouter = router;