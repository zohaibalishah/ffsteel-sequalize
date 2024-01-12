const { sequelize } = require('../config/dbconnection');
const { DataTypes,} = require('sequelize');

const Products = sequelize.define(
  'Products',
  {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      unique:true,
      autoIncrement:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    timestamps: true,
    modelName:'products',
    tableName:'products'
  }
);

module.exports = Products;
