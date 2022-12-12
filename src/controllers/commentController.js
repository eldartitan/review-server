const Comment = require("../database/schemas/Comment");

class commentController {
    async get(req, res, next) {
        try {
            console.log("get comments")
            const {id} = req.query
            const comments = id ? await Comment.find({review_id: id}) : await Comment.find();
            console.log(comments);
            if (!comments || comments.length === 0) res.send(404);
            else if (comments) res.send(comments);
        } catch (err) {
            console.error(`Error while getting users`, err.message);
            next(err);
        }
    }

    async create(req, res, next) {
        try {
            console.log("create");
            const {user_id, review_id, text} = req.body;
            const newUser = await Comment.create({user_id, review_id, text});
            console.log("created");
            res.status(201).send(newUser);
        } catch (err) {
            console.error(`Error while creating`, err.message);
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const {text} = req.body;
            console.log(req.params.id, text);
            await Comment.updateOne(
                {id: req.params.id},
                {$set: {text}}
            );
            res.send(200);
        } catch (err) {
            console.error(`Error while updating`, err.message);
            next(err);
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.params;
            await Comment.deleteOne({id});
            res.send(200);
        } catch (err) {
            console.error(`Error while deleting`, err.message);
            next(err);
        }
    }
}

module.exports = new commentController();
