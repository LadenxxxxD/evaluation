import UserModel from '../model/UserModel.js';

const findByUserName = async (username) => {
  let r = await UserModel.findOne({
    where: {
      username
    }
  });
  if (r) return r.get();
  return null;
}

const getUserInfo = async (id) => {
  try {
    return await UserModel.findByPk(id, { attributes: { exclude: ['password'] } });
  } catch (error) {
    console.log('用户信息ById出错: ', error)
  }
}

const updateUserInfo = async (id, params) => {
  try {
    return await UserModel.update({
      nickname: params.nickname,
      avatar: params.avatar,
      age: params.age,
      gender: params.gender,
      sign: params.sign
    }, {
      where: { id }
    });
  } catch (error) {
    console.log('用户信息ById出错: ', error)
  }
}

export default {
  findByUserName,
  getUserInfo,
  updateUserInfo
}
