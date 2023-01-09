const Tag = require("../database/schemas/Tag");
const Category = require("../database/schemas/Category");

class OtherController {
  async getTags(req, res, next) {
    try {
      const tags = await Tag.aggregate([
        {
          $addFields: {
            subscribedGroupsLength: {
              $size: "$reviews",
            },
          },
        },
        {
          $sort: {
            subscribedGroupsLength: -1,
          },
        },
      ]).limit(10);

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
