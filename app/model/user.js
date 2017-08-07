/**
 * @fileOverview charity-user-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {

    var ObjectId = mongoose.Schema.Types.ObjectId;
    
    const accountSchema = new mongoose.Schema({
        author: { 
            type: Object,
            required: true
        },
        avatarUrl: {
            type: String,
            default: ''
        },
        city: {
            type: String,
            default: ''
        },
        country: {
            type: String,
            default: ''
        },
        gender: {
            type: Number,
        },
        language: {
            type: String,
            default: 'zh_CN'
        },
        nickName: {
            type: String,
            default: ''
        },
        province: {
            type: String,
            default: ''
        },
        openid: {
            type: String,
            required: true,
            default: ''
        },
        loginCount: {
            type: Number,
            default: 1
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
    return mongoose.model('user', accountSchema, 'user');
}   