import { sequelize, DataTypes } from '../../lib/sequelize.js';

export const BrandModel = sequelize.define('Recommend', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    best: {
      type: DataTypes.INTEGER
    },
    others: {
      type: DataTypes.STRING,
      get() {
        const arr = this.getDataValue('others');
        return arr && arr.split(',');
      },
      set(value) {
        return this.setDataValue('others', value && value.join(','))
      }
    }
}, {
    tableName: 'recommend',
    timestamps: false,
    underscored: true,
});

export default BrandModel;
