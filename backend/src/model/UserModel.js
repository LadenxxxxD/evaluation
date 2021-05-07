import { sequelize, DataTypes, testConnection } from '../../lib/sequelize.js';


/**
 * 定义UserModel ORM映射
 */
export const UserModel = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING
    },
    nickname: {
        type: DataTypes.STRING
    },
    avatar: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'user',
    timestamps: false
});

// testConnection(sequelize);

export default UserModel;

/* (async function() {

    // let u = User.build({
    //     username: 'abc',
    //     password: 'sjdf'
    // });

    // u = await u.save();

    let u = await UserModel.create({
        username: 'abcd',
        password: 'sjdf'
    })
})(); */
