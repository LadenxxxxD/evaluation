import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import LoginService from '../../service/LoginService.js'

'use strict';

const auth = new Router();

auth.get("/", async (ctx, next) => {
  return ctx.body = new ApiResponse(0, '已登录');
});

export default auth;
