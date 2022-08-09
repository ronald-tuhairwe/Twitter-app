"use strict";
/*eslint-disable */
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRouter')
const responseInfo = require('./models/responseInfo');
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')))

app.use(cors());
app.use(express.json());

app.use('/twitter', userRouter);

app.use((err, req, res, next) => {
    res.status(500).json(new responseInfo(true, err.message, null));
});

mongoose.connect('mongodb://localhost:27017/Twitter')
    .then(() => {
        app.listen(3000, () => { console.log('welcome on Twitter') })
    })
