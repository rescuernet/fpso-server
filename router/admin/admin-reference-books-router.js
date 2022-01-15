const Router = require('express').Router;
const authMiddleware = require('../../middlewares/auth-middleware');
const adminReferenceBooksController = require('../../controllers/admin/admin-reference-books-controller')
const imgUpload_MD = require("../../middlewares/img-upload-middleware");
const adminCompController = require("../../controllers/admin/admin-comp-controller");


const router = new Router();

router.post(`${process.env.ADMIN_PATH_PREFIX}/reference-books/pools/create`,
    authMiddleware,
    adminReferenceBooksController.pools_create
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/reference-books/pools/edit/:id`,
    authMiddleware,
    adminReferenceBooksController.pools_id
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/reference-books/pools/save`,
    authMiddleware,
    adminReferenceBooksController.pools_save
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/reference-books/pools/get`,
    authMiddleware,
    adminReferenceBooksController.pools_get
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/reference-books/people/create`,
    authMiddleware,
    adminReferenceBooksController.people_create
);

router.get(`${process.env.ADMIN_PATH_PREFIX}/reference-books/people/edit/:id`,
    authMiddleware,
    adminReferenceBooksController.people_id
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/reference-books/people/avatar-create`,
    imgUpload_MD.single('files'),
    authMiddleware,
    adminReferenceBooksController.people_avatar_create
);

router.post(`${process.env.ADMIN_PATH_PREFIX}/reference-books/people/save`,
    authMiddleware,
    adminReferenceBooksController.people_save
);


module.exports = adminReferenceBooksRouter = router;