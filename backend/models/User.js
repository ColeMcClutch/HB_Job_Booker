// /backend/models/User.js

module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM('poster', 'viewer'),
        allowNull: false
      }
    });
  
    User.associate = (models) => {
      // One-to-many: Posters -> Jobs
      User.hasMany(models.Job, {
        foreignKey: 'userId',
        as: 'postedJobs',
        onDelete: 'CASCADE'
      });
  
      // Many-to-many: Viewers <-> Jobs via Interest
      User.belongsToMany(models.Job, {
        through: 'Interest',
        as: 'interestedJobs',
        foreignKey: 'userId'
      });

    };

    return User;
  };
  