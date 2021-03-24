const { Op } = require('sequelize');

const { O_AUTH } = require('../constant/database.Models.enum');
const db = require('../database').getInstance();

module.exports = async () => {
    const O_Auth = db.getModel(O_AUTH);

    await O_Auth.destroy({
        where: {
            createdAt: { [Op.lt]: (new Date() - 10 * 24 * 60 * 60 * 1000) }
        }
    });
};
