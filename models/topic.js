'use strict';
module.exports = (sequelize, DataTypes) => {
  const topic = sequelize.define('topic', {
    title: DataTypes.STRING
  }, {});
  topic.associate = function(models) {
    // associations can be defined here
  };
  return topic;
};