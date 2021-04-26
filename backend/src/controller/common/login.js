import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import LoginService from '../../service/LoginService.js'

'use strict';

const login = new Router();
// login.prefix("/login");

login.post("/", async (ctx, next) => {
	const { username, password } = ctx.request.body;

	try {
		const r = await LoginService.findByUserName(username);
		if (!r) {
			return ctx.body = new ApiResponse(400, `登录失败: 用户${username}不存在`);
		}
		const canLogin = LoginService.comparePassword(password, r.password);

		if (canLogin) {
			// 签发token
			const token = LoginService.signToken(username);
			// 设置cookie
			ctx.cookies.set('access_token', token, {
				maxAge: 24 * 60 * 60 * 1000, // 1h
				path: '/',
				httpOnly: true
			});
			// 返回json
			return ctx.body = new ApiResponse(200, '登录成功');
		}
		return ctx.body = new ApiResponse(400, `登录失败: 用户名或密码错误`);
	} catch (err) {
		console.error(err);
		ctx.body = new ApiResponse(400, `登录失败: ${err.message}`);
	}
});



export default login;
