const Router = require('express').Router;
const adminNewsController = require('../../controllers/admin/admin-news-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const imgUpload_MD = require('../../middlewares/img-upload-middleware');
const docsUpload_MD = require('../../middlewares/docs-upload-middleware');

const router = new Router();

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/avatar-create`,
    imgUpload_MD.single('files'),
    authMiddleware,
    adminNewsController.news__avatarCreate
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/image-create`,
    imgUpload_MD.single('files'),
    authMiddleware,
    adminNewsController.news__imageCreate
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminNewsController.news__docsCreate
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/create`,
    authMiddleware,
    adminNewsController.news__create
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/update`,
    authMiddleware,
    adminNewsController.news__update
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/news/delete`,
    authMiddleware,
    adminNewsController.news__delete
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/news`,
    authMiddleware,
    adminNewsController.getNews
);


module.exports = adminNewsRouter = router;