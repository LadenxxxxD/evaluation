import Axios from 'axios';
import ArticleModel from '../model/ArticleModel.js';

const getArticleListByPage = async (pageNum = 0, pageSize = 10) => {
  console.log(123);
  try {
    let r = await ArticleModel.findAll({ offset: pageNum * pageSize || 0, limit: pageSize });
    if (r) {
      console.log('找到了', r);
      return r;
    }
  } catch (error) {

  }
}

/**
 * 先在数据库找id 找到返回
 * 找不到去zaeke请求 将请求到的返回 并存进数据库
 */
const getArticle = async (id) => {
  try {
    let r = await ArticleModel.findOne({ where: { id } });
    if (r) {
      console.log('找到了', r.get());
      return r.get();
    }
    // 找不到 去zaeke获取
    console.log('找不到去 zaeke');
    const response = await Axios.get('http://manager.zaeke.com:9999/main/article', {
      params: { id }
    });
    if (response.data.code === 1) {
      const data = response.data.data || {};
      let r = await ArticleModel.create({
        id: data.id,
        title: data.title,
        author: data.author,
        author_id: data.author_id,
        author_img: data.member_info.img,
        content: data.content,
        description: data.abstract,
        tags: [...data.user_tags, ...data.tags],
        htmlcontent: data.htmlcontent,
        img: data.img,
        pv: data.pv,
        comment: data.reply,
        like: 0,
        created: new Date(data.created * 1000),
        updated: new Date(data.updated * 1000),
        tags: data.tags,
      });
      if (r) console.log('数据插入成功')
      return data;
    }
    return null;
  } catch (error) {
    console.log('error: ', error);
  }
}

export default {
  getArticle,
  getArticleListByPage
}