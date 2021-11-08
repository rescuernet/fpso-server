const Router = require('express').Router;
const adminCompController = require('../../controllers/admin/admin-comp-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const imgUpload_MD = require('../../middlewares/img-upload-middleware');
const docsUpload_MD = require('../../middlewares/docs-upload-middleware');

const router = new Router();

router.post(`${process.env.ADMIN_PATH_PREFIX}/competitions/avatar-create`,
    imgUpload_MD.single('files'),
    authMiddleware,
    adminCompController.comp__avatarCreate
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/competitions/image-create`,
    imgUpload_MD.single('files'),
    authMiddleware,
    adminCompController.comp__imageCreate
);
/*
router.post(`${process.env.ADMIN_PATH_PREFIX}/news/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminCompController.news__docsCreate
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/create`,
    authMiddleware,
    adminCompController.news__create
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/update`,
    authMiddleware,
    adminCompController.news__update
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/delete`,
    authMiddleware,
    adminCompController.news__delete
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/news`,
    authMiddleware,
    adminCompController.getNews
);*/


module.exports = adminCompRouter = router;