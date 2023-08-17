const User = require('../models/user');

const userController = {
    register: async (req, res) => {
        try {
            const user = await User.create({
                username: req.body['username'],
                encrypted_password: req.body['password'],
                email: req.body['email']
            })
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json("Error registering user: " + err);
        }
    },
    authenticate: async (req, res) => {
        try {
            const user = await User.findOne({
                where: {
                    username: req.body['username'],
                    encrypted_password: req.body['password']
                }
            })
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(401).json("Invalid credentials");
            }
        } catch (err) {
            res.status(500).json("Error authenticating user: " + err);
        }
    }
}

module.exports = userController;