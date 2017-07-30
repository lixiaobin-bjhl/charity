/**
 * @fileOverview charity-shippingAddress-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {
    
    const shippingAddressSchema = new mongoose.Schema({
        name: { type: String },
        author: { 
            type: Object,
            required: true
        },
        region: { type: Array },
        address: { 
            type: String,
            default: ''
        },
        openid: { 
            type: String,
            required: true
        },
        isDefault: { 
            type: Boolean,
            default: false
        },
        remark: { type: String },
        createTime: { 
            type: Date,
            default: Date.now
        },
        updateTime: { 
            type: Date,
            default: Date.now
        }
    });
    return mongoose.model('shippingAddress', shippingAddressSchema, 'shippingAddress');
}   