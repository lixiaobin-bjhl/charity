/**
 * @fileOverview charity-shippingAddress-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {
    
    const shippingAddressSchema = new mongoose.Schema({
        name: { type: String },
        mobile: { type: String },
        province: { type: String },
        city: { type: String },
        contry: { type: String },
        address: { type: String },
        openid: { type: String },
        isDefault: { type: String },
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