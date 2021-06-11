import { sequelize, DataTypes, testConnection } from '../../lib/sequelize.js';

/**
 * 定义ArticleModel ORM映射
 */
export const ArticleModel = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  author_img: {
    type: DataTypes.STRING
  },
  description: {
    type: DataTypes.STRING,
  },
  tags: {
    type: DataTypes.STRING,
    get() {
      const tagString = this.getDataValue('tags');
      if (!tagString) return [];
      return tagString.split(',');
    },
    set(value) {
      return this.setDataValue('tags', value && value.join(','))
    }
  },
  content: {
    type: DataTypes.TEXT
  },
  htmlcontent: {
    type: DataTypes.TEXT
  },
  img: {
    type: DataTypes.STRING
  },
  pv: {
    type: DataTypes.INTEGER
  },
  comment: {
    type: DataTypes.INTEGER
  },
  like: {
    type: DataTypes.INTEGER
  },
  valid: {
    type: DataTypes.BOOLEAN
  },
  reject: {
    type: DataTypes.BOOLEAN
  },
  created: {
    type: DataTypes.TIME,
    get() {
      const created = this.getDataValue('created');
      const date = new Date(created);
      return date.getTime();
    },
  },
  updated: {
    type: DataTypes.TIME,
    get() {
      const updated = this.getDataValue('updated');
      const date = new Date(updated);
      return date.getTime();
    },
  },

}, {
  tableName: 'article',
  timestamps: false
});

export default ArticleModel;
