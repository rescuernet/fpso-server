const Router = require('express').Router;
const uiNewsController = require('../../controllers/ui/ui-news-controller');


const router = new Router();


router.get(`/news`, uiNewsController.getNews);
router.get(`/news/view/:id`, uiNewsController.getNewsId);


module.exports = uiNewsRouter = router;