const Router = require('express').Router;
const uiJudgesController = require('../../controllers/ui/ui-judges-controller');


const router = new Router();


router.get(`/judges-orders`, uiJudgesController.judges_orders_get);



module.exports = uiJudgesRouter = router;