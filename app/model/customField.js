/**
 * @fileOverview charity-customField-model
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

module.exports = mongoose => {

    var Mixed = mongoose.Schema.Types.Mixed;

    const CustomFieldSchema = new mongoose.Schema({
        name: { type: String },
        remark: { type: String },
        default: { type: Mixed },
        type: { type: Number },
        options: { type: Mixed },
        remark: { type: String },
        required: { type: Boolean },
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
    return mongoose.model('customField', CustomFieldSchema, 'customField');
}   