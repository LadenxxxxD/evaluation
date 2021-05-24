import RateModel from '../model/RateModel.js';
import { sequelize } from '../../lib/sequelize.js';

// 获取当前id在某列中的排名
const getRateRank = async (id, table, column, alias) => {
  try {
    return await sequelize.query(
      `SELECT (@ranknum := @ranknum + 1) as ${alias}
      FROM ${table} t,
      (SELECT @ranknum := 0) rank
      WHERE id = ${id}
      ORDER BY ${column} DESC`,
      {
        type: sequelize.QueryTypes.SELECT,
        plain: true,
      }
    );
  } catch (error) {
    console.log('获取排名方法出错：', error);
  }
}

const getRateInfo = async (id) => {
  try {
    // const { userRateRank } = await sequelize.query(
    //   `SELECT (@ranknum := @ranknum + 1) as userRateRank
    //   FROM rate t,
    //   (SELECT @ranknum := 0) rank
    //   WHERE id = ${id}
    //   ORDER BY user_rate DESC`,
    //   {
    //     type: sequelize.QueryTypes.SELECT,
    //     plain: true,
    //   }
    // );
    // const { scoreRank } = await sequelize.query(
    //   `SELECT (@ranknum := @ranknum + 1) as scoreRank
    //   FROM rate t,
    //   (SELECT @ranknum := 0) rank
    //   WHERE id = ${id}
    //   ORDER BY score DESC`,
    //   {
    //     type: sequelize.QueryTypes.SELECT,
    //     plain: true,
    //   }
    // );
    // const { antutuRank } = await sequelize.query(
    //   `SELECT (@ranknum := @ranknum + 1) as antutuRank
    //   FROM rate t,
    //   (SELECT @ranknum := 0) rank
    //   WHERE id = ${id}
    //   ORDER BY antutu DESC`,
    //   {
    //     type: sequelize.QueryTypes.SELECT,
    //     plain: true,
    //   }
    // );
    const { userRateRank } = await getRateRank(id, 'rate', 'user_rate', 'userRateRank');
    const { scoreRank } = await getRateRank(id, 'rate', 'score', 'scoreRank');
    const { antutuRank } = await getRateRank(id, 'rate', 'antutu', 'antutuRank');
    const productRate = await RateModel.findOne({ 
      attributes:{
        include: [
          ['user_rate', 'userRate'],
          ['rate_number', 'rateNumber'],
        ],
        exclude: ['user_rate', 'rate_number']
      },
      where: { id }
    });
    const productRateData = productRate.get();
    return { ...productRateData, userRateRank, scoreRank, antutuRank };
  } catch (error) {
    console.log('error: ', error);
  }
}

const rateProduct = async (id, rate) => {
  console.log(typeof id, id)
  try {
    const { user_rate, rate_number } = await RateModel.findOne({
      attributes: ['user_rate', 'rate_number'],
      where: { id } 
    })
    const newUserRate = (user_rate * rate_number + rate) / (rate_number + 1);
    const result = await RateModel.update({ user_rate: newUserRate, rate_number: rate_number + 1 }, { where: { id } });
    return !!result;
  } catch(error) {
    console.log('更新用户评分时出错：', error)
  }
}

export default {
	getRateInfo,
  rateProduct
}
