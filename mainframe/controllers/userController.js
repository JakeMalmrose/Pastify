const User = require('../models/user');

const userController = {
    register: async (req, res) => {
        try {
            const user = await User.create({
                Username: req.body['username'],
                Password: req.body['password'],
                Email: req.body['email']
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
                    Username: req.body['username'],
                    Password: req.body['password']
                }
            })
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(401).json("Invalid credentials");
            }
        }
    }
}

module.exports = userController;