const Review = require("../database/schemas/Review");
const Product = require("../database/schemas/Product");
const Tag = require("../database/schemas/Tag");

class reviewController {
    async get(req, res, next) {
        try {
            const {id} = req.query;
            const userDb = id
                ? await Review.findOne({id})
                : await Review.find();
            console.log(userDb);
            res.send(userDb);
        } catch (err) {
            console.error(`Error while getting users`, err.message);
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            console.log("create");
            const {product, user_id, title, text, user_rating, category, images, tag} = req.body
            let productDb = await Product.findOne({name: product})
            let tagDb = await Tag.findOne({name: tag})
            if (!productDb) productDb = await Product.create({name: product})
            if (!tagDb) tagDb = await Tag.create({name: tag})
            const review = await Review.create({
                product_id: productDb.id,
                tag_id: tagDb.id,
                user_id,
                title,
                text,
                user_rating,
                category,
                images,
            });
            console.log("created");
            res.status(201).send(review);
        } catch (err) {
            console.error(`Error while creating`, err.message);
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            console.log("update review");
            const {id} = req.params;
            const {product, title, text, user_rating, category, images, tag, likes, dislikes} = req.body
            await Review.updateOne({id}, {
                $set: {
                    product,
                    title,
                    text,
                    user_rating,
                    category,
                    images,
                    tag,
                    likes,
                    dislikes
                }
            });
            res.send(200);
        } catch (err) {
            console.error(`Error while updating`, err.message);
            next(err);
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.params;
            await Review.deleteOne({id});
            await Comment.delete({review_id: id});
            res.send(200);
        } catch (err) {
            console.error(`Error while deleting`, err.message);
            next(err);
        }
    }
}

module.exports = new reviewController();
