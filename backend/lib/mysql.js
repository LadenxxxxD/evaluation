import mysql from 'mysql';
import app from '../config.js';

const dbConfig = app.DB_CONFIGS || {};

/**
 * 新建并返回一个数据库连接
 * @param {dbConfig} options 数据库配置对象
 */
let singletonConnection = null;
const getConnection = (options = dbConfig) => {
    if (singletonConnection === null) {
        singletonConnection = mysql.createConnection(options);
        singletonConnection.connect(err => {
            if (err) {
                console.error('数据库连接失败！' + err.message);
                return;
            }
            // console.log('Mysql connect successful!');
        });
    }
    return singletonConnection;
}

/**
 * 执行查询 并返回一个结果为回调参数的promise对象
 * @param {string} queryString 查询SQL语句字符串
 * @param {Connection} connection mysql连接对象
 * @param {boolean} keepConnectionAlive 是否保持连接，默认为false
 */
const query = (queryString, connection, keepAlive = false) => {
    if(!connection){
        connection = getConnection();
    }

    // 将回调函数式的异步包装成promise 方便使用async/await
    const promise = new Promise( (resolve, reject) => {
        connection.query(queryString, (err, result) => {
            if (err) {
                console.error(`数据库查询失败
            ${err.message}`);
                reject(err);
                return;
            }
            // 
            resolve(result);
        });
    });


    if (!keepAlive){
        connection.end();
        singletonConnection = null;
    }

    return promise;
};

/**
 * 通过判断返回结果是数组还是对象，确定是否是Select语句结果
 * @param {*} queryResults 
 */
const isSelectResults = queryResults => {
    return Array.isArray(queryResults) && queryResults.length!==0;
}

/**
 * 查询语句
 * @param {String} tableName 查询表名
 * @param {String,Array} columns 查询列名
 * @param {String} conditions WHERE 条件
 */
const find = async (tableName, columns = '*', conditions = 1) => {
    try {
        let columnString = Array.isArray(columns) ? columns.join(',') : columns;
        let conditionString = '';
        
        if (!tableName){
            throw '表名不能为空';
        }
        // 将对象形式的where条件解析为字符串
        if (typeof conditions === 'object' && conditions !== null) {
            let flag = false;
            for (let k in conditions) {
                if (flag) conditionString += ' AND ';
                conditionString += `${k}='${conditions[k]}'`;
                flag = true;
            }
        } else {
            conditionString = 1;
        }

        const sql = `SELECT ${columnString} FROM ${tableName} WHERE ${conditionString}`;
        const conn = getConnection();
        const r = await query(sql, conn);

        if (!isSelectResults(r)) {
            throw '要求Select语句';
        }

        return r;

    } catch (err) {
        console.error(err);
    }
    return null;
}

/**
 * 插入语句 insert一个对象
 * @param {String} tableName 表名
 * @param {{}} options 插入的对象
 */
const add = async (tableName, options) => {
    const columns = [];
    const values = [];

    if (!tableName) {
        throw '表名不能为空';
    }
    if (typeof options === 'object' && options !== null) {
        for (let k in options) {
            columns.push(k);
            values.push(`'${options[k]}'`);
        }
    }

    try {
        const sql = `INSERT INTO user (${columns.join(',')}) VALUES (${values.join(',')});`;
        const conn = getConnection();
        const r = await query(sql, conn);
        if (isSelectResults(r)) {
            throw '不应该为Select语句错误';
        }

        if (r.affectedRows > 0) {
            return true;
        }
    } catch (err) {
        console.error(err);
    }
    return false;
    
}

/**
 * 检查某个字段是否存在 返回一个boolean值
 * @param {*} columnName 
 * @param {String, {}} value 
 */
const checkExist = async (tableName, options ) => {
    let conditions = '';
    try {
        if (!tableName) {
            throw '表名不能为空';
        }
        if(typeof options === 'object' && options !== null){
            let flag = false;
            for(let k in options) {
                if(flag) conditions += ' AND ';
                conditions += `${k}='${options[k]}'`
                flag = true;
            }
        }else {
            conditions = 1;
        }

        const sql = `SELECT COUNT(*) as count FROM ${tableName} WHERE ${conditions}`;
        const conn = getConnection();
        const r = await query(sql, conn);

        if (!isSelectResults(r)) {
            throw '要求Select语句';
        }

        if(r[0].count !== 0) {
            return true;
        }

    } catch (err) {
        console.error(err);
    }
    return false;
}























// let a = query(`insert into user (username,password) values ('qwe','123')`, conn, true);

/* ******************
    TODO：高级接口封装
 *********************/




/* (async function () {
    const conn = getConnection(dbConfig);
    let a = await query("select * from user where username='test';", conn);
    console.log(a);
    if(Array.isArray(a)){
        console.log('是查询结果');
    }else{
        console.log('是其他操作结果');
    }
})(); */

export default {
    getConnection,
    query,
    find,
    add,
    checkExist,
    isSelectResults,
}