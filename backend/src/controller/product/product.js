import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import ProductService from '../../service/ProductService.js'
import UserService from '../../service/UserService.js'

const product = new Router();

product.get("/all", async (ctx, next) => {
  try {
    const data = await ProductService.getProductAll();
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    ctx.body = new ApiResponse(500, `获取失败: ${err.message}`);
  }
});

product.get("/allParams", async (ctx, next) => {
  const { id } = ctx.query;
  try {
    const data = await ProductService.getProductAllParams(id);
    if (!data) {
      ctx.body = new ApiResponse(400, `获取失败: 不存在此产品`);
      return;
    }
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    ctx.body = new ApiResponse(500, `获取失败: ${err.message}`);
  }
});

product.get("/baseInfo", async (ctx, next) => {
  const { id } = ctx.params;
  try {
    const data = await ProductService.getProductBaseInfo(id);
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    ctx.body = new ApiResponse(500, `获取失败: ${err.message}`);
  }
});

product.get('/fetchZolParamsByUrl', async (ctx, next) => {
  const { url } = ctx.query;
  try {
    const data = await ProductService.fetchProductParams(url);
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (error) {
    ctx.body = new ApiResponse(500, `获取失败: ${error.message}`);
  }
})

product.get("/brand", async (ctx, next) => {
  try {
    const data = await ProductService.getBrandAll();
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    ctx.body = new ApiResponse(500, `获取失败: ${err.message}`);
  }
});

product.get("/recommend", async (ctx, next) => {
  const { userId } = ctx.query;
  try {
    const data = await ProductService.getRecommend(userId);
    if (!data) {
      ctx.body = new ApiResponse(400, `获取失败: 不存在此产品`);
      return;
    }
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    ctx.body = new ApiResponse(500, `获取失败: ${err.message}`);
  }
});

product.get("/comment", async (ctx, next) => {
  try {
    const data = await ProductService.getProductCommentAll();
    if (!data) {
      ctx.body = new ApiResponse(400, `获取失败: 不存在此产品`);
      return;
    }
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    ctx.body = new ApiResponse(500, `获取失败: ${err.message}`);
  }
});

product.post("/comment", async (ctx, next) => {
  const { id, user, content } = ctx.request.body;
  try {
    const data = await ProductService.addComment(id, user, content);
    ctx.body = new ApiResponse(0, `发表成功`, data);
  } catch (err) {
    console.error(err);
    ctx.body = new ApiResponse(400, `发表失败: ${err.message}`);
  }
});

// 存储推荐
product.post("/recommend", async (ctx, next) => {
  const { userId } = ctx.request.body;
  const data = ctx.request.body;
  try {
    const result = await ProductService.generateRecommend(userId, data);
    if (result) {
      ctx.body = new ApiResponse(0, `提交成功！`);
    } else {
      ctx.body = new ApiResponse(400, `提交失败: 请检查参数`);
    }
  } catch (error) { 
    ctx.body = new ApiResponse(500, `提交失败: ${error.message}`);
  }
});

product.post("/add", async (ctx, next) => {
  const { params } = ctx.request.body;
  console.log("🚀 ~ file: product.js ~ line 69 ~ product.post ~ params", params)
  try {
    const result = await ProductService.addProduct(params);
    if (result) {
      ctx.body = new ApiResponse(0, `新增产品成功！`);
    } else {
      ctx.body = new ApiResponse(400, `新增产品失败: 请检查参数`);
    }
  } catch (error) { 
    ctx.body = new ApiResponse(500, `新增产品失败: ${error.message}`);
  }
});

product.post("/delete", async (ctx, next) => {
  const { id } = ctx.request.body;
  try {
    const data = await ProductService.delProduct(id);
    if (!data) {
      ctx.body = new ApiResponse(400, `删除失败: 不存在此产品`);
      return;
    }
    ctx.body = new ApiResponse(0, `删除成功`, data);
  } catch (err) {
    ctx.body = new ApiResponse(500, `删除失败: ${err.message}`);
  }
});

// params 获取单个产品信息
product.get("/:id", async (ctx, next) => {
  const { id } = ctx.params;
  try {
    const data = await ProductService.getProduct(id);
    if (!data) {
      ctx.body = new ApiResponse(400, `获取失败: 不存在此产品`);
      return;
    }
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    ctx.body = new ApiResponse(500, `获取失败: ${err.message}`);
  }
});

export default product;
