import { sequelize, DataTypes, testConnection } from '../../lib/sequelize.js';

export const BrandModel = sequelize.define('Brand', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    chName: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'brand',
    timestamps: false
});

export default BrandModel;
