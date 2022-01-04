const Router = require('express').Router;
const adminOtherController = require('../../controllers/admin/admin-other-controller');
const authMiddleware = require('../../middlewares/auth-middleware');

const router = new Router();


router.post(`${process.env.ADMIN_PATH_PREFIX}/mediadeltmp`,
    authMiddleware,
    adminOtherController.media_del_tmp
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/mediadeltmpblocking`,
    authMiddleware,
    adminOtherController.media_del_tmp_blocking
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/reference-books/update`,
    authMiddleware,
    adminOtherController.referenceBooks__update
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/reference-books`,
    authMiddleware,
    adminOtherController.referenceBooks__get
);


module.exports = adminOtherRouter = router;