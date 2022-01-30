const Router = require('express').Router;
const adminTeamController = require('../../controllers/admin/admin-team-controller');
const authMiddleware = require('../../middlewares/auth-middleware');
const docsUpload_MD = require("../../middlewares/docs-upload-middleware");
const Const = require("../../const-keys/const");

const router = new Router();

router.get(`${Const.ADMIN_PATH_PREFIX}/team`,
    authMiddleware,
    adminTeamController.team_get
);

router.post(`${Const.ADMIN_PATH_PREFIX}/team/docs-create`,
    docsUpload_MD.single('files'),
    authMiddleware,
    adminTeamController.team_docs_create
);

router.post(`${Const.ADMIN_PATH_PREFIX}/team/save`,
    authMiddleware,
    adminTeamController.team_save
);


module.exports = adminTeamRouter = router;