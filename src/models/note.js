module.exports = (sequelize, DataTypes) => {

    const Note = sequelize.define('note', {
        noteNo: {
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
        iconCode: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true
    });

    return Note;
};