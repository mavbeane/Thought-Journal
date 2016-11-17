'use strict';
module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define('Users', {
        username: DataTypes.STRING,
        password: DataTypes.STRING
    }, {

        freezeTableName: true, // disable model names automatically being plural

        classMethods: {
            associate: function(models) {
                Users.hasMany(models.Entries, {onDelete: 'cascade', hooks: true});
            }
        }
    });
    return Users;
};