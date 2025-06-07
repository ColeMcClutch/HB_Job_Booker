//Establish the user role
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
      // One-to-many: A poster to their jobs
      User.hasMany(models.Job, {
        foreignKey: 'userId',
        as: 'postedJobs',
        onDelete: 'CASCADE'
      });
  
      // Many-to-many: Viewers connect to Jobs through the interested connectection
      User.belongsToMany(models.Job, {
        through: 'Interest',
        as: 'interestedJobs',
        foreignKey: 'userId'
      });

    };

    return User;
  };
  