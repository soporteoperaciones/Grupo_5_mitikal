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
            type: DataTypes.STRING(200),
        },
        tel: {
            type: DataTypes.STRING,
        },
        password1: {
            type: DataTypes.STRING,
        },
        password2: {
            type: DataTypes.STRING,
        }
    }
    const config = {
        tableName: 'users',
        timestamps: true,

    }

    const Model = sequelize.define(alias, columns, config);
    return Model;
}