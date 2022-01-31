const Router = require('express').Router;
const adminRusadaController = require('../../controllers/admin/admin-rusada-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const docsUpload_MD = require("../../middlewares/docs-upload-middleware");
const Const = require("../../const-keys/const");

const router = new Router();

router.get(`${Const.ADMIN_PATH_PREFIX}/rusada`,
    authMiddleware,
    adminRusadaController.rusada_get
);

router.post(`${Const.ADMIN_PATH_PREFIX}/rusada/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminRusadaController.rusada_docs_create
);

router.post(`${Const.ADMIN_PATH_PREFIX}/rusada/save`,
    authMiddleware,
    adminRusadaController.rusada_save
);


module.exports = adminRusadaRouter = router;