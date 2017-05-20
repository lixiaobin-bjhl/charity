/**
 * @fileOverview charity-productSubject-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {
    
    const ProductSubjectSchema = new mongoose.Schema({
        name: { type: String },
        remark: { type: String },
        createTime: { 
            type: Date,
            default: Date.now
        },
        author: {
            type: Object
        },
        updateTime: { 
            type: Date,
            default: Date.now
        }
    });
    return mongoose.model('productSubject', ProductSubjectSchema, 'productSubject');
}   