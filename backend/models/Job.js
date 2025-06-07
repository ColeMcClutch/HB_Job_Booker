//Establish the job object
module.exports = (sequelize, DataTypes) => {
    const Job = sequelize.define('Job', {
      summary: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      postedDate: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
      }
    });
  
    Job.associate = (models) => {
      // Job belongs to specific user with poster role
      Job.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'poster',
        onDelete: 'CASCADE'
      });
  
      // Job has many interested users with the viewer role
      Job.belongsToMany(models.User, {
        through: 'Interest',
        as: 'interestedUsers',
        foreignKey: 'jobId'
      });

    };
  
    return Job;
  };
  