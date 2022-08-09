"use strict";
/*eslint-disable */

const express = require('express');
const router = express.Router();

const logincontroller = require('../controllers/logincontroller');
const userInfoController = require('../controllers/userInfoController')

router.get('/', logincontroller.homepage);
router.post('/login', logincontroller.login);
router.post('/signup', logincontroller.signup);
router.get('/authenticate', logincontroller.authenticate);
router.post('/user/search', userInfoController.findUser);
router.post('/follow', userInfoController.follow);
router.post('/unfollow', userInfoController.unfollow);
router.get('/user/:username', userInfoController.fetchProfile);
router.get('/tweets/:uid/:pageNo', userInfoController.getTweets);
router.post('/tweets', userInfoController.saveTweet);
router.delete('/tweets', userInfoController.deleteTweet);

module.exports = router;