const Router = require('express').Router;
const uiCompController = require('../../controllers/ui/ui-comp-controller');


const router = new Router();


router.get(`/competitions`, uiCompController.getComp);
router.get(`/competitions/view/:id`, uiCompController.getCompId);


module.exports = uiCompRouter = router;