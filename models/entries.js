'use strict';
module.exports = function(sequelize, DataTypes) {
    var Entries = sequelize.define('Entries', {
        entry: DataTypes.STRING,
        colorHex: DataTypes.STRING,
        word: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
            }
        }
    });
    return Entries;
};