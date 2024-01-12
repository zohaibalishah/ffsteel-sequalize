const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/dbconnection');
const Products = require('./Products');

const NodejsUser = sequelize.define(
  'users',
  {
    id:{
      type:DataTypes.INTEGER,
      primaryKey:true,
      unique:true,
      autoIncrement:true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    dob: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: true,
    modelName:'users',
    tableName:'users'
  }
);

NodejsUser.hasMany(Products)
Products.belongsTo(NodejsUser)

// Products.drop().then(()=>{
//   NodejsUser.drop().then(()=>{
//     console.log('ddd')
//   })
// })
module.exports = NodejsUser;
