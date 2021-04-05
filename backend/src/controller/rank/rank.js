import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import RankService from '../../service/RankService.js'

'use strict';

const rank = new Router();
// login.prefix("/login");


rank.get("/", async (ctx, next) => {
  const { type } = ctx.request.query;

	try {
		const r = await RankService.queryRankData(type);
		if (!r) {
			return ctx.body = new ApiResponse(400, `获取排名失败: 排行类型为${type}`);
		}
    // 返回json
    return ctx.body = new ApiResponse(0, '注销成功', r.get());
	} catch (err) {
		console.error(err);
		ctx.body = new ApiResponse(400, `登录失败: ${err.message}`);
	}
});

export default rank;
