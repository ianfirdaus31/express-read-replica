const { Op } = require('sequelize')
const { Province } = require('../database/models');

exports.regions = async (req, res) => {
    try {
        const { provId } = req.query;

        const provs = await Province.findAll({
            where: {
                id: {
                    [Op.in]: provId.split(',')
                }
            },
            include: ['cities']
        });

        res.json({ data: provs });
    } catch (err) {
        res.status(500).json(false);
    }
}