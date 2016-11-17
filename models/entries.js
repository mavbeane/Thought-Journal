'use strict';
module.exports = function(sequelize, DataTypes) {
    var Entries = sequelize.define('Entries', {
        entry: DataTypes.STRING,
        colorHex: DataTypes.STRING,
        word: DataTypes.STRING
    }, {
        classMethods: {
            associate: function(models) {
                Entries.belongsTo(models.Users, {
                    onDelete: "Cascade",
                    foreignKey: { allowNull: false }
                })
            }
        }
    });
    return Entries;
};