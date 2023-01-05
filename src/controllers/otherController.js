const Tag = require("../database/schemas/Tag");
const Category = require("../database/schemas/Category");

class OtherController {
  async getTags(req, res, next) {
    try {
      const tags = await Tag.find().sort({ _id: -1 }).limit(10);
      // console.log(tags);
      // tags.sort((a, b) => {
      //   return b.reviews.length - a.reviews.length;
      // });
      res.send(tags);
    } catch (err) {
      console.error(`Error while getting tags`, err.message);
      next(err);
    }
  }

  async getCategories(req, res, next) {
    try {
      const { id } = req.query;
      const categories = await Category.find({ id });
      res.send(categories);
    } catch (err) {
      console.error(`Error while deleting`, err.message);
      next(err);
    }
  }
}

module.exports = new OtherController();
