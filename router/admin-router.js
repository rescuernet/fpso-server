const Router = require('express').Router;
const adminController = require('../controllers/admin-controller');
const authMiddleware = require('../middlewares/auth-middleware');
const imgUpload_MD = require('../middlewares/img-upload-middleware');
const docsUpload_MD = require('../middlewares/docs-upload-middleware');

const router = new Router();

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/avatar-create`,
    imgUpload_MD.single('files'),
    authMiddleware,
    adminController.news__avatarCreate
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/image-create`,
    imgUpload_MD.single('files'),
    authMiddleware,
    adminController.news__imageCreate
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminController.news__docsCreate
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/create`,
    authMiddleware,
    adminController.news__create
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/update`,
    authMiddleware,
    adminController.news__update
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/delete`,
    authMiddleware,
    adminController.news__delete
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/news`,
    authMiddleware,
    adminController.getNews
);


module.exports = adminRouter = router;