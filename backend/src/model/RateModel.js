import { sequelize, DataTypes } from '../../lib/sequelize.js';


/**
 * 定义RateModel ORM映射
 */
export const RateModel = sequelize.define('Rate', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'Product',
            key: 'id'
        },
    },
    user_rate: {
        type: DataTypes.DOUBLE
    },
    rate_number: {
        type: DataTypes.INTEGER
    },
    score: {
        type: DataTypes.INTEGER
    },
    antutu: {
        type: DataTypes.INTEGER
    }
}, {
    tableName: 'rate',
    timestamps: false
});

// testConnection(sequelize);

export default RateModel;
