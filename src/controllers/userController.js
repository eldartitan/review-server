const User = require("../database/schemas/User");

class UserController {
    async get(req, res, next) {
        try {
            const {id} = req.query;
            const userDb = id ? await User.findOne({id}) : await User.find();
            console.log(userDb)
            res.send(userDb);
        } catch (err) {
            console.error(`Error while getting users`, err.message);
            next(err);
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params;
            const {email, username, password} = req.body;
            console.log(id, email, username, password)
            await User.updateOne({id},{$set: {email, username, password}});
            res.send(200);
        } catch (err) {
            console.error(`Error while updating`, err.message);
            next(err);
        }
    }

    async remove(req, res, next) {
        try {
            const {id} = req.query;
            await User.deleteOne({id});
            res.send(200);
        } catch (err) {
            console.error(`Error while deleting`, err.message);
            next(err);
        }
    }
}

module.exports = new UserController();
