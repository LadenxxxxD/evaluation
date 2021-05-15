import RankModel from '../model/RankModel.js';

const queryRankData = async (type = 'allSite') => {
  console.log('rank type', type);
  try {
    const r = RankModel.findAll({
      where: { type },
      group: [['rank', 'ASC']]
    });
    return r;
  } catch (error) {
    console.log('error: ', error);
  }
}

export default {
	queryRankData
}
