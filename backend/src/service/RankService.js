import Axios from 'axios';
import RankModel from '../model/RankModel.js';
import ApiResponse from './../../lib/ApiResponse';

const queryRankData = async (type = 'allSite') => {
  console.log('rank type', type);
  try {
    const r = RankModel.findAll({
      where: { type },
      group: ['rank', 'ASC']
    });
    return r;
  } catch (error) {
    console.log('error: ', error);
  }
}

export default {
  queryRankData
}
