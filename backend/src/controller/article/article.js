import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import ArticleService from '../../service/LoginService.js'

const article = new Router();
// login.prefix("/login");


article.get("/:id", async (ctx, next) => {
  const { id } = ctx.params;

  try {
    const r = await ArticleService.findByUserName(username);
    console.log('r: ', r);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `登录失败: ${err.message}`);
  }

});



export default article;
