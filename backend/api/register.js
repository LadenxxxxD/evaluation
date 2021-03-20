import Router       from 'koa-router';
import mysql        from '../lib/mysql.js';
import ApiResponse  from '../lib/ApiResponse.js';
import bcrypt       from 'bcrypt';

const register = new Router();

register.post('/', async ctx => {
    const { username, password } = ctx.request.body;
    
    try {
        // 查重
        const isUsernameExist = await mysql.checkExist('user', {username});
        if (isUsernameExist) {
            ctx.body = new ApiResponse(400, '注册失败: 用户名已经被注册');
            return ;
        }
        
        const password_s = bcrypt.hashSync(password, 10);
        // 插入
        const r = await mysql.add('user', { username, password:password_s });

        // 返回json
        if (r) ctx.body = new ApiResponse(200, '注册成功');
        return;
        
    } catch (err) {
        console.error(err);
    }
    ctx.body = new ApiResponse(500, '注册失败: 系统内部错误');

});

export default register;