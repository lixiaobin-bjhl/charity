/**
 * @fileOverview charity-card-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {

    const cardSchema = new mongoose.Schema({
        mobile: { type: Number },
        openid: { type: String },
        product: { type: Object },
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