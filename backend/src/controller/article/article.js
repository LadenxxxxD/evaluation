import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import ArticleService from '../../service/ArticleService.js'
import UserService from '../../service/UserService.js'

const article = new Router();

article.get("/all", async (ctx, next) => {
  try {
    const data = await ArticleService.getArticleAll();
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `获取失败: ${err.message}`);
  }
});

article.get("/find", async (ctx, next) => {
  const { ids } = ctx.query;
  console.log("🚀 ~ file: article.js ~ line 20 ~ article.get ~ ids", ids)
  try {
    const data = await ArticleService.getArticleAll();
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `获取失败: ${err.message}`);
  }
});

article.get("/invalid", async (ctx, next) => {
  try {
    const data = await ArticleService.getInvalidArticleList();
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `获取失败: ${err.message}`);
  }
});

article.get("/invalidCount", async (ctx, next) => {
  try {
    const count = await ArticleService.getInvalidArticleCount();
    ctx.body = new ApiResponse(0, `获取成功`, count);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `获取失败: ${err.message}`);
  }
});

article.get("/comment", async (ctx, next) => {
  try {
    const count = await ArticleService.getArticleCommentAll();
    ctx.body = new ApiResponse(0, `获取成功`, count);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `获取文章评论失败: ${err.message}`);
  }
});

article.get("/reject", async (ctx, next) => {
  const { id } = ctx.query;
  try {
    const data = await ArticleService.getRejectdArticle(id);
    ctx.body = new ApiResponse(0, `获取驳回文章列表成功`, data);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `获取失败: ${err.message}`);
  }
});

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


article.post("/pass", async (ctx, next) => {
  const { id } = ctx.request.body;
  try {
    const data = await ArticleService.passArticle(id);
    ctx.body = new ApiResponse(0, `发表成功`, data);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `发表失败: ${err.message}`);
  }
});

article.post("/reject", async (ctx, next) => {
  const { id } = ctx.request.body;
  try {
    const data = await ArticleService.rejectArticle(id);
    ctx.body = new ApiResponse(0, `发表成功`, data);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `发表失败: ${err.message}`);
  }
});

article.post("/add", async (ctx, next) => {
  const { title, content, author } = ctx.request.body;
  const username = author;
  try {
    const authorObj = await UserService.findByUserName(username);
    const author = {
      id: authorObj.id,
      name: authorObj.nickname,
      avatar: authorObj.avatar
    };
    const params = {
      title,
      content,
      author,
      description: '',
      userTags: [],
      coverImg: ''
    }
    const result = await ArticleService.saveArticle(params);
    if (result) {
      ctx.body = new ApiResponse(0, `发布成功: 待管理员用户审批`);
    } else {
      ctx.body = new ApiResponse(0, `发布失败: ${err.message}`);
    }
  } catch (error) {
    console.log('[controller]新增文章时出错: ', error);
  }
});

article.post("/comment", async (ctx, next) => {
  const { id, user, content } = ctx.request.body;
  try {
    const data = await ArticleService.addComment(id, user, content);
    ctx.body = new ApiResponse(0, `发表成功`, data);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `发表失败: ${err.message}`);
  }
});

export default article;
