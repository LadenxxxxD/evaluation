import { sequelize, DataTypes } from '../../lib/sequelize.js';

/**
 * 定义RankModel ORM映射
 */
export const RankModel = sequelize.define('Rank', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  rank: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
  },
  score: {
    type: DataTypes.INTEGER
  },
  img: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'rank',
  timestamps: false
});

export default ArticleModel;
