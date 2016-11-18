'use strict';
module.exports = function(sequelize, DataTypes) {
    var Thought = sequelize.define('Thought', {
        entry: DataTypes.TEXT,
        colorHex: DataTypes.STRING,
        word: DataTypes.STRING
    }, {
        underscored: true,
        freezeTableName: true,
        tableName: 'thoughts',

        classMethods: {
            associate: function(models) {
                Thought.belongsTo(models.User, {
                    onDelete: "CASCADE",
                    foreignKey: { allowNull: false }
                })
            }
        }
    });
    return Thought;
};