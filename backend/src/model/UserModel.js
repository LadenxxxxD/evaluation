import { sequelize, DataTypes } from '../../lib/sequelize.js';


/**
 * 定义UserModel ORM映射
 */
export const UserModel = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    nickname: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING
    },
    gender: {
        type: DataTypes.DECIMAL
    },
    age: {
        type: DataTypes.INTEGER
    },
}, {
    tableName: 'user',
    timestamps: false
});

export default UserModel;
