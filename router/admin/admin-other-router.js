const Router = require('express').Router;
const adminOtherController = require('../../controllers/admin/admin-other-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const Const = require("../../const-keys/const");

const router = new Router();


router.post(`${Const.ADMIN_PATH_PREFIX}/mediadeltmp`,
    authMiddleware,
    adminOtherController.media_del_tmp
);

router.post(`${Const.ADMIN_PATH_PREFIX}/mediadeltmpblocking`,
    authMiddleware,
    adminOtherController.media_del_tmp_blocking
);

module.exports = adminOtherRouter = router;