const Router = require('express').Router;
const adminCompController = require('../../controllers/admin/admin-comp-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const imgUpload_MD = require('../../middlewares/img-upload-middleware');
const docsUpload_MD = require('../../middlewares/docs-upload-middleware');

const router = new Router();

router.post(`${process.env.ADMIN_PATH_PREFIX}/competitions/create`,
    authMiddleware,
    adminCompController.compCreate
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/competitions/:id`,
    authMiddleware,
    adminCompController.getCompId
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/competitions/avatar-create`,
    imgUpload_MD.single('files'),
    authMiddleware,
    adminCompController.compAvatarCreate
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/competitions/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminCompController.compDocsCreate
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/competitions/update`,
    authMiddleware,
    adminCompController.compUpdate
);



module.exports = adminCompRouter = router;