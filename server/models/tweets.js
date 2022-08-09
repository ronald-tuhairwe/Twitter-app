"use strict";
/*eslint-disable */
// const mongoose = require('mongoose');
// const { Schema } = mongoose;
// const tweetSchema = new Schema({
//    user: { type: Schema.Types.ObjectId, ref: 'User'},
//    content: String,
//    timePosted: Date
// }, {
//     versionKey: false
// });
// const Model = mongoose.model('Tweet', tweetSchema);
// module.exports = Model;

const mongoose = require('mongoose');
const { Schema } = mongoose;
const tweetSchema = new Schema({
   user: {type: Schema.Types.ObjectId, ref:'User'},
   content: String,
   timePosted: Date,
   youtube: String
}, {
    versionKey: false
});
const Model = mongoose.model('Tweet', tweetSchema);
module.exports = Model;