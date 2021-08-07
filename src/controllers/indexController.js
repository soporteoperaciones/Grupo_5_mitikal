const path = require('path')
const { Product } = require('../database/models')

const indexController = {
    index: async(req, res) => {

        const productList = await Product.findAll({
            order: [
                ['name', 'ASC']
            ],
        })

        return res.render('index', { productList })
    
    }

}

module.exports = indexController