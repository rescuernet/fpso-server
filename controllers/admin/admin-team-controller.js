const adminTeamService = require('../../service/admin/admin-team-service')
const checkUpload = require("../../function/check-upload");
const Resize = require("../../function/Resize");
const Yandex = require("../../function/file-cloud");



class adminTeamController {

    async team_get(req, res, next) {
        try {
            const response = await adminTeamService.team_get();
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

    async team_docs_create(req, res, next) {
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

    async team_save(req, res, next) {
        try {
            const response = await adminTeamService.team_save(req.body);
            return res.json(response);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new adminTeamController();