const adminTeamService = require('../../service/admin/admin-team-service')
const FileUpload = require("../../function/file-cloud");



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
        if(req.file){
            try {
                await FileUpload.Upload(req.file.filename)
                return res.json({doc: req.file.filename});
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