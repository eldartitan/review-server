const Tag = require("../database/schemas/Tag");
const Product = require("../database/schemas/Product");
const Category = require("../database/schemas/Category");

class OtherController {
    async getTags(req, res, next) {
        try {
            const tags = await Tag.find();
            console.log(tags)
            res.send(tags);
        } catch (err) {
            console.error(`Error while getting tags`, err.message);
            next(err);
        }
    }

    async getProducts(req, res, next) {
        try {
            const products = await Product.find();
            res.send(products);
        } catch (err) {
            console.error(`Error while updating`, err.message);
            next(err);
        }
    }

    async getCategories(req, res, next) {
        try {
            const categories = await Category.find();
            res.send(categories);
        } catch (err) {
            console.error(`Error while deleting`, err.message);
            next(err);
        }
    }
}

module.exports = new OtherController();
