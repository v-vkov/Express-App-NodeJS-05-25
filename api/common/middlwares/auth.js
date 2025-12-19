const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.locals.userId = decoded.userId;

    // TODO: get user from database by userId
    next();
}

module.exports = {
    checkAuth
}