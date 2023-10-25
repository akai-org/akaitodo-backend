module.exports = (sequelize, DataTypes) => {

    const AccessToken = sequelize.define('access_token', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        secret: {
            type: DataTypes.STRING,
        },
        key: {
            type: DataTypes.STRING,
        },
        expiryAt: {
            type: DataTypes.DATE,
        },
        isRefreshed: {
            type: DataTypes.BOOLEAN,
        }
    }, {
        freezeTableName: true
    });

    return AccessToken;
};