module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define(
        'event',
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING,
            },
            description: {
                type: DataTypes.STRING,
            },
            sheduledAt: {
                type: DataTypes.DATE,
            },
            sheduledEnd: {
                type: DataTypes.DATE,
            },
        },
        {
            freezeTableName: true,
        },
    );

    return Event;
};
