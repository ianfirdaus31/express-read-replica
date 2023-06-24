const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || 'development'
// eslint-disable-next-line import/no-dynamic-require
const config = require('../../config/database')[env]
const db = {}

let sequelize = null

if (dbMode === 'replica') {
    const dbConf = config[`${env}_${dbMode}`]
    sequelize = new Sequelize(dbConf.database, null, null, dbConf)
} else {
    const dbConf = config[`${env}`]
    sequelize = new Sequelize(dbConf.database, dbConf.username, dbConf.password, dbConf)
}

fs.readdirSync(__dirname)
    .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
        db[model.name] = model
    })

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db