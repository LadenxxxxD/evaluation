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

export default {
  findByUserName
}