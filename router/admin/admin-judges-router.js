const Router = require('express').Router;
const adminJudgesOrdersController = require('../../controllers/admin/admin-judges-orders-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const docsUpload_MD = require("../../middlewares/docs-upload-middleware");
const Const = require("../../const-keys/const");

const router = new Router();

router.post(`${Const.ADMIN_PATH_PREFIX}/judges-orders/create`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_create
);

router.get(`${Const.ADMIN_PATH_PREFIX}/judges-orders/:id`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_id
);

router.get(`${Const.ADMIN_PATH_PREFIX}/judges-orders/people/get`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_people_get
);

router.post(`${Const.ADMIN_PATH_PREFIX}/judges-orders/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminJudgesOrdersController.judges_orders_docs_create
);

router.post(`${Const.ADMIN_PATH_PREFIX}/judges-orders/save`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_save
);

router.post(`${Const.ADMIN_PATH_PREFIX}/judges-orders/delete`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_delete
);

router.get(`${Const.ADMIN_PATH_PREFIX}/judges-orders`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_get
);

module.exports = adminJudgesRouter = router;