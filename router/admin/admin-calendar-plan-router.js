const Router = require('express').Router;
const adminCalendarPlanController = require('../../controllers/admin/admin-calendar-plan-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const docsUpload_MD = require("../../middlewares/docs-upload-middleware");
const Const = require("../../const-keys/const");

const router = new Router();

router.get(`${Const.ADMIN_PATH_PREFIX}/calendar-plan`,
    authMiddleware,
    adminCalendarPlanController.calendar_plan_get
);

router.post(`${Const.ADMIN_PATH_PREFIX}/calendar-plan/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminCalendarPlanController.calendar_plan_docs_create
);

router.post(`${Const.ADMIN_PATH_PREFIX}/calendar-plan/save`,
    authMiddleware,
    adminCalendarPlanController.calendar_plan_save
);


module.exports = adminCalendarPlanRouter = router;