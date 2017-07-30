/**
 * @fileOverview charity-account-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {

    var ObjectId = mongoose.Schema.Types.ObjectId;
    
    const accountSchema = new mongoose.Schema({
        name: { 
            type: String,
            required: true
        },
        password: { type: String },
        author: { 
            type: Object,
            required: true
        },
        headPic: {type: String},
        isForbidden: { 
            type: Number, 
            default: 0
        },
        roleId: { 
            type: ObjectId 
        },
        remark: { type: String },
        role: { type: Object },
        type: { 
            type: Number,
            required: true
        },
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
    return mongoose.model('Account', accountSchema, 'account');
}   