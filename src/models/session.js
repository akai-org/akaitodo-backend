module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define(
        'session',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            oauthKey: {
                type: DataTypes.STRING,
            },
            expiryAt: {
                type: DataTypes.DATE,
            },
            networkIp: {
                type: DataTypes.STRING,
            },
            browserData: {
                type: DataTypes.STRING,
            },
            isActive: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            freezeTableName: true,
        },
    );

    return Session;
};
