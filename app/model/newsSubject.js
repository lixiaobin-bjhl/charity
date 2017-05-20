/**
 * @fileOverview charity-newsSubject-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {
    
    const NewsSubjectSchema = new mongoose.Schema({
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
    return mongoose.model('newsSubject', NewsSubjectSchema, 'newsSubject');
}   