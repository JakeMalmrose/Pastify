const { User } = require('../models/user');

const userController = {
    register: async (req, res) => {
        try {
            const user = await User.create({
                Username: req.body.username,
                Password: req.body.password,
                Email: req.body.email
            })
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    authenticate: async (req, res) => {
        try {
            const user = await User.findOne({where: { Email: req.body.email }});
            if (!user) {
                res.status(404).json({message: "User not found"});
            }
            match = await user.checkPassword(req.body.password); // authentication here
            if (match) {
                res.status(200).json(user);
            } else {
                res.status(401).json({message: "Incorrect password"});
            }
        } catch (err) {
            res.status(500).json("Error during authentication:" + err);
        }
    }
}

module.exports = userController;