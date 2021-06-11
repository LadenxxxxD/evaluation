import Axios from 'axios';
import { Op } from '../../lib/sequelize.js';
import ProductModel from '../model/ProductModel.js';
import BrandModel from '../model/BrandModel.js';
import RecommendModel from '../model/RecommendModel.js';
import CommentModel from '../model/CommentModel.js';
import RateModel from '../model/RateModel.js';
import UserModel from '../model/UserModel.js';
import { getParamsByUrl } from '../crawler/fetchPhoneParams.js';

const getProduct = async (id) => {
  try {
    return await ProductModel.findByPk(id);
  } catch (error) {
    console.log('获取产品信息时出错: ', error);
  }
}

const getProductAll = async () => {
  try {
    return await ProductModel.findAll();
  } catch (error) {
    console.log('获取产品列表时出错: ', error);
  }
}

const getBrandAll = async () => {
  try {
    return await BrandModel.findAll();
  } catch (error) {
    console.log('获取产品品牌时出错: ', error);
  }
}

const getProductAllParams = async (id) => {
  try {
    let r = await ProductModel.findOne({ 
      attributes: ['params'],
      where: { id }
    });
    return r;
  } catch (error) {
    console.log('获取产品详细参数时出错: ', error);
  }
}

// 获取基本信息
const getProductBaseInfo = async (id) => {
  try {
    let r = await ProductModel.findByPk({ 
      attributes: {
        exclude: ['params', 'tag']
      },
      where: { id }
    });
    return r;
  } catch (error) {
    console.log('获取产品基本信息时出错: ', error);
  }
}

const fetchProductParams = (url) => {
  try {
    return getParamsByUrl(url);
  } catch (error) {
    console.log('获取zol参数时： ', error)
  }
}

// 删除产品
const delProduct = async (id) => {
  try {
    let r = await ProductModel.destroy({ where: { id } });
    return !!r;
  } catch (error) {
    console.log('删除产品时出错: ', error);
  }
}

// 新增产品
const addProduct = async (params) => {
  try {
    // let r = await ProductModel.create({
    //   name: '',
    //   price: '',
    //   cover_img: '',
    //   cpu: '',
    //   memory: '',
    //   storage: '',
    //   battery: '',
    //   front_camera: [],
    //   back_camera: [],
    //   screen_size: '',
    //   screen_ratio: '',
    //   tags: [],
    //   params: '',
    //   official_article: '',
    //   related_articles: []
    // });
    let r = await ProductModel.create({ ...params, id: 0 });
    return !!r;
  } catch (error) {
    console.log('新增产品时出错: ', error);
  }
}

const updateProduct = async (id, params) => {
  try {
    let r = await ProductModel.update({ ...params }, { where: { id } });
    return !!r;
  } catch (error) {
    console.log('更新产品时出错: ', error);
  }
}

const getRecommend = async (userId) => {
  try {
    return await RecommendModel.findByPk(userId);
  } catch (error) {
    console.log('获取产品推荐时出错: ', error);
  }
}

const generateRecommend = async (user, data) => {
  const { price, brands, tags, colors } = data;
  try {
    ProductModel.hasOne(RateModel, { foreignKey: 'id' } );
    const priceRecord = await ProductModel.findAll({
      where: {
        price : { [Op.between]: [price[0], price[1]] }
      },
      include:{
        model: RateModel,
        as: 'Rate',
      },
      order: [['Rate', 'antutu', 'DESC']]
    });
    const best =  priceRecord[0] || {};
    const other = priceRecord.slice(1,4) || [];
    const delResult = await RecommendModel.destroy({ where: { id: user } })
    const saveResult = RecommendModel.create({
      id: user,
      best: best.id,
      others: other.map(item => item.id)
    });
    if (!!saveResult) {
      return priceRecord;
    } else {
      return null;
    }
  } catch (error) {
    console.log('生成产品推荐时出错: ', error);
  }
}

const getProductCommentAll = async () => {
  try {
    CommentModel.hasOne(UserModel, { foreignKey: 'id', sourceKey: 'userId' });
    return await CommentModel.findAll({
      where: { type: 'product' },
      include: {
        model: UserModel,
        as: 'User',
        attributes: {
          exclude: ['password', 'age', 'gender']
        },
        required: true
      },
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
      type: 'product',
      createAt: new Date()
    });
  } catch (error) {
    console.log('发表文章评论时出错: ', error);
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

export default {
  getProduct,
  getProductAll,
  getProductAllParams,
  getProductBaseInfo,
  fetchProductParams,
  delProduct,
  addProduct,
  updateProduct,
  getBrandAll,
  getRecommend,
  generateRecommend,
  getProductCommentAll,
  addComment
}
