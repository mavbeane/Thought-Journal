'use strict';
module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define('User', {
        //username: DataTypes.STRING,
        email: DataTypes.STRING,
        password_hash: DataTypes.STRING
    }, {

        underscored: true,
        freezeTableName: true,
        tableName: 'users',

        classMethods: {
            associate: function(models) {
                User.hasMany(models.Thought, {
                    onDelete: "CASCADE",
                    hooks: true,
                    foreignKey: { allowNull: false }
                })
            }
        }
    });
    return User;
};