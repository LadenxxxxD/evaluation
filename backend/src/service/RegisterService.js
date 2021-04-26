import UserModel from '../model/UserModel.js';
import bcrypt from 'bcryptjs';
import config from '../../config.js';
import jwt from 'jsonwebtoken';

const checkUserExist = async (username) => {
	let r = await UserModel.findOne({
		where: {
			username
		}
	});
	return !!r;
};

const hashPassword = (password) => {
	return bcrypt.hashSync(password, 10);
};

const addUser = async (username, password, nickname) => {
	let r = await UserModel.create({
		username,
		password,
		nickname
	});
	return r;
};

export default {
	checkUserExist,
	hashPassword,
	addUser
};

/* let r = await findByUserName('test')
console.log('r: ', r);

let b = comparePassword('test', r.password);
console.log('b: ', b);

let token = signToken('test');
console.log('token: ', token); */
