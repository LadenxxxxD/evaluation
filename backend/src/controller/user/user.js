import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import UserService from '../../service/UserService.js'

'use strict';

const user = new Router();

user.get("/:id", async (ctx, next) => {
  const { id } = ctx.params;
	try {
		const r = await UserService.getUserInfo(id);
		if (!r) {
			return ctx.body = new ApiResponse(400, `获取用户信息失败: 用户不存在`);
		}
    // 返回json
    return ctx.body = new ApiResponse(0, '获取用户信息成功', r);
	} catch (err) {
		console.error(err);
		ctx.body = new ApiResponse(400, `获取用户信息失败: ${err.message}`);
	}
});

user.post("/:id", async (ctx, next) => {
  const { id } = ctx.params;
  const data = ctx.request.body;
	try {
		const r = await UserService.updateUserInfo(id, data);
		if (!r) {
			return ctx.body = new ApiResponse(400, `获取用户信息失败: 用户不存在`);
		}
    // 返回json
    return ctx.body = new ApiResponse(0, '获取用户信息成功', r);
	} catch (err) {
		console.error(err);
		ctx.body = new ApiResponse(400, `获取用户信息失败: ${err.message}`);
	}
});

export default user;
