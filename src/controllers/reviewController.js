const Review = require("../database/schemas/Review");
const Product = require("../database/schemas/Product");
const Tag = require("../database/schemas/Tag");
const User = require("../database/schemas/User");
const Category = require("../database/schemas/Category");

class reviewController {
  async get(req, res, next) {
    try {
      const { id, params, tags, category, text, user_id } = req.query;
      console.log("ID", id, params, tags, category, text, user_id);
      const catDb = await Category.findOne({ value: category });
      let reviewDb;

      if (id) reviewDb = await Review.findOne({ _id: id });
      else if (user_id) reviewDb = await Review.find({ user_id }).limit(10);
      else if (text)
        reviewDb = await Review.find({ $text: { $search: text } }).limit(10);
      else if (tags) reviewDb = await Review.find({ tags }).limit(10);
      else if (params) reviewDb = await Review.find().sort(params).limit(10);
      else if (category) {
        const catDb = await Category.findOne({ value: category });
        reviewDb = await Review.find({ category: catDb.id }).limit(10);
      } else reviewDb = await Review.find().limit(10);

      // console.log(reviewDb);
      res.status(200).send(reviewDb);
    } catch (err) {
      console.error(`Error while getting users`, err.message);
      next(err);
    }
  }

  async create(req, res, next) {
    try {
      console.log("create");
      const {
        user_id,
        title,
        product,
        text,
        user_rating,
        tags,
        images,
        category,
      } = req.body;
      console.log(req.user, "user");
      console.log(req.body, "body");
      let user = !user_id ? req.user : await User.findOne({ _id: user_id });
      let productDb = await Product.findOne({ value: product });
      if (!productDb) productDb = await Product.create({ value: product });
      // console.log(productDb);
      const review = await Review.create({
        product_id: productDb.id,
        tags,
        user_id: user._id,
        username: user.username,
        title,
        text,
        user_rating,
        category,
        images,
      });
      console.log(tags);
      await Promise.all(
        tags.map(async (name) => {
          console.log(review);
          let tag = await Tag.findOne({ value: name });
          if (!tag) tag = await Tag.create({ value: name });
          console.log(tag);
          tag.reviews.push(review.id);
          tag.save();
        })
      );
      res.status(201).send(review);
    } catch (err) {
      console.error(`Error while creating review`, err.message);
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      console.log("update review");
      const { id } = req.query;
      const { title, text, user_rating, images, tag } = req.body;
      const reviewDb = await Review.updateOne(
        { _id: id },
        {
          $set: {
            title,
            text,
            user_rating,
            images,
            tag,
          },
        }
      );
      res.status(200).send(reviewDb);
    } catch (err) {
      console.error(`Error while updating review`, err.message);
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.query;
      await Review.deleteOne({ id });
      await Comment.delete({ review_id: id });
      res.send(200);
    } catch (err) {
      console.error(`Error while deleting review`, err.message);
      next(err);
    }
  }

  async addLike(req, res, next) {
    try {
      const { review_id, user_id } = req.body;
      console.log(review_id);
      let user = user_id || req.user;
      await Review.updateOne(
        { _id: review_id },
        { $push: { likes: user._id } }
      );
      const review = await Review.findOne({ _id: review_id });
      console.log(review);
      res.status(200).send(review);
    } catch (err) {
      console.error(`Error while deleting review`, err.message);
      next(err);
    }
  }

  async removeLike(req, res, next) {
    try {
      const { review_id, user_id } = req.body;
      console.log(review_id);
      let user = user_id || req.user;
      await Review.update({ id: review_id }, { $pull: { likes: user._id } });
      const review = await Review.findOne({ _id: review_id });
      console.log(review);
      res.status(200).send(review);
    } catch (err) {
      console.error(`Error while deleting review`, err.message);
      next(err);
    }
  }
}

module.exports = new reviewController();
