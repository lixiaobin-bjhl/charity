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
        productSubjectId: { type: ObjectId},
        storageId: {
            type: Object
        },
        author: {
            type: Object
        },
        price: {
           type: Number 
        },
        discountPrice: {
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
    return mongoose.model('product', productSubjectSchema, 'product');
}   