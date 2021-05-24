import Router from 'koa-router';
import ApiResponse from '../../../lib/ApiResponse.js';
import Axios from 'axios';

const file = new Router();

file.post('/freePic', async ctx => {
  const { file } = ctx.request.files;
  console.log("🚀 ~ file: file.js ~ line 9 ~ file", file)
	try {
		const response = await Axios.post('https://free-pic.hzz.cool/upload.php',{ file, file_id: 0, img_type: 'ImgKr' });

		// 返回json
		ctx.body = new ApiResponse(response.data.code, response.data.message, response.data);

	} catch (err) {
		console.error(err);
    ctx.body = new ApiResponse(500, '上传失败: 系统内部错误');
	}
});

file.post('/imgkr', async ctx => {
  const { file } = ctx.request.files;
  console.log("🚀 ~ file: file.js ~ line 9 ~ file", file)
	try {
		const response = await Axios.post('https://imgkr.com/api/v2/files/upload',{ file });

		// 返回json
		ctx.body = new ApiResponse(response.data.code, response.data.message, response.data);

	} catch (err) {
		console.error(err);
    ctx.body = new ApiResponse(500, '上传失败: 系统内部错误');
	}
});

file.post('/ali', async ctx => {
  const { file } = ctx.request.files;
	try {
		const response = await Axios.post('https://api.uomg.com/api/image.sogou',{ file: 'multipart' }, {
      // headers: { 'Content-Type': 'multipart/form-data' }
    });
    // console.log("🚀 ~ file: file.js ~ line 13 ~ response", response)

		// 返回json
		ctx.body = new ApiResponse(response.data.code, response.data.msg, response.data);

	} catch (err) {
		console.error(err);
    ctx.body = new ApiResponse(500, '上传失败: 系统内部错误');
	}
});

file.post('/juejin', async ctx => {
  const { file } = ctx.request.body;
	try {
		const response = await Axios.post('https://sm.ms/api/v2/',{ myPhoto: file }, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    console.log("🚀 ~ file: file.js ~ line 13 ~ response", response)

		// 返回json
		ctx.body = new ApiResponse(response.data.code, response.data.msg, response.data);

	} catch (err) {
		console.error(err);
    ctx.body = new ApiResponse(500, '上传失败: 系统内部错误');
	}
});

export default file;
