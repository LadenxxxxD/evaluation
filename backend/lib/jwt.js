import jwt from 'jsonwebtoken';
import config from '../config.js';

const auth = {
    sign: (ctx, info) => {
        const token = jwt.sign(info, config.TOKEN.secret, { expiresIn: config.TOKEN.expiresIn });
        ctx.set('Authorization', `Bearer ${token}`);
        ctx.cookies.set('token', token, {
            maxAge: config.TOKEN.expiresIn,
            httpOnly: true
        });
        return token;
    },

    /**
     *  返回值true代表不正确 false代表正确
     */
    verify: (ctx, decodedToken, token) => {
        let ret = true;
        try {
            console.log(token);
            const payload = jwt.verify(token, config.TOKEN.secret);
            ret = false;   // 如果验证失败会throw error 不会走到这一步
        } catch (err){
            console.log('token验证失败！' + err.message);
        }
        return ret;
    }
}

export default auth;
