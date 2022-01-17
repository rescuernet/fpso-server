const Router = require('express').Router;
const adminJudgesOrdersController = require('../../controllers/admin/admin-judges-orders-controller');
const authMiddleware = require('../../middlewares/auth-middleware');

const router = new Router();

router.post(`${process.env.ADMIN_PATH_PREFIX}/judges-orders/create`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_create
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/judges-orders/:id`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_id
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/judges-orders/people/get`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_people_get
);

module.exports = adminJudgesRouter = router;