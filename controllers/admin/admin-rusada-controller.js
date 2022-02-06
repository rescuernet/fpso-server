const adminRusadaService = require('../../service/admin/admin-rusada-service')
const FileUpload = require("../../function/file-cloud");



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
        if(req.file){
            try {
                await FileUpload.Upload(req.file.filename)
                return res.json({doc: req.file.filename});
            } catch (e) {
                next(e);
            }
        }else{
            return res.json({error: 'Ошибка загрузки'});
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