const Router = require('express').Router;
const uiAboutUsController = require('../../controllers/ui/ui-about-us-controller');


const router = new Router();


router.get(`/about-us`, uiAboutUsController.about_us_get);



module.exports = uiAboutUsRouter = router;