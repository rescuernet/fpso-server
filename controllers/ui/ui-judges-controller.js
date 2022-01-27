const JudgesOrders = require('../../models/judges-orders/judges-orders.js');


class uiJudgesController {

    async judges_orders_get(req, res, next) {
        const orderType = req.query.ordertype
        try {
            const query = {
                view: true,
                tmp: false
            }
            if (orderType) query.orderType = orderType
            const data = await JudgesOrders.find(query).populate('judges').sort({orderType: 1}).lean();
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new uiJudgesController();