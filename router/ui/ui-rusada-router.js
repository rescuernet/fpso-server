const Router = require('express').Router;
const uiRusadaController = require('../../controllers/ui/ui-rusada-controller');


const router = new Router();


router.get(`/rusada`, uiRusadaController.rusada_get);



module.exports = uiRusadaRouter = router;