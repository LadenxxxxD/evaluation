import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import LoginService from '../../service/LoginService.js'

'use strict';

const logout = new Router();
// login.prefix("/login");

logout.get("/", async (ctx, next) => {
  const { username } = ctx.request.query;
  // console.log('username: ', username);

	try {
		const r = await LoginService.findByUserName(username);
		if (!r) {
			return ctx.body = new ApiResponse(400, `注销失败: 用户${username}不存在`);
		}
    // 清除cookie
    ctx.cookies.set('access_token', '', {
      maxAge: 0,
      path: '/',
      httpOnly: true
    });
    ctx.redirect('/auth');
    // 返回json
    return ctx.body = new ApiResponse(0, '注销成功');
	} catch (err) {
		console.error(err);
		ctx.body = new ApiResponse(400, `登录失败: ${err.message}`);
	}

});



export default logout;
