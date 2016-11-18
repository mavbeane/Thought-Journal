'use strict';
module.exports = {
    up: function(queryInterface, Sequelize) {
        return queryInterface.createTable('thoughts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            entry: {
                type: Sequelize.TEXT
            },
            colorHex: {
                type: Sequelize.STRING
            },
            word: {
                type: Sequelize.STRING
            },
            created_at: Sequelize.DATE,
            updated_at: Sequelize.DATE
        });
    },
    down: function(queryInterface, Sequelize) {
        return queryInterface.dropTable('thoughts');
    }
};