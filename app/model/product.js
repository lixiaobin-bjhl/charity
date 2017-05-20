/**
 * @fileOverview charity-product-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {

    var ObjectId = mongoose.Schema.Types.ObjectId;

    const productSubjectSchema = new mongoose.Schema({
        title: { type: String },
        summary: { type: String },
        remark: { type: String },
        productSubjectId: { type: ObjectId},
        storageIds: {
            type: Array
        },
        author: {
            type: Object
        },
        storeCount: {
            type: Number
        },
        specifications: {
            type: Array
        },
        price: {
           type: Number 
        },
        saleCount: {
            type: Number
        },
        discountPrice: {
            type: Number
        },
        isNotSale: {
            type: Number,
            default: 0
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
    return mongoose.model('product', productSubjectSchema, 'product');
}   