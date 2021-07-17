module.exports = (sequelize, DataTypes) => {
    const alias = 'Product'
    const columns = {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING

        },
        description: {
            type: DataTypes.STRING,
        },
        category: {
            type: DataTypes.STRING(200),
        },
        color: {
            type: DataTypes.STRING,
        },
        size: {
            type: DataTypes.STRING,
        },
        price: {
            type: DataTypes.STRING,
        },
        image: {
            type: DataTypes.STRING(200),
        }
    }
    const config = {
        tableName: 'products',
        timestamps: false,
        underscored: true

    }

    const ProductModel = sequelize.define(alias, columns, config);
    return ProductModel;
}