import Router from 'koa-router';
import mysql from '../../lib/mysql.js';
import ApiResponse from '../../lib/ApiResponse.js';
import config from '../../config.js';

const banner = new Router();

banner.get('/', async ctx => {

	try {
		const conn = mysql.getConnection(config.dbConfig);
		// 查询
		const r = await mysql.find('banner');

		// 返回json
		if (r) ctx.body = new ApiResponse(200, '查询成功', r);
		return;

	} catch (err) {
		console.error(err);
	}
	ctx.body = new ApiResponse(500, '注册失败: 系统内部错误');

});

export default banner;