const jwt = require('jsonwebtoken')

const auth = (req, res, next) => {

    const token = req.header('x-auth-token')

    if (!token) return res.status(403).send({ error: "Access denied, No token Found" })

    jwt.verify(token, process.env.SECRET_KEY, (error, validToken) => {

        if (error) return res.status(401).send({ error: "Invalid Token" })

        else {
            req.user = validToken
            next();
        }

    })
}

module.exports = auth