module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        "user",
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING(20),
            },
            password: {
                type: DataTypes.STRING(50),
            },
            email: {
                type: DataTypes.STRING(20),
            },
        },
        {
            freezeTableName: true,
        }
    );

    return User;
};
