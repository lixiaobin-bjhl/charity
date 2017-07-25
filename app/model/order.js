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
        mobile: {
            type: String,
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
            type: Number
        },
        discountMoney: {
            type: Number,
            default: 0
        },
        status: {
            type: Number
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
            type: String
        },
        transactionId: {
            type: String
        },
        tradeType: {
            type: String
        },
        timeEnd: {
            type: Date
        },
        bankType: {
            type: String
        },
        attach: {
            type: String
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
        exporessType: {
            type: Number,
            default: 1
        },
        totalFee: {
            type: Number
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