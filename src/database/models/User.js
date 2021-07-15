module.exports = (sequelize, DataTypes) => {
    const alias = 'User'
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING

        },
        email: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING,
        },
        tel: {
            type: DataTypes.STRING,
        },
        password1: {
            type: DataTypes.STRING(60),
        },
        password2: {
            type: DataTypes.STRING(60),
        }
    }
    const config = {
        tableName: 'users',
        timestamps: false,
        underscored: true

    }

    const UserModel = sequelize.define(alias, columns, config);
    return UserModel;
}