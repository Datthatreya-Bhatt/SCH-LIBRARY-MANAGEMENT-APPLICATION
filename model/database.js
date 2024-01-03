const { DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = require('../model/sequelize');




const User = sequelize.define('user', {
  // Defining the columns of the table
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement:true,
    unique:true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false,

  },
  isadmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false
    
  }
});







// Create the table in the database
async function createTable() {
  try {
    await sequelize.sync({ force: false });
    console.log('Table created successfully.');
  } catch (error) {
    console.error('Unable to create table:', error);
  }
}

createTable()






module.exports = {
    User:User
    
};
