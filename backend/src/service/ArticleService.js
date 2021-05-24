import Axios from 'axios';
import ArticleModel from '../model/ArticleModel.js';
import CommentModel from '../model/CommentModel.js';
import { Op } from '../../lib/sequelize.js';


const getArticleAll = async () => {
  try {
    let r = await ArticleModel.findAll({ order: [['created', 'DESC']] });
    if (r) {
      return r;
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

// 查找不合法或未审核的文章
const getInvalidArticleList = async () => {
  try {
    let r = await ArticleModel.findAll({
      where: {
        valid: {
          [Op.ne]: 1
        }
      },
      order: [['created', 'DESC']]
    });
    if (r) {
      return r;
    }
  } catch (error) {
    console.log('error: ', error);
  }
}

// 查找待审核文章数量
const getInvalidArticleCount = async () => {
  try {
    let count = ArticleModel.count({
      where: {
        valid: {
          [Op.ne]: 1
        }
      },
    });
    return count;
  } catch (error) {
    console.log('查找待审核文章数量时: ', error);
  }
}

const getArticleListByPage = async (pageNum = 0, pageSize = 10) => {
  try {
    let r = await ArticleModel.findAll({
      where: {
        valid: {
          [Op.eq]: 1
        }
      },
      offset: pageNum * pageSize || 0,
      limit: pageSize,
      order: [['created', 'DESC']]
    });
    if (r) {
      return r;
    }
  } catch (error) {
    console.log('error: ', error);
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
      // console.log('找到了', r.get());
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
      });
      if (r) console.log('数据插入成功')
      return data;
    }
    return null;
  } catch (error) {
    console.log('error: ', error);
  }
}

const passArticle = async (id) => {
  console.log(id);
  try {
    let r = await ArticleModel.update({ valid: 1 }, { where: { id } });
    console.log(r);
    return !!r;
  } catch (error) {
    console.log(error);
  }
}

const saveArticle = async (data) => {
  try {
    let r = await ArticleModel.create({
      id: 0,
      title: data.title,
      content: data.content,
      author: data.author.name,
      author_id: data.author.id,
      author_img: data.author.avatar,
      description: data.description,
      tags: data.userTags,
      htmlcontent: data.content,
      img: data.coverImg,
      valid: false,
      created: new Date(),
      updated: new Date()
    });
    if (r) return true;
    return false;
  } catch (error) {
    console.log('[service]saveArticle: ', error);
    return error;
  }
}

const getArticleCommentAll = async () => {
  try {
    return await CommentModel.findAll({
      where: { type: 'article' }
    });
  } catch (error) {
    console.log('获取产品评论时出错: ', error);
  }
}

const addComment = async (id, user, content) => {
  try {
    return await CommentModel.create({
      refId: id,
      userId: user,
      content,
      type: 'article',
      createAt: new Date()
    });
  } catch (error) {
    console.log('发表文章评论时出错: ', error);
  }
}

export default {
  getArticle,
  getArticleListByPage,
  getInvalidArticleList,
  getInvalidArticleCount,
  getArticleAll,
  saveArticle,
  passArticle,
  getArticleCommentAll,
  addComment
}
