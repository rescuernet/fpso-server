const Router = require('express').Router;
const uiController = require('../controllers/ui-controller');


const router = new Router();


router.get(`/news`, uiController.getNews
);


module.exports = uiRouter = router;