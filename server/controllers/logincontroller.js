const User = require('../models/users');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const responseInfo = require('../models/responseInfo')
let SECRET;

exports.homepage = async (req, res, next) => {
    console.log('homepage');
    res.sendFile(path.join(__dirname, '..', '..', 'client', 'index.html'));
}
exports.authenticate = (req, res, next) => {
    const [, token] = req.headers.authorization.split(" ");
    try {
        let permission = jwt.verify(token, SECRET);
        res.status(200).json(new responseInfo(false, null, permission));
    } catch (err) {
        res.status(400).json(new responseInfo(true, "Invalid JWT", null));
    }
}

exports.login = async (req, res, next) => {
    const userEntry = req.body.userEntry;
    const password = req.body.password;
    SECRET = "login key for twitter users";
    if (userEntry.includes('@')) {
        const user = await User.findOne({ email: userEntry });
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                const accessToken = jwt.sign({
                    id: user._id,
                    username: user.username,
                    iat: Date.now()
                }, SECRET);
                res.status(200).json(new responseInfo(false, null, { accessToken }));
            } else {
                res.status(400).json(new responseInfo(true, 'wrong password or username', null))
            }
        } else {
            res.status(400).json(new responseInfo(true, 'wrong password or username', null))
        }
    } else {
        const user = await User.findOne({ username: "@" + userEntry });
        if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
                const accessToken = jwt.sign({
                    id: user._id,
                    username: user.username,
                    iat: Date.now()
                }, SECRET);
                res.status(200).json(new responseInfo(false, null, { accessToken }));
            } else {
                res.status(400).json(new responseInfo(true, 'wrong password or username', null));
            }
        } else {
            res.status(400).json(new responseInfo(true, 'wrong password or username', null));
        }
    }
}


exports.signup = async (req, res, next) => {
    const newuser = new User(req.body);
    newuser.followers = [];
    newuser.following = [];
    newuser.dateJoined = Date.now();
    try {
        await newuser.save()
        res.status(201).json(newuser);
    } catch (error) {
        res.status(201).json(new responseInfo(true, "not unique username", null));
    }

}