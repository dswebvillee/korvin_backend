
const { DataTypes } = require('sequelize');
const db = require('../../config/db.config');

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.SMALLINT,
        allowNull: false,
        defaultValue: 1 // Assuming default role is "user" 1=user and 2=admin
    },
}, {
    timestamps: false, // Disable Sequelize's default timestamps
    underscored: true // Use underscored naming convention for columns
});

module.exports = User;
