const databasePasswordEncryption = require('../../database/databasePasswordEncryption');
const User = require('../models/user');


//instantiates the controller and the funcitons used
const userController = {
    register: async (req, res) => {
        //the try statement sees if the information is valid then if it is adds to the database
        try {
            const existingUser = await User.findOne({
                where: {
                    username: req.body['username']
                }
            });
            
            if (existingUser) {
                res.status(409).json("Username already exists");
                return;
            }

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
    //authenticate checks the users password and if correct allows log in
    authenticate: async (req, res) => {
        try {
            console.log(req.body['password'])
            const inputPassword = req.body['password'];
            
            const user = await User.findOne({
                where: {
                    username: req.body['username']
                }
            })
            if (user) {
                let passKey = databasePasswordEncryption.generateKey(inputPassword);

                const decryptedPassword = databasePasswordEncryption.decryptData(
                    user.encrypted_password,
                    passKey,
                    user.iv
                );

                const passwordMatches = inputPassword === decryptedPassword;

                if(passwordMatches){
                res.status(200).json(user);
                }
            } else {
                res.status(401).json("Invalid credentials");
            }
        } catch (err) {
            res.status(500).json("Error authenticating user: " + err);
        }
    }
}

module.exports = userController;