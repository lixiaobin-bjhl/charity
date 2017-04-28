/**
 * @fileOverview charity-news-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {

    var ObjectId = mongoose.Schema.Types.ObjectId;

    const newsSubjectSchema = new mongoose.Schema({
        title: { type: String },
        content: { type: String },
        summary: { type: String },
        newsSubjectId: { type: ObjectId},
        author: {
            type: Object
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
    return mongoose.model('news', newsSubjectSchema, 'news');
}   