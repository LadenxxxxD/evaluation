import Sequelize from 'sequelize';
import config from '../config.js';

const DB = config.DB_CONFIGS;

export const sequelize = new Sequelize(DB.database, DB.user, DB.password, {
    host: DB.host,
    port: DB.port,
    dialect: 'mariadb',
    dialectOptions: {
        timezone: '+08:00',
    },
    useUTC: false,
    timezone: '+08:00',
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

// Sequelize操作符
export const { Op } = Sequelize;

// sequelize聚合函数
export const { fn } = Sequelize;

// sequelize对象

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
    Op,
    fn,
    testConnection
};
