'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Province extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Province.init({
    province: DataTypes.STRING
  }, {
    sequelize,
    defaultScope: {
      attributes: {
        exclude: ['createdAt', 'updatedAt']
      }
    },
    modelName: 'Province',
  });

  Province.associate = models => {
    Province.hasMany(models.City, {
      as: 'cities',
      foreignKey: 'provinceId'
    })
  }

  return Province;
};