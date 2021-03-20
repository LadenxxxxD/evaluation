import Router from 'koa-router';
import mysql from '../lib/mysql.js';
import config from '../config.js';
import auth from '../lib/jwt.js';
import ApiResponse from '../lib/ApiResponse.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const login = new Router();
// login.prefix("/login");


login.post("/", async (ctx, next) => {
	const { username, password } = ctx.request.body;
	// const sql = `SELECT count(*) as count FROM user WHERE username='${username}' AND password='${password}'`;

	try {
		const conn = mysql.getConnection(config.dbConfig);
		const r = await mysql.find('user', 'password', { username });
		if (!r) {
			ctx.body = new ApiResponse(400, `登录失败: 用户${username}不存在`);
			return;
		}
		const canLogin = bcrypt.compareSync(password, r[0].password)

		if (canLogin) {
			// 签发token
			const token = jwt.sign({
				username
			}, config.TOKEN.secret, {
				expiresIn: config.TOKEN.expiresIn
			});
			// 设置cookie
			ctx.cookies.set('access_token', token, {
				maxAge: 60 * 60 * 1000, // 1h
				path: '/',
				httpOnly: true
			});

			// 返回json
			ctx.body = new ApiResponse(200, '登录成功');
			return;
		}

		// 判断结果是Select语句返回的row 还是update、insert等语句返回的影响行数等对象
		// if (mysql.isSelectResults(r) && r[0].count !== 0){

		//     // 签发token
		//     const token = jwt.sign({
		//         username
		//     }, config.TOKEN.secret, { 
		//         expiresIn: config.TOKEN.expiresIn 
		//     });
		//     const payload = jwt.verify(token, config.TOKEN.secret);
		//     console.log(payload);

		//     // 返回json
		//     ctx.body = new ApiResponse(200, '登录成功', {token});
		//     return ;
		// }
	} catch (err) {
		console.error(err);
		ctx.body = new ApiResponse(400, `登录失败: ${err.message}`);
	}

});

export default login;