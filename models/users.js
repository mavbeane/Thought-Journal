'use strict';
module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define('Users', {
        username: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Users.hasMany(models.Entries);
            }
        }
    });
    return Users;
};