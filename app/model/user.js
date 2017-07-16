/**
 * @fileOverview charity-user-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {

    var ObjectId = mongoose.Schema.Types.ObjectId;
    
    const userSchema = new mongoose.Schema({
        name: { type: String },
        password: { type: String },
        mobile: {type: Number},
        headPic: {type: String},
        isForbidden: { 
            type: Number, 
            default: 0
        },
        roleId: { type: ObjectId },
        remark: { type: String },
        role: { type: Object },
        type: { type: Number },
        masterMobile: { 
            type: Number,
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
    return mongoose.model('User', userSchema, 'user');
}   