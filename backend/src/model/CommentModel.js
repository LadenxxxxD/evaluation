import { sequelize, DataTypes } from '../../lib/sequelize.js';

export const CommentModel = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  refId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  content: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  createAt: {
    type: DataTypes.TIME,
    get() {
      const created = this.getDataValue('createAt');
      const date = new Date(created);
      return date.getTime();
    }
  },
}, {
  tableName: 'comment',
  timestamps: false,
  underscored: true
});

export default CommentModel;
