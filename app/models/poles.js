'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poles = new Schema({
	name: String,
    createdAt: {type: Date, default: Date.now},
    open: Boolean,
    multichoice: Boolean,
    options: [{
        text: String,
        votes: {type: Number, default: 0}
    }],
    _owner: Schema.Types.ObjectId
});

module.exports = mongoose.model('Poles', Poles);
