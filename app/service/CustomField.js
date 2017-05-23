/**
 * @fileOverview charity-customField-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');
var customFieldType = require('../public/scripts/function/customFieldType');

module.exports = app => {

    class CustomField extends app.Service {
        /**
         * 添加产品自定义字段
         *
         * @param {string} query.name 自定义字段名称
         * @param {string} query.remark 自定义字段备注信息
         * @param {string=} query.default 自定义字段默认值
         * @param {boolean} query.required 自定义字段是否必填
         * @param {boolean} query.type 自定义字段类型
         * @param {boolean} query.options 自定义字段选项(type == 1为下拉选项时ootion 才有意义)
         * 
         * @return {Object}
         */
        * add(query) {
            var CustomField = this.ctx.model.customField;
            var customField = new CustomField({
                name: query.name,
                author: this.ctx.session.user,
                remark: query.remark,
                default: query.default,
		        required: query.required,
		        type: query.type,
		        options: query.options,
		        remark: query.remark
            });
            customField.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add customField', customField);
                }
            });
            return customField;
        }

        /**
         * 查找产品自定义字段列表 
         */
        * list() {
            var compass = this.ctx.helper.compass();
            var condition = {};
            Object.assign(condition, compass);
            var list = yield this.ctx.model.customField.find(condition)
                .sort({createTime: -1});
            var result = [];
            list.forEach((item)=> {
                item = item.toJSON();
                item.typeStr = customFieldType(item.type);
                result.push(item);
            });
            return result;
        }

        /**
         * 根据自定义字段id找查自定义字段信息 
         */
        * findById (id) {
            var id = mongoose.Types.ObjectId(id);
            var product = yield this.ctx.model.customField.findById(id);
            return customField;
        }
        
        /**
         * 删除产品自定义字段
         * @param {string} id  分闻自定义字段id
         */
        * del(id) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            }
            var customField = yield this.ctx.model.customField.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete customField', customField);
                }
            });
            return customField;
        }
        
        /**
         * 更新产品自定义字段 
         * @param {string} id 产品自定义字段id
         * @param {Object} update 更新内容
         */
        * put (id, update) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            };
            this.ctx.model.customField.update(condition, update, {}, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('update customField ' + id, update);
                }
            });
            return {
                id
            };
        }
    }
    return CustomField;
};