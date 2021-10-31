const Router = require('express').Router;
const uiNewsController = require('../controllers/ui-news-controller');


const router = new Router();


router.get(`/news`, uiNewsController.getNews);
router.get(`/news/:id`, uiNewsController.getNewsId);


module.exports = uiNewsRouter = router;