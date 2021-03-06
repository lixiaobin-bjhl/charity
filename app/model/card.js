/**
 * @fileOverview charity-card-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {

    var ObjectId = mongoose.Schema.Types.ObjectId;

    const cardSchema = new mongoose.Schema({
        author: { 
            type: Object,
            required: true
        },
        user: {
            type: ObjectId,
            required: true,
            ref: 'user'
        },
        openid: { 
            type: String,
            required: true
        },
        product: { 
            type: ObjectId,
            ref: 'product'
        },
        count: {
            type: Number,
            default: 1
        },
        summary: {
            type: String,
            default: ''
        },
        createTime: { 
            type: Date,
            default: Date.now
        },
        updateTime: { 
            type: Date,
            default: Date.now
        }
    });
    return mongoose.model('card', cardSchema, 'card');
}   