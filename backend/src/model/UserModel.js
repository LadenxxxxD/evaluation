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
    isAdmin: {
        type: DataTypes.TINYINT,
        get() {
            return !!this.getDataValue('isAdmin');
        },
        set(value) {
            return this.setDataValue('isAdmin', value ? 1 : 0)
        }
    }
}, {
    tableName: 'user',
    timestamps: false
});

export default UserModel;
