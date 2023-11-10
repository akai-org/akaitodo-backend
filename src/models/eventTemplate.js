module.exports = (sequelize, DataTypes) => {
    const EventTemplate = sequelize.define(
        'event_template',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            userId: {
                type: DataTypes.INTEGER,
            },
            name: {
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

    return EventTemplate;
};
