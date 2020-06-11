const jwt = require('jsonwebtoken');
const config = require('config');

// you could use password instead of this, if you want to integrate with FB, likedIn
module.exports = function(req,res,next) {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(400).json( {msg: 'No token, authorization required'});
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = decoded.user
        next();

    }catch (e) {
        console.error(e.message);
        res.status(401).send({msg: 'Token is not valid'});

    }

}