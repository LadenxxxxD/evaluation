import Sequelize from 'sequelize';
import config from '../config.js';

const DB = config.DB_CONFIGS;

export const sequelize = new Sequelize(DB.database, DB.user, DB.password, {
    host: DB.host,
    port: DB.port,
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT+8',
    },
    useUTC: false,
    timezone: 'Etc/GMT+8',
    timestamps: false,
    pool: {
        min: 1,
        max: 60,
        idle: 10000
    },
    logging: false
});

// 数据库类型枚举
export const { DataTypes } = Sequelize;

// 测试连接是否成功
export const testConnection = sequelize => {
    sequelize
        .authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(error => {
            console.error('Unable to connect to the database:', error);
        });
}

export default {
    sequelize,
    DataTypes,
    testConnection
};