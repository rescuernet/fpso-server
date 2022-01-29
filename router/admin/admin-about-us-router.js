const Router = require('express').Router;
const adminAboutUsController = require('../../controllers/admin/admin-about-us-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const docsUpload_MD = require("../../middlewares/docs-upload-middleware");
const Const = require("../../const-keys/const");

const router = new Router();

router.get(`${Const.ADMIN_PATH_PREFIX}/about-us`,
    authMiddleware,
    adminAboutUsController.about_us_get
);

router.post(`${Const.ADMIN_PATH_PREFIX}/about-us/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminAboutUsController.about_us_docs_create
);

router.post(`${Const.ADMIN_PATH_PREFIX}/about-us/img-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminAboutUsController.about_us_img_create
);

router.post(`${Const.ADMIN_PATH_PREFIX}/about-us/save`,
    authMiddleware,
    adminAboutUsController.about_us_save
);

module.exports = adminAboutUsRouter = router;