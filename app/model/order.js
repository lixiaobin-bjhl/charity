/**
 * @fileOverview charity-order-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {

    var ObjectId = mongoose.Schema.Types.ObjectId;

    const orderSchema = new mongoose.Schema({
        openid: { 
            type: String,
            required: true
        },
        shippingAddress: { 
            type: ObjectId,
            ref: 'shippingAddress',
            required: true
        },
        author: { 
            type: Object,
            required: true
        },
        products: [
            {
                product: {
                    type: ObjectId,
                    required: true,
                    ref: 'product'
                },
                count: {
                    type: Number,
                    required: true
                }
            }
        ],
        freightCharge: {
            type: Number,
            default: 0
        },
        discountMoney: {
            type: Number,
            default: 0
        },
        status: {
            type: Number,
            required: true
        },
        message: {
            type: String,
            default: ''
        },
        remark: {
            type: String,
            default: ''
        },
        mchId: {
            type: String,
            default: ''
        },
        outTradeNo: {
            type: String,
            required: true
        },
        transactionId: {
            type: String,
            default: ''
        },
        tradeType: {
            type: String,
            default: ''
        },
        payTime: {
            default: ''
        },
        bankType: {
            type: String,
            default: ''
        },
        feeType: {
            type: String,
            default: 'CNY'
        },
        expressMoney: {
            type: String,
            default: 0
        },
        expressNumber: {
            type: String,
            default: ''
        },
        expressType: {
            type: Number,
            default: 1
        },
        totalFee: {
            type: Number,
            required: true
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
    return mongoose.model('order', orderSchema, 'order');
}   