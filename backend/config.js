const PORT = process.env.PORT || 3000;
const DB_CONFIGS = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root1234',
    database: 'evaluationdb1'
};
const TOKEN = {
    secret: 'jwt_secret',
    expiresIn: '24h' // 60 * 60s
}


export default {
    PORT,
    TOKEN,
    DB_CONFIGS
};