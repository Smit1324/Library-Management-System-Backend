const jwt = require('jsonwebtoken');
const User = require('../models/user');

const adminAuthenticate = (req, res, next) => {

    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(400).send({ message: "Access Denied, No Token Found" });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (error, validtoken) => {
        try {

            if (error) {
                return res.status(400).send({ message: "Invalid Token" });
            }
            else {

                const admin = await User.findOne({ isAdmin: true });

                if (validtoken._id != admin._id) {
                    return res.status(403).send({ message: "You don't have access to this content" });
                }

                req.user = validtoken
                next();

            }

        } catch (err) {
            console.log(err);
        }
    })

}

module.exports = adminAuthenticate;