/**
 * @fileOverview charity-shippingAddress-service
 * @author XiaoBin Li(lixiaobin8878@gmail.com) 
 */

'use strict';

var mongoose = require('mongoose');

module.exports = app => {

    class ShippingAddress extends app.Service {
        /**
         * 添加配送地址
         * 
         * @param {string} params.name 收件人姓名
         * @param {string} params.mobile 商家手机号
         * @param {string} params.contactNumber 收货人手机号
         * @param {string} params.address 收件地址
         * @param {string} params.openid 购买帐号
         * @param {Array} params.region 地域信息
         * 
         * @reutrn {Object}
         */
        * add(params) {
            var ShippingAddress = this.ctx.model.shippingAddress;
            var shippingAddress = new ShippingAddress({
                name: params.name,
                author: {
                    mobile: +params.mobile,
                },
                user: params.user,
                contactNumber: params.contactNumber,
                address: params.address,
                openid: params.openid,
                region: params.region
            });
            shippingAddress.save((err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('add shippingAddress', shippingAddress);
                }
            });
            return shippingAddress;
        }

        /**
         * 获取总数
         */
        * total () {
            var condition = {};
            var compass = this.ctx.helper.compass();
            Object.assign(condition, compass);
            var count = yield this.ctx.model.shippingAddress.count(condition);
            return count;
        }

        /**
         * 获取收货地址列表
         */
        * list (query = {}) {
            var condition = {};
            var compass = this.ctx.helper.compass();
            var pageNum = query.pageNum || this.ctx.app.config.pageDto.pageNum;
            var pageSize = query.pageSize || this.ctx.app.config.pageDto.pageSize;
            Object.assign(condition, compass);
            var list = yield this.ctx.model.shippingAddress.find(condition)
                .skip((pageNum - 1) * pageSize)
                .limit(+pageSize)
                .sort({createTime: -1})
                .populate('user', '', null)
            return list;
        }

        /**
         * 修改配送地址
         * 
         * @param {string} update.name 收件人姓名
         * @param {string} update.contactNumber 收件人手机号
         * @param {string} update.address 收件地址
         * @param {Date} update.updateTime 修改时间
         * @param {Boolean} update.isDefault 是否设置为默认收货地址
         * 
         * @reutrn {Object}
         */
        * put(id, update) {
            
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            };

            this.ctx.model.shippingAddress.update(condition, update, {}, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('update ShippingAddress ' + id, update);
                }
            });
            return {
                id
            };
        }

        /**
         * 根据地址id查找地址  
         */
        * findById (id) {
            var id = mongoose.Types.ObjectId(id);
            var shippingAddress = yield this.ctx.model.shippingAddress.findById(id);
            return shippingAddress;
        }

        /**
         * 删除收货地址
         * @param {string} id  收货地址id
         */
        * del(id) {
            var condition = {
                _id: mongoose.Types.ObjectId(id)
            };
            var shippingAddress = yield this.ctx.model.shippingAddress.remove(condition, (err) => {
                if (err) {
                    app.logger.error(err);
                } else {
                    app.logger.info('delete shippingAddress', shippingAddress);
                }
            });
            return shippingAddress;
        }

        /**
         * 根据opendId 查找收货地址信息
         */ 
        * listByOpenid (openid) {
            var condition = {
                openid: openid
            };
            var list = yield this.ctx.model.shippingAddress.find(condition).sort({createTime: -1});
            return list; 
        }
    }
    return ShippingAddress;
};