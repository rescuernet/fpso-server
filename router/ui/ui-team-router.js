const Router = require('express').Router;
const uiTeamController = require('../../controllers/ui/ui-team-controller');


const router = new Router();


router.get(`/team`, uiTeamController.team_get);



module.exports = uiTeamRouter = router;