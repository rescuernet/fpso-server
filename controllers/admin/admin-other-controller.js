const FileCloud = require("../../function/file-cloud");
const Blocking = require("../../models/blocking/blocking");



class adminOtherController {

    async media_del_tmp(req, res, next) {
        const checkBlocking = await Blocking.findOne({}).lean();
        if(checkBlocking.mediaDelTmp) return res.json({status:'Установлена блокировка удаления временного медиа-контента. Обратитесь к разработчику. Код ошибки MEDIA-DEL-TMP'});
        const arr = req.body.mediaDelTmp
        try {
            if(arr && arr.length > 0){
                FileCloud.Delete(arr)
            }
            return res.json({status: 200});
        } catch (e) {
            next(e);
        }
    }

    async media_del_tmp_blocking (req, res, next) {
        const arr = req.body
        try {
            const blockingId = await Blocking.findOne({}).lean();
            await Blocking.findOneAndUpdate({_id:blockingId._id.toString()}, arr);
            return res.json({status:'Установлена блокировка удаления временного медиа-контента. Обратитесь к разработчику. Код ошибки MEDIA-DEL-TMP'});
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new adminOtherController();