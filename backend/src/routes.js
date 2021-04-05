import Router from 'koa-router';
import login from './controller/common/login.js';
import logout from './controller/common/logout.js';
// import login from '../api/login.js';
import user from '../api/user.js';
// import register from '../api/register.js';
import register from './controller/common/register.js';
import article from './controller/article/article.js';
import banner from '../api/Home/banner.js';



const router = new Router();
router.prefix('/api/v1');

router.use("/login", login.routes(), login.allowedMethods());
router.use("/logout", logout.routes(), logout.allowedMethods());
router.use("/user", user.routes(), user.allowedMethods());
router.use("/register", register.routes(), register.allowedMethods());
router.use("/banner", banner.routes(), register.allowedMethods());
router.use("/article", article.routes(), article.allowedMethods());


export default router;
