/**
 * @fileOverview charity-user-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {

    var ObjectId = mongoose.Schema.Types.ObjectId;
    
    const UserSchema = new mongoose.Schema({
        name: { type: String },
        password: { type: String },
        mobile: {type: Number},
        headPic: {type: String},
        type: {type: Number},
        isForbidden: { type: Number },
        roleId: { type: ObjectId },
        role: { type: Object },
        createTime: { 
            type: Date,
            default: Date.now
        },
        updateTime: { 
            type: Date,
            default: Date.now
        }
    });
    return mongoose.model('User', UserSchema, 'user');
}   