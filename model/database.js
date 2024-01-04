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
    
  },
  borrowed: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  limit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 3

  }
});





const Book = sequelize.define('book', {
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
    available: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
    
  });
  


  const Ledger = sequelize.define('ledger', {
    // Defining the columns of the table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
      unique:true
    },
    book: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transaction: {
        type: DataTypes.STRING,
        allowNull: false
    }
    
  });


  

User.hasMany(Book);
Book.belongsTo(User);



User.hasMany(Ledger);
Ledger.belongsTo(User);










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
    User:User,
    Book: Book,
    Ledger: Ledger
    
};








/* 






const Admin = sequelize.define('admin', {
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
  
    }
    
  });



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
  
    }
    
  });


  const Book = sequelize.define('book', {
    // Defining the columns of the table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
      unique:true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull:false,
  
    }
    
  });



  const Transaction = sequelize.define('transaction', {
    // Defining the columns of the table
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement:true,
      unique:true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookId: {
      type: DataTypes.INTEGER,
      allowNull: false
      
    },
    borrowDate: {
      type: DataTypes.STRING,
      allowNull:false
  
    },    
    returnDate: {
        type: DataTypes.STRING,
        allowNull:false
    
    }
    
  });








*/