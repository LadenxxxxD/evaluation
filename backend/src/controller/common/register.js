import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import RegisterService from '../../service/RegisterService.js';
import LoginService from '../../service/LoginService.js';

const register = new Router();

register.post('/', async ctx => {
	const { username, password, nickname } = ctx.request.body;

	try {
		// 查重
		const isUsernameExist = await RegisterService.checkUserExist(username);
		if (isUsernameExist) {
			ctx.body = new ApiResponse(400, '注册失败: 用户名已经被注册');
			return;
		}

		// 加密密码
		const password_s = RegisterService.hashPassword(password);
		// 插入
		const r = await RegisterService.addUser(username, password_s, nickname);

		if (r) {
			// 签发token
			const token = LoginService.signToken(username);
			// 设置cookie
			ctx.cookies.set('access_token', token, {
				maxAge: 60 * 60 * 1000, // 1h
				path: '/',
				httpOnly: true
			});
			// 返回json
			ctx.body = new ApiResponse(200, '注册成功');
		}
		return;

	} catch (err) {
		console.error(err);
	}
	ctx.body = new ApiResponse(500, '注册失败: 系统内部错误');

});

export default register;