const adminRusadaService = require('../../service/admin/admin-rusada-service')
const checkUpload = require("../../function/check-upload");
const Resize = require("../../function/Resize");
const Yandex = require("../../function/file-cloud");



class adminRusadaController {

    async rusada_get(req, res, next) {
        try {
            const response = await adminRusadaService.rusada_get();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async rusada_docs_create(req, res, next) {
        const checkFile = checkUpload.checkUploadFile(req.file, 'docs')
        if(checkFile === 200){
            try {
                const uploadDocs = await Yandex.UploadFile(req.file)
                return res.json({doc: uploadDocs.key});
            } catch (e) {
                next(e);
            }
        }else{
            return res.status(401).json({error: 'Ошибка загрузки'});
        }
    }

    async rusada_save(req, res, next) {
        try {
            const response = await adminRusadaService.rusada_save(req.body);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }
}

module.exports = new adminRusadaController();