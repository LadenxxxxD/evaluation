import { sequelize, DataTypes } from '../../lib/sequelize.js';

export const ProductModel = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  brand: {
    type: DataTypes.INTEGER
  },
  price: {
    type: DataTypes.DECIMAL
  },
  cover_img: {
    type: DataTypes.STRING
  },
  tags: {
    type: DataTypes.STRING,
    get() {
      const arr = this.getDataValue('tags');
      return arr && arr.split(',');
    },
    set(value) {
      return this.setDataValue('tags', value && value.join(','))
    }
  },
  params: {
    type: DataTypes.TEXT
  },
  cpu: {
    type: DataTypes.STRING
  },
  memory: {
    type: DataTypes.STRING
  },
  storage: {
    type: DataTypes.STRING
  },
  battery: {
    type: DataTypes.STRING
  },
  front_camera: {
    type: DataTypes.STRING,
    get() {
      const arr = this.getDataValue('front_camera');
      return arr && arr.split(',');
    },
    set(value) {
      return this.setDataValue('front_camera', value && value.join(','))
    }
  },
  back_camera: {
    type: DataTypes.STRING,
    get() {
      const arr = this.getDataValue('back_camera');
      return arr && arr.split(',');
    },
    set(value) {
      return this.setDataValue('back_camera', value && value.join(','))
    }
  },
  screen_size: {
    type: DataTypes.STRING
  },
  screen_ratio: {
    type: DataTypes.STRING,
  },
  official_article: {
    type: DataTypes.STRING,
  },
  related_articles: {
    type: DataTypes.STRING,
    get() {
      const arr = this.getDataValue('related_articles');
      return arr && arr.split(',');
    },
    set(value) {
      return this.setDataValue('related_articles', value && value.join(','))
    }
  },
}, {
  tableName: 'product',
  timestamps: false
});

export default ProductModel;
