import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import router from './src/routes.js';
import koajwt from 'koa-jwt';
import config from "./config.js";
import cors from '@koa/cors';
import error401Handle from './middlewares/error401Handler.js';


const app = new Koa();

app.listen(3000);
console.log("Backend server is runing at http://localhost:" + config.PORT);

app.use(
	cors({
		maxAge: 5,
		credentials: true,
	})
);
app.use(bodyparser());

// 对401进行处理 必须放在koa-jwt前面
app.use(error401Handle);
// 使用koa-jwt拦截验证token
app.use(
	koajwt({
		cookie: 'access_token',
		secret: config.TOKEN.secret,
		// isRevoked: auth.verify
	}).unless({
		path: [/\/login/, /\/register/]
	})
);

app.use(router.routes());
app.use(router.allowedMethods());