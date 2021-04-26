import UserModel from '../model/UserModel.js';
import bcrypt from 'bcryptjs';
import config from '../../config.js';
import jwt from 'jsonwebtoken';

const findByUserName = async (username) => {
	let r = await UserModel.findOne({
		where: {
			username
		}
	});
	if (r) return r.get();
	return null;
}

const comparePassword = (data, encrypted) => {
	return bcrypt.compareSync(data, encrypted);
}

const signToken = (username) => {
	return jwt.sign({
		username
	}, config.TOKEN.secret, {
		expiresIn: config.TOKEN.expiresIn
	});
}

export default {
	findByUserName,
	comparePassword,
	signToken
}

/* let r = await findByUserName('test')
console.log('r: ', r);

let b = comparePassword('test', r.password);
console.log('b: ', b);

let token = signToken('test');
console.log('token: ', token); */
