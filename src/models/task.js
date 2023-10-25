module.exports = (sequelize, DataTypes) => {

    const Task = sequelize.define('task', {
        taskNo: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
        },
        sheduledAt: {
            type: DataTypes.DATE,
        },
        isComplered: {
            type: DataTypes.BOOLEAN,
        },
    }, {
        freezeTableName: true
    });

    return Task;
};