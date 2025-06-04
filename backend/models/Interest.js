// /backend/models/Interest.js

module.exports = (sequelize, DataTypes) => {
    const Interest = sequelize.define('Interest', {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      jobId: {
        type: DataTypes.INTEGER,
        primaryKey: true
      }
    }, {
      timestamps: false,
      tableName: 'Interest'
    });
  
    return Interest;
  };
  