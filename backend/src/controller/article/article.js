import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import ArticleService from '../../service/ArticleService.js'

const article = new Router();

article.get("/listByPage", async (ctx, next) => {
  const { pageNum = '0', pageSize = '10' } = ctx.query;
  const page = parseInt(pageNum, 10);
  const size = parseInt(pageSize, 10);
  try {
    const data = await ArticleService.getArticleListByPage(page, size);
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `获取失败: ${err.message}`);
  }
});

article.get("/:id", async (ctx, next) => {
  const { id } = ctx.params;
  try {
    const data = await ArticleService.getArticle(id);
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `获取失败: ${err.message}`);
  }
});

export default article;
