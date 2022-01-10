const Router = require('express').Router;
const authMiddleware = require('../../middlewares/auth-middleware');
const adminReferenceBooksController = require('../../controllers/admin/admin-reference-books-controller')


const router = new Router();

router.get(`${process.env.ADMIN_PATH_PREFIX}/reference-books/pools/get`,
    authMiddleware,
    adminReferenceBooksController.pools_get
);

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


module.exports = adminReferenceBooksRouter = router;