const jwt = require('jsonwebtoken');
const user = require('../models/user.model');

const protected = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json('no token provided');
        }

        const token = authHeader.split(' ')[1];
        const decode = jwt.verify(token, 'ecommercepro123')
        const userDetails = await user.findById(decode.id);
        req.user = userDetails;

        next();
    }catch(error){
        return res.status(500).json('invalid token')
    }
}


const isAdmin = async (req, res, next) => {
    try {
        if(req.user?.role != 'admin'){
            return res.status(400).json('Admin access required')
        }
        next();
    }catch(error){
        return res.status(500).json('invalid token')
    }
}

module.exports = {
    protected,
    isAdmin
}