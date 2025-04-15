
const userModel = require('../models/user.model');
const generateToken = require('../utility/generateToken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json('this user already exist')
        };
        const hash = await bcrypt.hash(password, 10);
        const userAdd = new userModel({
            name, email,
            password: hash,
            role
        });
        await userAdd.save()
        const token = generateToken(userAdd);

        res.status(201).json({ userAdd, token });
    } catch (error) {
        res.status(500).json(error)
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const validateUser = await userModel.findOne({ email });
        if (!validateUser) {
            return res.status(400).json('invalid email and password')
        };

        const isMatch = await bcrypt.compare(password, validateUser?.password);
        if (!isMatch) {
            return res.status(400).json('incorrect password')
        }

        const token = generateToken(validateUser);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json(error)
    }
}