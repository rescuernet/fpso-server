const Router = require('express').Router;
const adminAboutUsController = require('../../controllers/admin/admin-about-us-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const docsUpload_MD = require("../../middlewares/docs-upload-middleware");

const router = new Router();

router.get(`${process.env.ADMIN_PATH_PREFIX}/about-us`,
    authMiddleware,
    adminAboutUsController.about_us_get
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/about-us/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminAboutUsController.about_us_docs_create
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/about-us/img-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminAboutUsController.about_us_img_create
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/about-us/save`,
    authMiddleware,
    adminAboutUsController.about_us_save
);

/*


router.get(`${process.env.ADMIN_PATH_PREFIX}/judges-orders/:id`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_id
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/judges-orders/people/get`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_people_get
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/judges-orders/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminJudgesOrdersController.judges_orders_docs_create
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/judges-orders/save`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_save
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/judges-orders`,
    authMiddleware,
    adminJudgesOrdersController.judges_orders_get
);
*/

module.exports = adminAboutUsRouter = router;