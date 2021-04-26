import ApiResponse from "../lib/ApiResponse.js";

export default (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            let error = err.originalError ? err.originalError.message : err.message;
            ctx.body = new ApiResponse(ctx.status, 'Authorization 验证失败：' + error);
        } else {
            throw err;
        }
    });
}
