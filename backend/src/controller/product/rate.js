import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import RateService from '../../service/RateService.js'

const rate = new Router();

rate.get("/getRate", async (ctx, next) => {
  const { id } = ctx.query;
  try {
    const data = await RateService.getRateInfo(id);
    if (!data) {
      ctx.body = new ApiResponse(400, `获取失败: 不存在此产品`);
      return;
    }
    ctx.body = new ApiResponse(0, `获取成功`, data);
  } catch (err) {
    ctx.body = new ApiResponse(500, `获取失败: ${err.message}`);
  }
});

rate.post("/userRate", async (ctx, next) => {
  const { id, rate } = ctx.request.body;
  const rateNum = parseInt(rate, 10);
  try {
    const result = await RateService.rateProduct(id, rateNum);
    if (result) {
      ctx.body = new ApiResponse(0, `评分成功！`);
    } else {
      ctx.body = new ApiResponse(0, `评分失败: ${err.message}`);
    }
  } catch (error) {
    
  }
})

export default rate;
