import Router from 'koa-router';

const user = new Router();
// login.prefix("/login");

user.get("/:id", async ctx => {
    const uid = ctx.params.id;
    // 数据库登录验证


    // 生成token


    ctx.body = {
        uid,
        code: 200,
        msg: '登录成功',
        token: 'xxxxxxtokenxxxxx'
    };
});

export default user;