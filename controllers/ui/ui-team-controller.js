const TeamModel = require("../../models/team/team-model");


class uiTeamController {

    async team_get(req, res, next) {
        try {
            const data = await TeamModel.findOne({}).lean();
            return res.json(data);
        } catch (e) {
            next(e);
        }
    }

}

module.exports = new uiTeamController();